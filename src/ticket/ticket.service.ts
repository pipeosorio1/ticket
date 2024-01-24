import {
  ConflictException,
  ConsoleLogger,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Ticket } from './entities/ticket.entity';
import { InjectModel } from '@nestjs/mongoose';
import { TicketRepository } from './repositories/ticket.repository';
import { PaginationDto } from 'core/dto/pagination.dto';
import { ExceptionService } from 'core/services/exception.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticket: Model<Ticket>,
    private readonly repository: TicketRepository,
    private readonly logger: ConsoleLogger,
    private readonly exceptionService: ExceptionService,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket[]> {
    try {
      return await this.ticket.create([createTicketDto]);
    } catch (error) {
      this.exceptionService.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Ticket[]> {
    try {
      const { limit, page = 1, sort } = paginationDto;
      const offset = page * limit - limit;
      return await this.repository.findAllPaginated(limit, offset, sort);
    } catch (error) {
      this.exceptionService.handleException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      this.exceptionService.handleException(error);
    }
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    try {
      if (!isValidObjectId(id)) {
        throw new ConflictException(`${id} is not a valid MongoID`);
      }

      const updatedProfile = await this.ticket
        .findOneAndUpdate({ _id: id }, updateTicketDto, {
          new: true,
        })
        .catch((error) => {
          throw new ConflictException(
            `Error updating Profile with id ${id}. ${error.errmsg}`,
          );
        });

      if (!updatedProfile) {
        throw new NotFoundException(`Profile with id ${id} not found`);
      }

      return updatedProfile;
    } catch (error) {
      this.exceptionService.handleException(error);
    }
  }

  async remove(id: string) {
    try {
      const ticket = await this.ticket.findByIdAndDelete(id);
      if (ticket) {
        return { message: 'ticket deleted' };
      } else {
        throw new NotFoundException(`Profile with id ${id} not found`);
      }
    } catch (error) {
      this.exceptionService.handleException(error);
    }
  }
}
