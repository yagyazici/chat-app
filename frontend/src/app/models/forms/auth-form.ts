import { FormControl } from "@angular/forms";

export interface AuthForm {
	Username: FormControl<string | null>
	Password: FormControl<string | null>
}
