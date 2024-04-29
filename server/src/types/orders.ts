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
	deliveryDate: Date;
	user: Types.ObjectId;
	sellers: Array<Types.ObjectId>;
	state: EOrderState;
	products: Array<{
		_id: Types.ObjectId;
		quantity: number;
	}>;
	summary?: Types.ObjectId;
}
