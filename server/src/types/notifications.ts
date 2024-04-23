import { Types } from "mongoose";

export type TNotification = {};

export interface INotification {
	_id: string;
	message: string;
	date: Date;
	user: Types.ObjectId;
}
