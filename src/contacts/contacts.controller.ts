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
import { CreateContactDto } from './dto/create-contact.dto.js';
import { UpdateContactDto } from './dto/update-contact.dto.js';
import { GetAllContactsDto } from './dto/get-all-contacts.dto.js';

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
