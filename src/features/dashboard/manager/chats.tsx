import { Avater } from 'assets';
import axios from 'axios';
import { getManagerToken } from 'common';
import API_URL from 'config';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ChatMgr() {
	const token = getManagerToken();
	const location = useLocation();
	const navigate = useNavigate();
	const axiosCreate = axios.create({
		headers: {
			authorization: 'Bearer ' + token,
			//   "Content-Type": "multipart/form-data",
		},
	});
	useEffect(() => {
		axiosCreate.put(`${API_URL}/manager/information/update/${location?.state?._id}`, { seen: true }).then(() => { }).catch((error) => { console.log(error) })
	}, [])
	return (
		<div className='bg-white w-full h-full px-4 lg:px-10 py-8'>
			<div>
				<i
					onClick={() => navigate('/dashboard/manager/information')}
					className='fa-solid fa-arrow-left-long cursor-pointer'
				></i>
				<i className='fa-solid fa-trash-can ml-8  cursor-pointer'></i>
				<i className='fa-solid fa-envelopes-bulk  ml-8 cursor-pointer'></i>
			</div>
			<h2 className='font-bold text-3xl pt-6 mb-8'>{location?.state?.subject}</h2>
			<div className='lg:w-[25%] flex justify-start items-center mb-8'>
				<div className='lg:w-[25%] flex justify-start items-center'>
					<img src={Avater} alt='' className='rounded-full w-12 h-12' />
					<div className='ml-2'>
						<p className='font-bold text-sm'>Admin</p>
						<p className='   text-[9px] text-gray-400'>to me</p>
					</div>
				</div>
			</div>

			<p className='text-sm my-4 mb-8'>Hello Sir/Ma, </p>

			<p className='text-xs mb-8'>
				{location?.state?.message}
			</p>

			{/* <p className='text-sm mt-4'>Thank you</p> */}
		</div>
	);
}

export default ChatMgr;
