import { IsString } from 'class-validator';

export class GetAllContactsDto {
  @IsString()
  page: string;
}
