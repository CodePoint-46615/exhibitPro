import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MaxLength, Min, IsDateString } from 'class-validator';
import { ExhibitionStatus } from './exhibition.entity';


export class CreateExhibitionDto {
  @IsUUID()
  @IsNotEmpty()
  host_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @IsDateString()
  @IsNotEmpty()
  end_date: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  ticket_price: number;

  @IsNumber()
  @Min(1)
  capacity: number;

  @IsEnum(ExhibitionStatus)
  status?: ExhibitionStatus; // Optional, default will be PENDING
}