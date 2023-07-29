import { Message } from "./message";
import { User } from "./user";

export class Chat {
	participants: User[];
	messages: Message[];
}