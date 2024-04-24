import { Types } from "mongoose";

export interface ISummary {
	_id: Types.ObjectId;
	shipping: number;
	subtotal: number;
	taxes: number;
	total: number;
	order: Types.ObjectId;
}
