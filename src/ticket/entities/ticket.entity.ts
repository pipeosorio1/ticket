import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaConfig } from 'core/config/schema.config';
import { HydratedDocument } from 'mongoose';

@Schema(SchemaConfig)
export class Ticket {
  @Prop({
    required: true,
    index: true,
  })
  user: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
    default: true,
  })
  status: boolean;
}

export type TicketDocument = HydratedDocument<Ticket>;

export const TicketSchema = SchemaFactory.createForClass(Ticket);
