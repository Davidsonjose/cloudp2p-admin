import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from 'components/form-control/input';
import { LOGO } from 'assets';
import axios from 'axios';
import API_URL from 'config';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminSession, setManagerSession } from 'common';
import { setRefreshToken, setToken, setUser } from '../api/slice';
import { CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
function Login() {
	// const [email, setEmail] = useState("")
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [message2, setMessage2] = useState('');
	const [err, setErr] = useState('');
	const { register, handleSubmit, reset, setValue } = useForm();
	const [accesstoken, setAcessToken] = useState(null);
	const [admin, setAdmin] = useState<any>(null);
	const [data, setData] = useState(null);
	const [remember, setRemember] = useState(false);
	const handleLogin = (data: any) => {
		setLoading(true);
		setErr('');
		setMessage('');

		// console.log(data);

		// useEffect(() => {
		//   setTimeout(
		//     () =>
		//       initemp({
		//         name: 'John Holland',
		//         email: 'abc@email.com',
		//         mobile: '08923456790',
		//       }),
		//     1000,
		//   )
		// }, [])
		// useEffect(() => {
		//   reset(emp)
		// }, [emp])

		const info = {
			email: data.email,
			password: data.password,
		};
		const main = data;
		axios
			.post(`${API_URL}/admin/login`, info)
			.then(({ data }) => {
				if (remember === true) {
					localStorage.setItem('remember', 'yes');
					localStorage.setItem('pass', main?.password);
					localStorage.setItem('email', main?.email);
				}
				setLoading(false);
				setMessage('Login Successful');
				// setData(data)
				setAdmin(data?.payload[0]);
				setAcessToken(data?.accessToken);
				// dispatch(
				//   setRefreshToken({
				//     user: data?.payload[0],
				//     accessToken: data?.accessToken,
				//     refreshtoken: data?.refreshToken,
				//   })
				// );
				dispatch(setRefreshToken(data?.refreshToken));
				dispatch(setToken(data?.accessToken));
				dispatch(setUser(data?.payload[0]));
				setTimeout(() => {
					//   setLoading(!loading);
					setMessage2('Please wait while we redirect you');
				}, 1000);

				reset(data);
			})
			.catch((error) => {
				setLoading(false);
				setErr(error?.response?.data?.message);
			});
	};

	const formData = [
		{
			label: 'Email',
			placeholder: 'enter your email',
			type: 'email',
			register: { ...register('email') },
		},
		{
			label: 'Password',
			placeholder: '******',
			type: 'password',
			register: { ...register('password') },
		},
	];

	useEffect(() => {
		if (message2) {
			setTimeout(() => {
				setLoading(true);
				if (admin?.role === 'admin') {
					setAdminSession(accesstoken, admin);
				} else {
					setManagerSession(accesstoken, admin);
				}
				window.location.href = `/dashboard/${admin?.role}`;
			}, 1500);
		}
	}, [message2]);

	useEffect(() => {
		const isremember = localStorage.getItem('remember');
		const email = localStorage.getItem('email');
		// alert(email)
		const pass = localStorage.getItem('pass');
		if (isremember === 'yes') {
			setValue('password', pass);
			setValue('email', email);
		}
	}, []);
	return (
		<>
			<div
				className='flex justify-center items-center overflow-hidden w-screen h-screen'
				style={{
					backgroundImage:
						'url(https://images.unsplash.com/photo-1588362951121-3ee319b018b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWNjZXNzJTIwY29udHJvbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				{loading && (
					<Dialog
						open={loading === true}
						onClose={() => console.log('trying')}
						// TransitionComponent={Transition}
					>
						{/* <div className="p-5">
              
            </div> */}
						<CircularProgress color='primary' className='m-5' />
					</Dialog>
				)}
				<div className='flex-1'>
					<div className='flex justify-center'>
						<div className='w-[100%] mx-3 md:w-[70%] lg:w-[50%] rounded-lg shadow-lg  bg-white justify-center'>
							<div className='flex justify-center'>
								<img src={LOGO} alt='' className='w-44 h-44 self-center' />
							</div>

							{message && (
								<div className='p-4 mx-10 mb-10 rounded-lg bg-green-500 flex justify-between items-center'>
									<div>
										<span className='text-white font-semibold '>{message}</span>
										<br />
										{message2 && (
											<span className='text-white font-semibold text-xs'>
												Please wait while we redirect you ....
											</span>
										)}
									</div>
									<div onClick={() => setMessage('')}>
										<i className='fa-solid fa-circle-xmark text-white'></i>
									</div>
								</div>
							)}

							{err && (
								<div className='p-4 mb-10 mx-10 rounded-lg bg-red-500 flex justify-between items-center'>
									<span className='text-white font-semibold '>{err}</span>
									<div onClick={() => setErr('')}>
										<i className='fa-solid fa-circle-xmark text-white'></i>
									</div>
								</div>
							)}
							<div className='flex justify-center'>
								<form
									className='w-[100%] md:w-[70%] lg:w-[100%]'
									onSubmit={handleSubmit(handleLogin)}
								>
									<div className='px-12'>
										<span className='text-[#001F56] font-bold text-lg pb-10'>
											Welcome to Lagos Free Zone
										</span>
										<br />
										<br />
										<span className='text-[#053443] font-bold text-lg'>Sign in</span>
										<br />
										<br />
										{formData.map((item, i) => (
											<>
												<Input
													register={item.register}
													placeholder={item.placeholder}
													type={item.type}
													label={item.label}
												/>
											</>
										))}
										<div className='space-x-2 items-center flex mb-4'>
											<input
												id='default-checkbox'
												type='checkbox'
												value=''
												checked={remember}
												onChange={() => {
													setRemember(!remember);

													// if (!checkone) {
													//   setShowModal(true);
													// }
													//   setCheckOne(!checkone);
												}}
												className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
											/>
											<span
												// onClick={() => setShowModal(true)}
												className='text-APP_BLUE font-bold text-sm cursor-pointer'
											>
												Remember me.
											</span>
										</div>
									</div>
									<div className=''>
										<button
											className='mx-auto py-2 mb-6 rounded-lg w-[50%] justify-center bg-[#1021BC] flex'
											type='submit'
										>
											<span className='text-white py-1 hover:text-[#1021BC] font-semibold text-base'>
												Submit
											</span>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
