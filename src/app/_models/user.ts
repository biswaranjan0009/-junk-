export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token?: string;
}

export class UserRegistrationDetails {
    profileFor: string;
    fullName: string;
    gender: string;
    dob: Date;
    email: string;
    country: number;
    mobile: string;
    religion: number;
    nativeLang: number;
    password: string;
}