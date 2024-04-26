import { Types } from "mongoose";

export enum EProductState {
	"Out Of Stock",
	"In Stock",
}

export interface IProduct {
	_id: Types.ObjectId;
	name: string;
	price: number;
	rating: number;
	categories: Array<{
		_id: Types.ObjectId;
		name: string;
	}>;
	description: string;
	images: Array<string>;
	cloudinary_ids: Array<string>;
	state: EProductState;
	seller: {
		_id: Types.ObjectId;
		name: string;
	};
	quantity: number;
	creationDate: Date;
}
