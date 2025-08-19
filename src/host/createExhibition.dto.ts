import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MaxLength, Min, IsDateString } from 'class-validator';
import { ExhibitionStatus } from './exhibition.entity';


export class CreateExhibitionDto {
  @IsUUID()
  @IsNotEmpty()
  hostID: string;

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
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  ticketPrice: number;

  @IsNumber()
  @Min(1)
  capacity: number;

  @IsEnum(ExhibitionStatus)
  status?: ExhibitionStatus;
}