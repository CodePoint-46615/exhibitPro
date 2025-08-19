import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  exhibitionID: string;

  @IsUUID()
  @IsNotEmpty()
  customerID: string;

  @IsInt()
  @IsPositive()
  ticketsBooked: number;
}


