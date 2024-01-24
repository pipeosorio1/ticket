import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from 'ticket/entities/ticket.entity';

@Injectable()
export class TicketRepository {
  constructor(
    @InjectModel(Ticket.name) private readonly ticket: Model<Ticket>,
  ) {}

  async findById(id: string): Promise<any> {
    return await this.ticket.findById(id).exec();
  }

  async findAllPaginated(
    limit: number = null,
    offset: number = null,
    sort: any[] = null,
  ): Promise<Ticket[]> {
    const tickets = this.ticket.find();

    if (limit) tickets.limit(limit);
    if (offset) tickets.skip(offset);
    if (sort) tickets.sort(sort);

    return await tickets.exec();
  }
}
