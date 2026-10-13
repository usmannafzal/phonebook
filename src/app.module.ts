import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './database/database.config.js';
import { ContactsController } from './contacts/contacts.controller.js';
import { ContactsService } from './contacts/contacts.service.js';
import { Contact } from './contacts/entities/contact.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    TypeOrmModule.forFeature([Contact]),
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class AppModule {}
