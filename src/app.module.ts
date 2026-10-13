import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PhonebookModule } from './phonebook/phonebook.module.js';

@Module({
  imports: [PhonebookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
