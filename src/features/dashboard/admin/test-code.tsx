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
function TestCode() {
  const token = getAdminToken();
  const [err2, setErr2] = useState<any>(null)
  const [message2, setMessage2] = useState<any>(null)
  const [file, setFile] = useState<any>();
  const [base64URL, setBase64URL] = useState<any>();
  const [preview, setPreview] = useState<any>(null);
  const [reload, setReload] = useState<number>(1);
  const user = useSelector(selectUser);
  const users = useSelector(getAdmin);
  const [message, setMessage] = useState<any>("");
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<any>(null);
  const [chosen, setChosen] = useState("generate");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
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
  }, [user?._id]);

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

  const categoryUrl = `${API_URL}/category`;
  const categorycreate = `${API_URL}/code/exit`;
  const url = `${API_URL}/code/enter`;

  const handleEntry = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    axiosCreate
      .post(url, { code: code })
      .then(({ data }: any) => {
        setMessage(data?.message);
        setLoading(false);
        // console.log(data);

        setTimeout(() => {
          setMessage(null);
          window.location.reload();
        }, 2000);
      })
      .catch((err: any) => {
        setErr(err?.response?.data?.message);
        setLoading(false);
      });
  };

  const handleExit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    axiosCreate
      .post(categorycreate, {
        code: code,
      })
      .then(({ data }) => {
        setMessage2(data?.message);
        setLoading(false);
        setTimeout(() => {
          setMessage(null);
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setErr2(err?.response?.data?.message);
        // console.log(err?.response?.data?.message);
        setLoading(false);
        // setShow(!show);
      });
  };

  return (
    <>
      <Container fullscreen={true}>
        <>
          <div className="  p-8">
            <h2 className="font-bold text-2xl mb-4">Barrier system</h2>
          </div>
          <hr className="bg-[#ABABAB]" />
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
          {err && (
            <div className="w-full p-4 lg:p-8">
              <div className="p-4 mt-10  rounded-lg bg-red-500 flex justify-between items-center">
                <span className="text-white font-semibold ">{err}</span>
                <div onClick={() => setErr("")}>
                  <i className="fa-solid fa-circle-xmark text-white"></i>
                </div>
              </div>
            </div>
          )}

          <div className="text">
            <h2 className="text-center text-2xl font-black">Entry access</h2>
          </div>
          <div className="flex justify-center">
            <form className="" onSubmit={(e) => handleEntry(e)}>
              <div className="form-row">
                {/* <div className="input-data">
                  <label>Enter Email associated</label>
                  <div className="underline"></div>
                  <input
                    type="text"
                    required
                    onChange={(e) => setEmail2(e.target.value)}
                    value={email2}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div> */}
              </div>
              <div className="form-row mt-5">
                <div className="input-data">
                  <label>Enter Code</label>
                  <div className="underline"></div>
                  <input
                    type="text"
                    required
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="input-data textarea">
                  <div className="form-row submit-btn">
                    <div className="flex justify-center mt-4">
                      <input
                        className="p-5 bg-green-600 rounded-lg"
                        type="submit"
                        value="submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      </Container>
      <Container fullscreen={true}>
        <>
          <div className="mt-10 p-8">
            <h2 className="font-bold text-2xl mb-4">Exit room</h2>
          </div>
          <hr className="bg-[#ABABAB]" />
          {message2 && (
            <div className="w-full p-4 lg:p-8">
              <div className="p-4  mb-10 rounded-lg bg-green-500 flex space-x-2 justify-between items-center">
                <span className="text-white font-semibold ">{message2}</span>
                <div onClick={() => setMessage("")}>
                  <i className="fa-solid fa-circle-xmark text-white"></i>
                </div>
              </div>
            </div>
          )}
          {err2 && (
            <div className="w-full p-4 lg:p-8">
              <div className="p-4 mt-10  rounded-lg bg-red-500 flex justify-between items-center">
                <span className="text-white font-semibold ">{err2}</span>
                <div onClick={() => setErr("")}>
                  <i className="fa-solid fa-circle-xmark text-white"></i>
                </div>
              </div>
            </div>
          )}

          <div className="text">
            <h2 className="text-center text-2xl font-black mt-5">Exit</h2>
          </div>
          <div className="flex justify-center">
            <form className="" onSubmit={(e) => handleExit(e)}>
              <div className="form-row mt-5">
                <div className="input-data">
                  <label>Enter Code</label>
                  <div className="underline"></div>
                  <input
                    type="text"
                    required
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="input-data textarea">
                  <div className="form-row submit-btn">
                    <div className="flex justify-center mt-4">
                      <input
                        className="p-5 bg-green-600 rounded-lg"
                        type="submit"
                        value="submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      </Container>
    </>
  );
}

export default TestCode;
