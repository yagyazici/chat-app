import { FormControl } from "@angular/forms";

export interface AuthForm {
	username: FormControl<string | null>
	password: FormControl<string | null>
}
