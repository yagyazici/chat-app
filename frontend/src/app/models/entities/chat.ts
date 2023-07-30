import { Message } from "./message";
import { User } from "./user";

export class Chat {
	id: string;
	participants: User[];
	messages: Message[];
}