import { Avater } from 'assets';
import React from 'react';
import { useLocation } from 'react-router-dom';

function FeedbackMessaging() {
	const location = useLocation();
	return (
		<div className='bg-white w-full h-full px-4 lg:px-10 py-8'>
			<div className='lg:w-[25%] flex justify-start items-center'>
				<img src={Avater} alt='' className='rounded-full w-12 h-12' />
				<div className='ml-2'>
					<p className='font-bold text-sm'>{location?.state?.name}</p>
				</div>
			</div>
			<p className='text-gray-300'>{location?.state?.date}</p>

			<h2 className='font-bold text-3xl pt-6'>{location?.state?.subject}</h2>

			<p className='text-sm my-4'>Hello Sir/Ma, </p>

			<p className='text-sm'>{location?.state?.body}</p>

			<p className='text-sm mt-4'>Thank you</p>

			<div className='pt-4'>
				<textarea
					className='border border-gray-300 p-4 w-full h-56 outline-none resize-none'
					placeholder='Message'
				/>
			</div>
			<div className='flex flex-wrap justify-between pt-4'>
				<div className=''>
					<p className='flex justify-start items-center text-gray-400 text-xs'>
						<i className='rounded-full border border-gray-500 w-4 h-4 text-center p-2 text-xs flex justify-center items-center fa-solid fa-exclamation mr-1'></i>
						Josephine ki will be notified
					</p>
				</div>

				<div className='mt-4 lg:mt-0'>
					<input id='attachment' hidden type={'file'} />
					<label
						htmlFor='attachment'
						className='transition ease-in-out  delay-150 py-3 px-4 rounded-md text-[#909090] bg-[#C8C8C8] hover:-translate-y-1 hover:scale-110 hover:bg-black hover:text-white duration-300 '
					>
						<i className='fa-solid fa-paperclip'></i> Attachment
					</label>
					<button className='ml-4 transition ease-in-out delay-150 py-2 px-4 rounded-md text-white bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 '>
						<i className='fa-solid fa-paper-plane text-white'></i> Send
					</button>
				</div>
			</div>
		</div>
	);
}

export default FeedbackMessaging;
