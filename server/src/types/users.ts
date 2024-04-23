import { Types } from "mongoose";

export enum EUserRole {
	" buyer",
	"seller",
}

export interface IUser {
	_id: Types.ObjectId;
	firstName: string;
	lastName?: string;
	email: string;
	password: string;
	role: EUserRole;
	paymentDetails: Array<Types.ObjectId>;
	orders: Array<Types.ObjectId>;
	notifications: Array<Types.ObjectId>;
}
