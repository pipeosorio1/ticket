import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiProperty({
    description: 'status ticket',
    required: false,
    type: String,
    example: 0,
  })
  @IsBoolean()
  @IsOptional()
  readonly status: boolean;
}
