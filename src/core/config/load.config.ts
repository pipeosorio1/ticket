import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const validationSchema = Joi.object({
  APP_PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().required(),
  MONGO_HOST: Joi.string().required(),
  MONGO_USERNAME: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
  MONGO_PORT: Joi.number().default(27017),
  MONGO_DATABASE: Joi.string().required(),
});

export const LoadConfig = ConfigModule.forRoot({
  validationSchema: validationSchema,
  expandVariables: true,
});
