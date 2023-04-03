import React, { useEffect, useMemo } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { GlobalFilter } from './filter/GlobalFilter';

export const TableComponent = ({
	COLUMNS,
	DATA,
	TITLE,
	setSize,
	setPageIndex,
	className,
	btnOnClick,
	btnTitle,
}) => {
	const columns = useMemo(() => COLUMNS, [COLUMNS]);
	const data = useMemo(() => DATA, [DATA]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canPreviousPage,
		canNextPage,
		pageOptions,
		state,
		setGlobalFilter,
		gotoPage,
		pageCount,
		prepareRow,
		setPageSize,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 5 },
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter, pageIndex, pageSize } = state;

	useEffect(() => {
		setSize(pageSize);
		setPageIndex(pageIndex);
	}, [pageIndex, pageSize, setSize, setPageIndex]);

	return (
		<>
			<div className='mt-4 lg:flex lg:mx-0 mx-4 justify-between items-center mb-5'>
				<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
				{btnTitle && (
					<button
						className='text-white text-sm ml-4 bg-[#0C198B] p-2 rounded-lg'
						onClick={btnOnClick}
					>
						{btnTitle}
					</button>
				)}
			</div>
			{DATA.length > 0 ? (
				<div className='w-full overflow-auto lg:rounded-xl'>
					<div
						className={`w-full overflow-auto bg-white  text-sm pb-4 lg:rounded-xl  ${className}`}
					>
						<table className='w-full table ' {...getTableProps()}>
							<thead className='w-full  text-white'>
								{headerGroups.map((headerGroup) => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map((column) => (
											<th
												{...column.getHeaderProps(column.getSortByToggleProps())}
												className=' whitespace-nowrap bg-[#676767] after: text-center pl-6 pr-3 pt-3 text-sm text-gray-200 font-semibold'
											>
												{column.render('Header')}
												<span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody {...getTableBodyProps()} className='px-8 bg-white'>
								{page.map((row) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()}>
											{row.cells.map((cell) => {
												return (
													<td
														className='pl-6 pr-3 py-4 border border-gray-500 text-center text-xs'
														{...cell.getCellProps()}
													>
														{cell.render('Cell')}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
						<div className='flex justify-center items-center text-xs  rounded-b-2xl'>
							<button className='pl-4' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
								{'<<'}
							</button>
							<button className='pl-4' onClick={() => previousPage()} disabled={!canPreviousPage}>
								{'<'}
							</button>
							<button className='pl-4' onClick={() => nextPage()} disabled={!canNextPage}>
								{'>'}
							</button>
							<button
								className='pl-4'
								onClick={() => gotoPage(pageCount - 1)}
								disabled={!canNextPage}
							>
								{'>>'}
							</button>{' '}
							<span className='pl-4 text-xs'>
								Page{' '}
								<strong>
									{pageIndex + 1} of {pageOptions.length}
								</strong>{' '}
							</span>
							<span className='pl-4'>
								| Go to page:{' '}
								<input
									type='number'
									defaultValue={pageIndex + 1}
									onChange={(e) => {
										const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
										gotoPage(pageNumber);
									}}
									className=' py-0 text-xs lg:rounded-l-md'
									style={{ width: '50px' }}
								/>
							</span>
							<select
								className=' bg-transparent py-0 text-xs lg:rounded-r-md outline-0 focus:border-0 focus:border-black'
								value={pageSize}
								onChange={(e) => setPageSize(Number(e.target.value))}
							>
								{[5, 15, 30].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			) : (
				<p className='p-4 text-center bg-white rounded-md text-sm text-gray-500'> No records</p>
			)}
		</>
	);
};
