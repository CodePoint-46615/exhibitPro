import { Matches } from "class-validator"

export class AdminDto {
    @Matches(/^[a-zA-Z\s]+$/, {message: 'Name must contain only letters and spaces'})
    name:string;
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.xyz$/, {message: 'Email must be a valid .xyz address'})
    email:string;
    phone:string;
    address:string;
    @Matches(/^[0-9]{13}$/, {message: 'NID number must be a 13-digit number'})
    nidNumber:string;
    password:string;

}