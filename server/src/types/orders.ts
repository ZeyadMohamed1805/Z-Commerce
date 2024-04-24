import { Types } from "mongoose";

export enum EOrderState {
	"In Progress",
	"On The Way",
	"Delivered",
	"Delayed",
	"Cancelled",
}

export interface IOrder {
	_id: Types.ObjectId;
	createdDate: Date;
	deliveryDate: Date;
	buyer: Types.ObjectId;
	sellers: Array<Types.ObjectId>;
	state: EOrderState;
	products: Array<{
		_id: Types.ObjectId;
		quantity: number;
	}>;
	summary: Types.ObjectId;
}
