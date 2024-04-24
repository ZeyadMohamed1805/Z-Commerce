import { Types } from "mongoose";

export interface ICategory {
	_id: Types.ObjectId;
	name: string;
	products: Array<Types.ObjectId>;
	supcategory: Types.ObjectId;
	subcategories: Array<Types.ObjectId>;
}
