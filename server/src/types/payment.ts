import { Types } from "mongoose";

export interface IPayment {
	_id: Types.ObjectId;
	address: string;
	phone: string;
	user: Types.ObjectId;
}
