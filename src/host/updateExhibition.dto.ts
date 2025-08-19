import { PartialType } from '@nestjs/mapped-types';
import { CreateExhibitionDto } from './createExhibition.dto';

export class UpdateExhibitionDto extends PartialType(CreateExhibitionDto) {}


