import { analyticsWidgetProps } from '@/interface';

function AnalyticWidget(props: analyticsWidgetProps) {
	return (
		<div className='relative  bg-transparent pt-3'>
			<div
				className={` h-32 w-32  md:h-40 md:w-40 ${props.containerBackgroundColor} shadow-header rounded-lg mb-4 lg:mb-0`}
			>
				<img
					src={props.icon}
					alt=''
					className={`${props.iconBackground} h-10 w-10 p-2 absolute top-0 left-4 rounded-xl`}
				/>
				<div className='w-full h-[50%]  pt-8 px-4 '>
					<span className={` ${props.labelColor} text-xs pt-2 text-left `}>{props.label}</span>
				</div>

				<p className={`${props.textvalueColor} font-bold text-left px-4 pt-2 text-xl lg:text-4xl`}>
					{props?.value}
				</p>
				{/* <p className={`${props.textvalueColor} font-bold text-center pt-2 text-lg`}>{props.value}</p> */}
			</div>
		</div>
	);
}

export default AnalyticWidget;
