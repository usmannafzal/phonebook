import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service.js';
import { CreateContactDto } from '../dtos/create-contact.cto.js';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Post('')
  createContact(@Body() body: CreateContactDto) {
    this.contactsService.createContact(body);
  }
}
