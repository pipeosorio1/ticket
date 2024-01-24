import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './entities/ticket.entity';

export const TicketForFeature = MongooseModule.forFeature([
  {
    name: Ticket.name,
    schema: TicketSchema,
    collection: 'ticket',
  },
]);
