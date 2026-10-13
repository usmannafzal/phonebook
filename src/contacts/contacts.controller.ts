import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ContactsService } from './contacts.service.js';
import { CreateContactDto } from '../dtos/create-contact.cto.js';
import { UpdateContactDto } from '../dtos/update-contact.dto.js';
import { GetAllContactsDto } from '../dtos/get-all-contacts.dto.js';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('')
  createContact(@Body() body: CreateContactDto) {
    return this.contactsService.createContact(body);
  }

  @Get('')
  getAll(@Query() query: GetAllContactsDto) {
    return this.contactsService.getAll(query);
  }

  @Get('/:id')
  findContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactsService.findContact(id);
  }

  @Patch('/:id')
  updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateContactDto,
  ) {
    return this.contactsService.updateContact(id, body);
  }

  @Delete('/:id')
  deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactsService.deleteContact(id);
  }
}
