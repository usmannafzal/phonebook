import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity.js';
import { Repository } from 'typeorm';
import { CreateContactDto } from '../dtos/create-contact.cto.js';
import { UpdateContactDto } from '../dtos/update-contact.dto.js';
import { GetAllContactsDto } from '../dtos/get-all-contacts.dto.js';

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

  async getAll(query: GetAllContactsDto) {
    const limit = 10;
    const { page } = query;

    if (!page) return this.repo.find();

    const pageNumber = Math.max(1, Number(page));
    const pageSize = Math.min(100, Math.max(1, Number(limit) || 10));

    const [contacts, total] = await this.repo.findAndCount({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });

    return {
      data: contacts,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
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
