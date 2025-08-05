import{ IsInt, IsString, MaxLength, Min }from 'class-validator';

export class CreateUserDto{

    @IsString()
    @MaxLength(100)
    fullName :string;

    @IsInt()
    @Min(0)
    age :number;


}