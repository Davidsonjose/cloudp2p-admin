import MainLayout from 'layouts';
import { Route, Routes } from 'react-router-dom';
import AdminRoute from '../../routes/AdminRoute';
import LoginRoute from '../../routes/LoginRoute';
import { useSelector } from 'react-redux';
// import { userData } from "../src/store/reducer/authReducer";
import { selectUser } from '../auth/api/slice';
import Login from 'features/auth/login';
import Welcome from 'layouts/welcome';
import SignUp from './signup';
function AuthRoutes() {
	const user = useSelector(selectUser);
	return (
		<Routes>
			<Route path='/' element={<LoginRoute />}>
				<Route path='/welcome' element={<Welcome />} />
			</Route>
			<Route path='/' element={<LoginRoute />}>
				<Route path='login' element={<Login />} />
			</Route>
			{/* <Route path="/" element={<LoginRoute />}>
      </Route> */}
			<Route path='register' element={<SignUp />} />
		</Routes>
	);
}

export default AuthRoutes;
