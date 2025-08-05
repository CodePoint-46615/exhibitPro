import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length, Matches, MinLength } from "class-validator";

export class CustomerDTO {

    /**
     * **************************
     * DTO for lab task 2
     * **************************
     */
    // @IsString()
    // @IsNotEmpty()
    // @Matches(/^[a-zA-Z0-9 ]*$/, {
    //     message: 'Exihibition name must not contain any special character',
    // })
    // exhibitionName: string;

    // @IsString()
    // @IsNotEmpty()
    // @MinLength(6)
    // @Matches(/(?=.*[a-z])/, {
    //     message: 'Event Password must contain at least one lowercase letter',
    // })
    // eventPassword: string;

    // @IsString()
    // @IsNotEmpty()
    // @Matches(/^01\d{9}$/, {
    //     message: 'Invalid Phone Number. Try Again.',
    // })
    // customerPhoneNumber: string;

    /**
     * *****************************
     * Lab Task - 3
     * *****************************
     */

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 150)
    fullName: string;

    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    isActive?: boolean = false;
}