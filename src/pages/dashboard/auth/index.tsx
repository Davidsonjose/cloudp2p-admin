import MainLayout from '@/layouts';

import { useSelector } from 'react-redux';
import { selectUser } from '../auth/api/slice';
function AuthRoutes() {
	const user = useSelector(selectUser);
	return (
		<>
		</>
	);
}

export default AuthRoutes;