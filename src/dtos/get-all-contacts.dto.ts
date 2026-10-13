import { IsOptional, IsString } from 'class-validator';

export class GetAllContactsDto {
  @IsString()
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
