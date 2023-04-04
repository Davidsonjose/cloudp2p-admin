import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/form-control/input';
import { LOGO } from '@/assets';
import axios from 'axios';
import API_URL from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminSession } from '@/common';
import { setRefreshToken, setToken, setUser } from '../api/slice';

function SignUp() {

	return (
		<>

		</>
	);
}

export default SignUp;
