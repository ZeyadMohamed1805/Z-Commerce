export enum EUserRole {
	" buyer",
	"seller",
}

export type TUser = {};

export interface IUser {
	_id: string;
	firstName: string;
	lastName?: string;
	email: string;
	password: string;
	paymentDetails: Array<string>;
	role: EUserRole;
	orders: Array<string>;
	notifications: Array<string>;
}
