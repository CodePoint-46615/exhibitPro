import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CustomerDTO{
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9 ]*$/,{
        message: 'Exihibition name must not contain any special character',
    })
    exhibitionName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Matches(/(?=.*[a-z])/,{
        message: 'Event Password must contain at least one lowercase letter',
    })
    eventPassword: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^01\d{9}$/, {
        message: 'Invalid Phone Number. Try Again.',
    })
    customerPhoneNumber:string; 
}