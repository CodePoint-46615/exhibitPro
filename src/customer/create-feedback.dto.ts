import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateFeedbackDto {
  @IsUUID()
  @IsNotEmpty()
  exhibition_id: string;

  @IsUUID()
  @IsNotEmpty()
  customer_id: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}


