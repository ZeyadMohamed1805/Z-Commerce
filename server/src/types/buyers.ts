import { Types } from "mongoose";

export interface IBuyer {
	_id: Types.ObjectId;
	user: Types.ObjectId;
	cart: Array<{
		_id: Types.ObjectId;
		quantity: number;
	}>;
	wishlist: Array<{
		_id: Types.ObjectId;
		quantity: number;
	}>;
}
