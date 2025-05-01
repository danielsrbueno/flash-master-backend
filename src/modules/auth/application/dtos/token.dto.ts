import { IsString, IsUUID } from 'class-validator';

export class TokenDTO {
  @IsString()
  @IsUUID()
  sub: string;
}
