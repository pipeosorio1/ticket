import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

class SortItemDto {
  @IsNumber()
  direction: number;
}

class SortFieldDto {
  @IsArray()
  @ArrayMinSize(2)
  @Type(() => SortItemDto)
  field: [string, number]; // [campo, dirección de orden (1 o -1)]
}

export class PaginationDto {
  @ApiProperty({
    required: true,
    description: 'limit number',
    type: String,
    example: 50,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiProperty({
    required: true,
    description: 'page number',
    type: String,
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiProperty({
    required: false,
    description: 'sort order',
    type: String,
    example: [['_id', -1]],
  })
  @IsOptional()
  @IsArray()
  @Type(() => SortFieldDto)
  sort?: [SortFieldDto];
}
