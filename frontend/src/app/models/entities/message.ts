import { Entity } from "../base/entity";

export class Message extends Entity {
	Username: string;
	UserId: string;
	Text: string;
	SeenList: string[];
}