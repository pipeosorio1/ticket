import { MongoDbConfig } from 'core/config/mongodb.config';
import { LoadConfig } from 'core/config/load.config';
import { Module } from '@nestjs/common';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [LoadConfig, MongoDbConfig, TicketModule],
})
export class AppModule {}
