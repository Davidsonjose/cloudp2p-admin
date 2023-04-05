// import AuthWrapper from 'components/wrappers/auth-wrapper';
import { useForm } from "react-hook-form";
// import Input from 'components/form-control/input';
import DataTable from "react-data-table-component";

interface mainLayoutTypes {
  children: JSX.Element;
}

function MainUser(props: any) {
  const {} = props;
  return (
    <>
      <div className="mt-10 lg:flex lg:mx-0 mx-4 justify-between items-center mb-5">
        <div>
          <h3 className="font-bold text-lg">Recent Users</h3>
        </div>
        <div className="flex rounded-lg hover:bg-[#17193F] items-center space-x-1 border py-2 px-5 border-gray-400 cursor-pointer">
          <button className="hover:text-white">View All</button>
          <i className="ml-4 fa-solid fa-arrow-right"></i>
        </div>
      </div>
      <DataTable
        columns={props.columns}
        data={props.userdetails}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        
        // subHeader
        // subHeaderComponent={
        //   <div className="mt-4 flex justify-between items-center">
        //     <div>
        //       <h3 className="font-bold text-lg">Company Details</h3>
        //     </div>
        //     <div>
        //       <input
        //         type="text"
        //         placeholder="Search here"
        //         className="w-50 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 p-4 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //       />
        //       <button className="text-white text-sm ml-4 bg-[#0C198B] p-2 rounded-full">
        //         Add New Company
        //       </button>
        //     </div>
        //   </div>
        // }
      />
    </>
  );
}

export default MainUser;
