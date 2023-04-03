import MainLayout from 'layouts';

import { useSelector } from 'react-redux';
// import { userData } from "../src/store/reducer/authReducer";
import { selectUser } from '../auth/api/slice';
import Login from '@/features/auth/login';
import Welcome from '@/layouts/welcome';
import SignUp from './signup';
function AuthRoutes() {
	const user = useSelector(selectUser);
	return (
		<>
		</>
	);
}

export default AuthRoutes;
