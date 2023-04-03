import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export const GlobalFilter = ({ filter, setFilter }) => {
	const [value, setValue] = useState(filter);
	const onChange = useAsyncDebounce((value) => {
		setFilter(value || undefined);
	}, 1000);
	return (
		<span>
			<input
				style={{ borderWidth: 1 }}
				className=' border-gray-400 mb-2 outline-none  px-2 py-1 rounded-md'
				placeholder='search'
				value={value || ''}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
			/>
		</span>
	);
};
