import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  normalizePhone,
  PHONE_MESSAGE,
  PHONE_REGEX,
} from '../contacts/phone.js';

export class CreateContactDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is mandatory' })
  @MinLength(3, { message: 'First name must be at least 3 characters' })
  @MaxLength(50, { message: 'First name cannot exceed 50 characters' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is mandatory' })
  @MinLength(3, { message: 'Last name must be at least 3 characters' })
  @MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
  lastName: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? normalizePhone(value) : value,
  )
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is mandatory' })
  @Matches(PHONE_REGEX, { message: PHONE_MESSAGE })
  phoneNumber: string;
}
