import { Types } from "mongoose";

export enum EProductState {
	"Out Of Stock",
	"In Stock",
}

export interface IProduct {
	_id: Types.ObjectId;
	price: number;
	rating: number;
	categories: Array<Types.ObjectId>;
	description: string;
	images: Array<string>;
	state: EProductState;
    seller: {
        _id: Types.ObjectId,
        name: string
    }
    quantity: number,
	creationDate: Date;
}
