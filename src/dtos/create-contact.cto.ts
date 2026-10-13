import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

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

  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is mandatory' })
  @Matches(
    /^(?:\+1[2-9]\d{2}[2-9]\d{6}|\+92[1-9]\d{8,9}|0\d{9,10}|[2-9]\d{9})$/,
    {
      message: 'Phone number must be a valid US or Pakistani phone number',
    },
  )
  phoneNumber: string;
}
