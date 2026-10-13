import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.cto.js';

export class UpdateContactDto extends PartialType(CreateContactDto) {}
