import React from 'react';

function Button(props: any) {
	return (
		<div>
			<button
				onClick={props.onClick}
				className={`transition ease-in-out delay-150 py-2 px-3 rounded-[10px] ${props.bgColor} hover:-translate-y-1 hover:scale-110 ${props.hoverColor} ${props.textColor} duration-300 ${props.className}`}
			>
				{props.title}
			</button>
		</div>
	);
}

export default Button;
