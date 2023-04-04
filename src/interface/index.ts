export interface UserPayload {
	firstName?: string;
	lastName?: string;
	id?: string | number;
	photoUri?: string;
	phoneNumber?: string | null;
	email?: string;
}

export interface analyticsWidgetProps {
	containerBackgroundColor: string;
	iconBackground: string;
	icon: any;
	labelColor: string;
	textvalueColor: string;
	value: string | number | null;
	label: string;
}
export interface headerProps {
	title: string;
	description?: string;
	image?: string;
}
export interface ToastProps {
	text: string | null,
	timeout?: number,
	type?: string,
	error: string | null,
	success: string | null
}
export interface AppBar {
	user: any;
}

// export interface ErrorToastProps {
// 	text: string,
// 	timeout?: number,
// 	type: string
// }



export interface LoadingProps {
	loading: boolean
}
