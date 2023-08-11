import { Base } from "../base/base";
import { Message } from "./message";
import { User } from "./user";

export class Chat extends Base{
	Participants: User[];
	Messages: Message[];
	LastUpdate: Date;
}