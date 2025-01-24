import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  firstName: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  lastName: string;
  @IsNotEmpty()
  @IsNumber()
  age: number;
  @IsUrl()
  photoUrl: string;
}
