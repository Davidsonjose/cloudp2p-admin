// import AuthWrapper from 'components/wrappers/auth-wrapper';
import { useForm } from "react-hook-form";
// import Input from 'components/form-control/input';
import DataTable from "react-data-table-component";
import { useRouter } from "next/navigation";

interface mainLayoutTypes {
  children: JSX.Element;
}

function UserTable(props: any) {
  const router = useRouter();
  const {} = props;
  return (
    <>
      <div className="mt-10 flex lg:mx-0 mx-4 justify-between items-center mb-5 py-5">
        <div>
          <h3 className="font-bold text-lg pt-5 lg:pt-0">Recent Users</h3>
        </div>
        <div className="flex rounded-lg items-center space-x-1 border py-2 px-5 border-gray-400 cursor-pointer">
          <button
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/admin/users")}
          >
            View All
          </button>
          <i className="ml-4 fa-solid fa-arrow-right"></i>
        </div>
        {/* <div className="lg:mt-0 mt-4 flex justify-between space-x-5">
        </div> */}
        {/* <div className="flex items-center space-x-2">
            <span className="text-gray-400">Role:</span>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>All</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
          </div> */}
        {/* <input
            type="text"
            placeholder="Search here"
            className="w-50 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 p-3 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          /> */}
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

export default UserTable;
