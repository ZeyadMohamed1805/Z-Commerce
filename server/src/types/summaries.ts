import { Types } from "mongoose";

export interface ISummary {
	_id: Types.ObjectId;
	products: Array<{
		_id: Types.ObjectId;
		quantity: number;
	}>;
	shipping: number;
	subtotal: number;
	taxes: number;
	total: number;
	order: Types.ObjectId;
}
