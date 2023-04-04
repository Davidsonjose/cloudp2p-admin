import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/form-control/input';
import axios from 'axios';
import API_URL from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminSession } from '@/common';
import { setRefreshToken, setToken, setUser } from '../api/slice';

function SignUp() {

	// const handleSubmit = (data: any) => {
	// 	window.location.href = '#';
	// 	setErr('');
	// 	setMessage('');
	// 	setLoading(true);
	// 	const file = data.nin[0];
	// 	console.log(file);
	// 	if (!file) {
	// 		setLoading(false);
	// 		setErr("NIN/CEPAC is required in PDF's format");
	// 	}
	// 	if (file.type !== 'application/pdf') {
	// 		setLoading(false);
	// 		setErr('File type must be PDF');
	// 		return;
	// 	}
	// 	const form = new FormData();
	// 	form.append('image', file);
	// 	form.append('name', data?.firstname);
	// 	form.append('email', data?.email);
	// 	form.append('phone', data?.phone);
	// 	form.append('company', companyid as any);
	// 	form.append('companyid', 'notneeded');
	// 	form.append('designation', data?.designation);
	// 	form.append('address', 'no address');
	// 	axios
	// 		.post(`${API_URL}/manager/register`, form)
	// 		.then((data) => {
	// 			setLoading(false);
	// 			setMessage(
	// 				'Registration completed successful. You will get you login credentials after your account as been verified'
	// 			);
	// 			setTimeout(() => {
	// 				setLoading(true);
	// 				window.location.reload();
	// 			}, 3000);
	// 		})
	// 		.catch((error) => {
	// 			// console.log(error);
	// 			setLoading(false);
	// 			setErr(error?.response?.data?.message);
	// 		});
	// };


	// useEffect(() => {
	// 	if (message2) {
	// 		setTimeout(() => {
	// 			setLoading(true);
	// 			setAdminSession(accesstoken, admin);
	// 			window.location.href = '/dashboard/admin';
	// 		}, 1500);
	// 	}
	// }, [message2]);

	return (
		<>

		</>
	);
}

export default SignUp;
