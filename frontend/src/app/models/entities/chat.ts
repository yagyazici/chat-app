import { Message } from "./message";
import { User } from "./user";

export class Chat {
	Id: string;
	Participants: User[];
	Messages: Message[];
	LastUpdate: Date;
}