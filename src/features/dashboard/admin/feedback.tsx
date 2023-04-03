import { Avater } from 'assets';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FeedbackComplaint() {
	const navigate = useNavigate();
	// const [active, setActive] = useState();

	const data = [
		{
			name: 'Josephine Ki',
			subject: 'Insufficient Product',
			body: '  we have a issue concerning the product...',
			date: 'Feb 20',
		},
		{
			name: 'Josephine Ki',
			subject: 'Insufficient Product',
			body: '  we have a issue concerning the product...',
			date: 'Feb 20',
		},
		{
			name: 'Josephine Ki',
			subject: 'Insufficient Product',
			body: '  we have a issue concerning the product...',
			date: 'Feb 20',
		},
		{
			name: 'Josephine Ki',
			subject: 'Insufficient Product',
			body: '  we have a issue concerning the product...',
			date: 'Feb 20',
		},
		{
			name: 'Josephine Ki',
			subject: 'Insuffiecient Product',
			body: '  we have a issue concerning the product...',
			date: 'Feb 20',
		},
		{
			name: 'Josephine Ki',
			subject: 'Insufficient Product',
			body: '  we have a issue concerning the product...',
			date: 'Feb 20',
		},
		{
			name: 'Josephine Ki',
			subject: 'Insufficient Product',
			body: '  we have a issue concerning the product...',
			date: 'Feb 20',
		},
		{
			name: 'Josephine Ki',
			subject: 'Insufficient Product',
			body: ' we have a issue concerning the product...',
			date: 'Feb 20',
		},
	];
	return (
		<div className=' p-4  bg-white shadow-wrapper'>
			<div className='w-[80%] relative mx-auto'>
				<input
					className='w-full pl-8 pr-4 py-2 rounded-2xl border border-gray-300 bg-[#DADADA] placeholder:text-gray-400 outline-none'
					placeholder='Search'
				/>
				<i className='fa-solid fa-magnifying-glass absolute top-3 left-2 text-gray-400'></i>
			</div>

			<div className='py-8'>
				{data.map((item, i) => (
					<div
						onClick={() => {
							navigate('messaging', { state: item });
						}}
						key={i}
						className='flex flex-wrap justify-between items-center border-b border-gray-200 py-3'
					>
						<div className='lg:w-[25%] flex justify-start items-center'>
							<img src={Avater} alt='' className='rounded-full w-12 h-12' />
							<div className='ml-2'>
								<p className='font-bold text-sm'>{item.name}</p>
								<p className='bg-[#F60D0D78]/50 text-center rounded-2xl text-xs text-white'>
									<i className='fa-solid fa-trash-can'></i> Delete
								</p>
							</div>
						</div>
						<div className='w-full lg:w-[60%]'>
							<p className='text-sm'>
								<span className='font-bold'>{item.subject}</span> - {item.body}
							</p>
						</div>
						<div className='w-full lg:w-[10%]'>
							<p className='text-xs text-right'>{item.date}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default FeedbackComplaint;
