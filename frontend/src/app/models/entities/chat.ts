import { Entity } from "../base/entity";
import { Message } from "./message";
import { User } from "./user";

export class Chat extends Entity{
	Name: string;
	Type: string;
	Participants: User[];
	Messages: Message[];
	LastUpdate: Date;
}