// import AuthWrapper from 'components/wrappers/auth-wrapper';
import { useForm } from "react-hook-form";
// import Input from 'components/form-control/input';
import { LOGO } from "@/assets";
import { BALOSH } from "@/assets";
// import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { CircularProgress, Dialog } from "@mui/material";

interface mainLayoutTypes {
  children: JSX.Element;
}

function LoadingSpinner(props: any) {
  // const navigate = useNavigate();

  const { loading, setLoading } = props;
  return (
    <>
      {loading && (
        <>
          <Dialog
            open={loading === true}
            onClose={() => console.log("trying")}
            // TransitionComponent={Transition}
          >
            {/* <div className="p-5">
               
             </div> */}
            <CircularProgress color="primary" className="m-5" />
          </Dialog>
        </>
      )}
    </>
  );
}

export default LoadingSpinner;
