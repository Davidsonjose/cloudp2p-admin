import React from 'react';
import { Zoom } from 'react-reveal';

function EmergencyManager() {
	return (
		<div className=' py-4  px-4 lg:py-8 bg-[#2A2A2A] shadow-wrapper w-full h-full'>
			<Zoom>
				<div className='flex flex-col md:flex-row justify-around items-center flex-wrap h-full w-full'>
					<div className='bg-[#B80202] w-[250px] lg:w-[40%] h-[200px] rounded-lg mb-4 py-6 flex items-center justify-between flex-col'>
						<p className='text-white text-xl lg:text-3xl'>
							<i className='fa-solid fa-fire mr-3'></i>FIRE
						</p>
						<a href='tel:+2348022596060'>
							<p className='text-xs text-gray-300'>
								Click Here <i className='fa-solid fa-arrow-right mr-3'></i>
							</p>
						</a>
					</div>
					<div className='bg-[#00199C] w-[250px] lg:w-[40%] h-[200px] rounded-lg mb-4 py-6 flex items-center justify-between flex-col'>
						<p className='text-white text-xl lg:text-3xl'>
							<i className='fa-solid fa-heart-circle-plus'></i> MEDICAL
						</p>
						<a href='tel:+2348022596060'>
							<p className='text-xs text-gray-300'>
								Click Here <i className='fa-solid fa-arrow-right mr-3'></i>
							</p>
						</a>
					</div>
					<div className='bg-[#00930F] w-[250px] lg:w-[40%] h-[200px] rounded-lg mb-4 py-6 flex items-center justify-between flex-col'>
						<p className='text-white text-xl lg:text-3xl'>
							<i className='fa-solid fa-shield mr-3'></i>SECURITY
						</p>
						<a href='tel:+2348022596060'>
							<p className='text-xs text-gray-300'>
								Click Here <i className='fa-solid fa-arrow-right mr-3'></i>
							</p>
						</a>
					</div>
				</div>
			</Zoom>
		</div>
	);
}

export default EmergencyManager;
