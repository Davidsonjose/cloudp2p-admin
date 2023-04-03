import MainLayout from 'layouts';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AccountSettings from './admin/account-settings';
import Communication from './admin/communication';
import CommunicationManager from './manager/communication';
import Company from './admin/Company';
import Dashboard from './admin/Dashboard';
import Emergency from './admin/emergency';
import Information from './admin/information';
import RegisteredManagers from './admin/registered-managers';
import VisitorsManagement from './admin/visitors-management';
import { useSelector } from 'react-redux';
// import { userData } from "../src/store/reducer/authReducer";
import { selectUser } from '../auth/api/slice';
import FeedbackComplaint from './admin/feedback';
import { useEffect, useState } from 'react';
import IP_URL from 'config/ipurl';
import { io } from 'socket.io-client';
import ChatScreen from './admin/chat-screen';
import ChatScreenManager from './manager/chat-screen';
import FeedbackMessaging from './admin/feedback-messaging';
import ManagerDetails from './admin/Managerdetails';
import ManagerDashboard from './manager/Dashboard';
import VisitorsManagementManager from './manager/visitors-management';
import RegisteredUsers from './admin/registered-users';
import RegisteredUsersManager from './manager/registered-users';
import EmergencyManager from './manager/emergencymanager';
import InformationMgr from './manager/information';
import AccountSettingsManager from './manager/account-settings';
import ChatMgr from './manager/chats';
import CompanyRecords from './admin/company-records';
import TestCode from './admin/test-code';
function DashboardRoutes() {
	const user = useSelector(selectUser);
	const navigate = useNavigate()
	const [socket, setSocket] = useState(null as any);
	const [userdetails, setUserdata] = useState(null);
	const [notification, setNotification] = useState(null as any);
	useEffect(() => {
		setSocket(
			io(IP_URL, {
				transports: ['websocket', 'polling', 'flashsocket'],
			})
		);
	}, []);

	// const socket = io("http://localhost:4000");
	useEffect(() => {
		socket?.emit('userId', user?._id);
		// console.log("eeeeeeehhhhh")
		socket?.on('firstvent', (msg: any) => {
			// alert("here is it");
		});
		socket?.on('userdetails', (msg: any) => {
			setUserdata(msg);
		});
		socket?.on('notifications', (msg: any) => {
			setNotification(msg);
		});
	}, [socket]);




	const checkForInactivity = () => {
		const expireTime = localStorage.getItem("expireTime") || String;
		if (expireTime < Date.now().toFixed()) {
			localStorage.clear();
			navigate("/auth/login")
		}
	}

	const updateExpireTime = () => {
		const expireTime = Date.now() + 180000;

		localStorage.setItem("expireTime", expireTime.toFixed());

	}

	useEffect(() => {
		const interval = setInterval(() => {
			checkForInactivity()
		}, 5000)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		updateExpireTime()

		window.addEventListener("click", updateExpireTime)
		window.addEventListener("keypress", updateExpireTime)
		window.addEventListener("scroll", updateExpireTime)
		window.addEventListener("mousemove", updateExpireTime)


		return () => {
			window.removeEventListener("mousemove", updateExpireTime)
			window.removeEventListener("keypress", updateExpireTime)
			window.removeEventListener("scroll", updateExpireTime)
			window.removeEventListener("mousemove", updateExpireTime)
		}
	}, [])
	return (
		<MainLayout notification={notification} user={userdetails} socket={socket}>
			<Routes>
				<Route path='admin' element={<Dashboard />} />

				<Route path='admin/login' element={<Dashboard />} />

				<Route path='admin/company' element={<Company />} />

				<Route path='admin/visitor-management' element={<VisitorsManagement />} />

				<Route path='admin/registered-managers' element={<RegisteredManagers />} />
				<Route path='admin/registered-users' element={<RegisteredUsers />} />

				<Route path='admin/information' element={<Information />} />

				<Route path='admin/communication' element={<Communication />} />
				<Route path='admin/communication/chat' element={<ChatScreen />} />
				<Route path='admin/code' element={<TestCode />} />

				<Route path='admin/emergency' element={<Emergency />} />

				<Route path='admin/account-settings' element={<AccountSettings />} />
				<Route path='/admin/manager-details' element={<ManagerDetails />} />
				<Route path='admin/feadback-complaints/messaging' element={<FeedbackMessaging />} />
				<Route path='admin/feadback-complaints' element={<FeedbackComplaint />} />
				<Route path='admin/company-records' element={<CompanyRecords />} />

				{/* manager routes */}
				<Route path='manager' element={<ManagerDashboard />} />
				<Route path='manager/visitor-management' element={<VisitorsManagementManager />} />
				<Route path='manager/staff' element={<RegisteredUsersManager />} />
				<Route path='manager/emergency' element={<EmergencyManager />} />
				<Route path='manager/information' element={<InformationMgr />} />
				<Route path='manager/information/chat' element={<ChatMgr />} />
				<Route path='manager/account-settings' element={<AccountSettingsManager />} />
				<Route path='manager/communication' element={<CommunicationManager />} />
				<Route path='manager/communication/chat' element={<ChatScreenManager />} />
			</Routes>
		</MainLayout>
	);
}

export default DashboardRoutes;
