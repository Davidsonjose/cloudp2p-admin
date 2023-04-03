import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from 'components/form-control/input';
import { LOGO } from 'assets';
import axios from 'axios';
import API_URL from 'config';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminSession } from 'common';
import { setRefreshToken, setToken, setUser } from '../api/slice';
import { useSearchParams } from 'react-router-dom';
import TermsAndCondition from 'layouts/termsandcondition';
function SignUp() {
	// const [email, setEmail] = useState("")
	let [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [message2, setMessage2] = useState('');
	const [err, setErr] = useState('');
	const { register, handleSubmit } = useForm();
	const [accesstoken, setAcessToken] = useState(null);
	const [admin, setAdmin] = useState(null);
	const [data, setData] = useState(null);
	const [checkone, setCheckOne] = useState(false);
	const [checktwo, setCheckTwo] = useState(false);
	const [showmodal, setShowModal] = useState(false);
	const roled = searchParams.get('role');
	const companyid = searchParams.get('company');
	const handleManager = (data: any) => {
		window.location.href = '#';
		setErr('');
		setMessage('');
		setLoading(true);
		const file = data.nin[0];
		console.log(file);
		if (!file) {
			setLoading(false);
			setErr("NIN/CEPAC is required in PDF's format");
		}
		if (file.type !== 'application/pdf') {
			setLoading(false);
			setErr('File type must be PDF');
			return;
		}
		const form = new FormData();
		form.append('image', file);
		form.append('name', data?.firstname);
		form.append('email', data?.email);
		form.append('phone', data?.phone);
		form.append('company', companyid as any);
		form.append('companyid', 'notneeded');
		form.append('designation', data?.designation);
		form.append('address', 'no address');
		axios
			.post(`${API_URL}/manager/register`, form)
			.then((data) => {
				setLoading(false);
				setMessage(
					'Registration completed successful. You will get you login credentials after your account as been verified'
				);
				setTimeout(() => {
					setLoading(true);
					window.location.reload();
				}, 3000);
			})
			.catch((error) => {
				// console.log(error);
				setLoading(false);
				setErr(error?.response?.data?.message);
			});
	};

	useEffect(() => {
		if (!roled || !companyid) {
			window.location.href = '/';
		}
	}, []);
	const formData = [
		// {
		//   label: "Company ID",
		//   placeholder: "Enter company id",
		//   type: "text",
		//   register: { ...register("companyid") },
		// },
		{
			label: 'Name',
			placeholder: 'enter name',
			type: 'text',
			register: { ...register('firstname') },
		},
		{
			label: 'Phone number',
			placeholder: 'enter phone',
			type: 'number',
			register: { ...register('phone') },
			limit: true,
		},
		{
			label: 'Email address',
			placeholder: 'enter email',
			type: 'email',
			register: { ...register('email') },
		},
		{
			label: 'Designation',
			placeholder: 'enter designation',
			type: 'text',
			register: { ...register('designation') },
		},
		// {
		//   label: "Address",
		//   placeholder: "enter company address",
		//   type: "text",
		//   register: { ...register("address") },
		// },
		{
			label: 'Upload NIN/CERPAC {PDF Format Required}',
			//   placeholder: "enter company description",
			type: 'file',
			register: { ...register('nin') },
		},
	];

	useEffect(() => {
		if (message2) {
			setTimeout(() => {
				setLoading(true);
				setAdminSession(accesstoken, admin);
				window.location.href = '/dashboard/admin';
			}, 1500);
		}
	}, [message2]);

	// console.log(checkone);
	const complete = checkone || checktwo;
	return (
		<>
			<div
				className='flex bg-gray-500 justify-center items-center w-screen'
				style={
					{
						//   backgroundImage:
						//     "url(https://images.unsplash.com/photo-1588362951121-3ee319b018b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWNjZXNzJTIwY29udHJvbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
						//   backgroundRepeat: "no-repeat",
						//   backgroundSize: "cover",
					}
				}
			>
				{loading && (
					<>
						<div className='justify-center z-50 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0  outline-none focus:outline-none'>
							<div className='relative w-auto my-6 mx-auto max-w-3xl'>
								{/*content*/}
								<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
									{/*header*/}
									{/*body*/}
									<div className='relative p-6 flex-auto'>
										<div className=' flex justify-center items-center'>
											<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
										</div>
									</div>
									{/*footer*/}
								</div>
							</div>
						</div>
						<div className='opacity-25 fixed inset-0  bg-black'></div>
					</>
				)}
				<div className='flex-1 my-[20px]'>
					<div className='flex justify-center'>
						<div className='w-[100%] lg:w-[60%] mx-2 lg:mx-10 rounded-lg shadow-lg  bg-white justify-center'>
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
									className='w-[100%] md:w-[70%] lg:w-[70%]'
									onSubmit={handleSubmit(handleManager)}
								>
									<div className='px-12'>
										<span className='text-[#001F56] font-bold text-lg pb-10'>
											Welcome to Lagos Free Zone
										</span>
										<br />
										<br />
										<span className='text-[#053443] font-bold text-lg'>Sign up</span>
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
												checked={checkone}
												onChange={() => {
													// if (!checkone) {
													//   setShowModal(true);
													// }
													setCheckOne(!checkone);
												}}
												className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
											/>
											<span
												onClick={() => setShowModal(true)}
												className='text-APP_BLUE font-bold text-sm cursor-pointer'
											>
												Terms and condition
											</span>
										</div>
									</div>
									<div className=''>
										<button
											className={`mx-auto py-2 mb-6 rounded-lg w-[50%] justify-center ${
												!complete ? 'bg-gray-400' : 'bg-[#1021BC]'
											} flex`}
											type='submit'
											disabled={!complete}
										>
											<span className='text-white py-1 font-semibold text-base'>Submit</span>
										</button>
									</div>
								</form>
							</div>
							<TermsAndCondition
								showmodal={showmodal}
								setShowModal={setShowModal}
								setCheckTwo={setCheckTwo}
								setCheckOne={setCheckOne}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignUp;
