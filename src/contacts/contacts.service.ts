import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity.js';
import { Repository } from 'typeorm';
import { CreateContactDto } from '../dtos/create-contact.cto.js';
import { UpdateContactDto } from '../dtos/update-contact.dto.js';

@Injectable()
export class ContactsService {
  constructor(@InjectRepository(Contact) private repo: Repository<Contact>) {}

  createContact(body: CreateContactDto) {
    const contact = this.repo.create(body);
    return this.repo.save(contact);
  }

  async findById(id: number) {
    const contact = await this.repo.findOneBy({ id });
    if (!contact)
      throw new BadRequestException({
        message: "the contact with the given id doesn't exist",
      });
    return contact;
  }

  async findContact(id: number) {
    return this.findById(id);
  }

  async deleteContact(id: number) {
    const contact = await this.findById(id);
    await this.repo.remove(contact);

    return { message: 'Contact deleted successfully' };
  }

  async updateContact(id: number, body: UpdateContactDto) {
    const contact = await this.findById(id);

    this.repo.merge(contact, body);

    return await this.repo.save(contact);
  }
}
