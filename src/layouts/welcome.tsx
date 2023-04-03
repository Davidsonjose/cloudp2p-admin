// import AuthWrapper from 'components/wrappers/auth-wrapper';
import { useForm } from "react-hook-form";
// import Input from 'components/form-control/input';
import { LOGO } from "@/assets";
import { BALOSH } from "@/assets";
// import { useNavigate } from "react-router-dom";
function Welcome() {
  // const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const handleRegistration = (data: any) => {
    console.log(data);
  };

  const formData = [
    {
      label: "EMAIL",
      placeholder: "Enter your email",
      type: "email",
      register: { ...register("email") },
    },
    {
      label: "PASSWORD",
      placeholder: "******",
      type: "password",
      register: { ...register("password") },
    },
  ];
  return (
    <>
      <div className='bg-video-wrap'>
        <video
          src='https://designsupply-web.com/samplecontent/vender/codepen/20181014.mp4'
          loop
          muted
          autoPlay
          id='main-video'
        ></video>
        <div className='overlay'></div>
        <div className='flex items-center justify-center z-30'>
          <div className='absolute w-[90%] md:w-[50%] lg:w-[50%] top-[15%] left-0 md:left-[25%] lg:-[25%] z-10 mx-4 bg-white  rounded-lg'>
            <div className='flex items-center justify-center'>
              <img src={LOGO} alt='' className='w-56 h-56 self-center' />
            </div>

            <div className='pt-16'>
              <div className='items-center justify-center flex'>
                <button
                  className='bg-blue-800 flex w-full mx-10 md:mx-10 lg:mx-56 justify-center rounded'
                  // style={{ width: "755px", height: "63px" }}
                  onClick={() => {}}
                >
                  <span className='text-white p-3 text-center'>
                    Get started
                  </span>
                </button>
              </div>
              <div className='flex items-center justify-center mt-16'>
                <h3 className='text-sm font-semibold'>Powered by</h3>
                <img src={BALOSH} alt='' className='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
