import { Avater } from "assets";
import axios from "axios";
import { getAdmin, getAdminToken } from "common";
import Button from "components/Button";
import Container from "components/container";
import Input from "components/form-control/input";
import API_URL from "config";
import { selectUser, setUser } from "features/auth/api/slice";
import { allCountries } from "helpers/countries";
import { useAppDispatch } from "hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
// import { saveAs } from "file-saver";
function AccountSettings() {
  const token = getAdminToken();
  const [file, setFile] = useState<any>();
  const [base64URL, setBase64URL] = useState<any>();
  const [preview, setPreview] = useState<any>(null);
  const [reload, setReload] = useState<number>(1);
  const user = useSelector(selectUser);
  const users = useSelector(getAdmin);
  const [message, setMessage] = useState<String>("");
  const [userData, setUserData] = useState<any>();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      phoneNumber: users.phone,
      firstName: users.firstname,
      email: users.email,
      lastName: users.lastname,
      country: users.country,
      address: users.address,

      organization: userData ? userData[0].organization : users.company,
    },
  });
  const dispatch = useAppDispatch();
  const [copy, setCopy] = useState(false);

  const axiosCreate = axios.create({
    headers: {
      authorization: "Bearer " + token,
      // "Content-Type": "multipart/form-data",
    },
  });

  useEffect(() => {
    axiosCreate
      .get(`${API_URL}/staff/single/${user?._id}`)
      .then(({ data }) => {
        console.log(data);
        setUserData(data.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user?._id, axiosCreate]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, reload]);

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL: any = "";
      // Make new FileReader
      let reader = new FileReader() as any;

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const onFileChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setFile(e.target.files[0]);

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        console.log("File Is", file);
        setBase64URL(result);
      })
      .catch((err) => {
        console.log(err);
      });
    setReload(1 + reload);
  };

  const formData = [
    {
      label: "First Name",
      type: "text",

      register: { ...register("firstName") },
    },
    {
      label: "Last Name",
      type: "text",

      register: { ...register("lastName") },
    },
    // {
    //   label: "Passowrd",
    //   type: "password",
    //   register: { ...register("password") },
    // },
    {
      label: "Email",

      type: "email",
      register: { ...register("email") },
    },
    {
      label: "Organization",

      type: "text",
      register: { ...register("organization") },
    },
    {
      label: "Phone number",

      type: "number",
      register: { ...register("phoneNumber") },
    },
    {
      label: "Address",

      type: "text",
      register: { ...register("address") },
    },
  ];

  const remove = () => {
    setFile(null);
    setReload(1 + reload);
    // formRef.reset();
  };

  const handlePostSetting = (data: any) => {
    const formData = new FormData();

    formData.append("firstname", data.firstName);
    formData.append("lastname", data.lastName);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("country", data.country);
    formData.append("phone", data.phoneNumber);
    formData.append("image", base64URL ? base64URL : users.image);

    axiosCreate
      .put(`${API_URL}/staff/update/${user?._id}`, formData)
      .then(({ data }) => {
        console.log(data, "profile payload");
        dispatch(setUser(data?.payload[0]));
        setMessage(data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCopy = () => {
    // if (!copy) {

    navigator.clipboard.writeText("239432").then(
      function () {
        setCopy(true);
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );

    setTimeout(() => {
      setCopy(false);
    }, 600);
    // }
  };

  // const downloadQR = () => {
  //   const canvas = document.getElementById("lfzentry") as HTMLCanvasElement;
  //   const pngUrl = canvas?.toDataURL("image/png")
  //     .replace("image/png", "image/octet-stream");
  //   let downloadLink = document.createElement("a");
  //   downloadLink.href = pngUrl;
  //   downloadLink.download = "lfzentry.png";
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // };

  const downloadQR = () => {
    saveAs(
      "https://api.qrserver.com/v1/create-qr-code/?data=94567&size=400",
      "image.jpg"
    ); // Put your image url here.
  };

  return (
    <>
      <Container>
        <>
          <div className="  p-8">
            <h2 className="font-bold text-2xl mb-4">Profile Details</h2>

            <div className="flex justify-start items-center">
              {!file ? (
                <img
                  src={users.image ? users.image : Avater}
                  alt=""
                  className="h-32 w-32 rounded-full"
                />
              ) : (
                <img
                  src={users?.image}
                  alt=""
                  className="h-32 w-32 rounded-full"
                />
              )}
              <div className="pl-6">
                <div className="lg:flex justify-start items-center">
                  <input
                    type="file"
                    className="hidden"
                    id="upload"
                    onChange={onFileChange}
                  />
                  <label
                    htmlFor="upload"
                    className={`mb-8 lg:mb-0 bg-[#0C198B] text-sm lg:text-base  hover:bg-black text-white transition ease-in-out delay-150 py-3 lg:py-2 px-3 rounded-[10px] hover:-translate-y-1 hover:scale-110   duration-300`}
                  >
                    Upload new photo
                  </label>

                  {/* <Button
                    onClick={() => remove()}
                    title='Reset'
                    bgColor='bg-white'
                    textColor='text-[#696969]'
                    className='border-[#B4B4B4] text-sm lg:text-base mt-6 lg:mt-0  border hover:bg-red-700 hover:text-white w-32 ml-4'
                  /> */}
                </div>
                <span className="text-xs text-[#B4B4B4] mt-4">
                  Allow JPG, GIF or PNG. Max size of 800K
                </span>
              </div>
            </div>
          </div>
          <hr className="bg-[#ABABAB]" />

          {/* form */}
          <form
            onSubmit={handleSubmit(handlePostSetting)}
            className="flex justify-between flex-wrap px-8 py-12"
            // ref={formRef}
          >
            {formData.map((item, i) => (
              <div className="w-full lg:w-[45%]">
                <Input
                  register={item.register}
                  type={item.type}
                  label={item.label}
                  className="dark:bg-[#2A2A2A] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            ))}

            <div className="w-full lg:w-[45%] mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Country
              </label>

              <select
                id="countries"
                className="border border-gray-300 text-gray-900 text-sm rounded-md outline-none block w-full p-2.5 dark:bg-[#2A2A2A] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("country")}
              >
                <option selected>Select a country</option>
                {allCountries.map((country, i) => (
                  <option value={country.name}>{country.name}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3 items-center w-full">
              <Button
                onClick={() => remove()}
                title="Reset"
                bgColor="bg-white"
                textColor="text-[#696969]"
                className="border-[#B4B4B4] text-sm lg:text-base mt-6 lg:mt-0  border hover:bg-red-700 hover:text-white w-32 ml-4"
              />
              <Button
                type={"submit"}
                title="Update"
                bgColor="bg-green-500"
                textColor="text-white"
                className="border hover:bg-black hover:text-white w-64 my-6 mx-auto lg:mx-0"
              />
            </div>
          </form>
          {message && (
            <div className="w-full p-4 lg:p-8">
              <div className="p-4  mb-10 rounded-lg bg-green-500 flex space-x-2 justify-between items-center">
                <span className="text-white font-semibold ">{message}</span>
                <div onClick={() => setMessage("")}>
                  <i className="fa-solid fa-circle-xmark text-white"></i>
                </div>
              </div>
            </div>
          )}
        </>
      </Container>
      {user.role !== "admin" && (
        <Container className="shadow-header rounded-lg mt-12 px-8 pt-8 lg:p-8">
          <>
            <div className="">
              <h2 className="font-bold text-2xl mb-4">Delete Account</h2>
            </div>

            <div className="bg-[#FFD89EBD] text-[#FF9900] dark:text-orange-700 p-8 border rounded-xl">
              <p>Are you sure you want to delete your account?</p>
              <p>
                Once you delete your account, there is no going back. Please be
                certain
              </p>
            </div>

            <div className="pt-6">
              <input type={"checkbox"} />
              <span className="text-xs ml-4">
                I confirm my accout deactivation
              </span>
            </div>

            <Button
              // onClick={}
              title="Deactivate Account"
              bgColor="bg-red-500"
              textColor="text-white"
              className="border hover:bg-black hover:text-white w-64 my-6 mx-auto lg:mx-0"
            />
          </>
        </Container>
      )}
    </>
  );
}

export default AccountSettings;
