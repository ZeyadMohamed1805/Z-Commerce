import { Types } from "mongoose";

export interface ISeller {
	_id: Types.ObjectId;
	rating: number;
	image?: string;
	inventory: Array<Types.ObjectId>;
	user: Types.ObjectId;
}
