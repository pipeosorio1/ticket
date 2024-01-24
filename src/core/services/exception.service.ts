import {
  ConflictException,
  ConsoleLogger,
  HttpException,
  Injectable,
} from '@nestjs/common';
// import { AxiosError } from 'axios';

@Injectable()
export class ExceptionService {
  constructor(private readonly logger: ConsoleLogger) {}

  handleException(error: any): HttpException {
    this.logger.error(error);

    const message = error.errmsg || error.message;

    if (!error.status) {
      throw new ConflictException(
        "Doesn't find any content that conforms to the criteria given by the user agent",
      );
    }

    throw new HttpException(message, error.status);
  }
}
