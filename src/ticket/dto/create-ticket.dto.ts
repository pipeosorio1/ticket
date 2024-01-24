import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    description: 'user',
    required: true,
    type: String,
    example: 'Andres',
  })
  @IsString()
  @IsNotEmpty()
  readonly user: string;

  @ApiProperty({
    description: 'description ticket',
    required: true,
    type: String,
    example: 'User creation....',
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
