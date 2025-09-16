import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  exhibition_id: string;

  @IsUUID()
  @IsNotEmpty()
  customer_id: string;

  @IsInt()
  @IsPositive()
  tickets_booked: number;
}


