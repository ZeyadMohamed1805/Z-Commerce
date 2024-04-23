import { Types } from "mongoose";

export interface IPayment {
	_id: Types.ObjectId;
	address: string;
	phone: number;
	card: number;
	cvv: number;
	user: Types.ObjectId;
}
