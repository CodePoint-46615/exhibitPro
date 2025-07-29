import{IsEmail,IsNotEmpty,MinLength, IsIn,IsNumberString, Matches}from 'class-validator';

export class HostDto{

    @IsEmail()
    @Matches(/@aiub\.edu$/)
    email:string;
    
     @IsNotEmpty()
     @MinLength(6, { message: 'Password must be at least 6 characters long' })
     @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    password:string;

    @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
     gender: string;
  
    @IsNumberString({},{ message: 'Phone number must contain only number' })
    phoneNumber:string;


}