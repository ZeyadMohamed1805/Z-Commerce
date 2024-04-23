import { Types } from "mongoose";

export interface INotification {
	_id: Types.ObjectId;
	message: string;
	date: Date;
	user: Types.ObjectId;
}
