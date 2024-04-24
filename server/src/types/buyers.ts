import { Types } from "mongoose";

export interface IBuyer {
	_id: Types.ObjectId;
	user: Types.ObjectId;
	cart: Array<Types.ObjectId>;
	wishlist: Array<Types.ObjectId>;
}
