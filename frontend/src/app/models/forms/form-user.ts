import { AbstractControl, FormControl } from "@angular/forms";

export class FormUser {
	Id: AbstractControl<string | null>;
	Username: AbstractControl<string | null>;
}