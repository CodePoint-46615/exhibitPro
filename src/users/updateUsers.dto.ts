import { IsEmail, IsEnum, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { UserRole } from './users.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsNotEmpty()
  phone?: number;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
