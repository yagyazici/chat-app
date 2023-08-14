import { Entity } from "../base/entity";

export class Message extends Entity {
	UserId: string;
	Text: string;
	SeenList: string[];
}