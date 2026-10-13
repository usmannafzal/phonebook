import { Module } from '@nestjs/common';
import { PhonebookService } from './phonebook.service.js';
import { PhonebookController } from './phonebook.controller.js';

@Module({
  providers: [PhonebookService],
  controllers: [PhonebookController]
})
export class PhonebookModule {}
