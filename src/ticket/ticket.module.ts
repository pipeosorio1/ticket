import { ConsoleLogger, Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketRepository } from './repositories/ticket.repository';
import { TicketForFeature } from './ticket.forfeature';
import { ExceptionService } from 'core/services/exception.service';

@Module({
  imports: [TicketForFeature],
  controllers: [TicketController],
  providers: [ExceptionService, ConsoleLogger, TicketRepository, TicketService],
})
export class TicketModule {}
