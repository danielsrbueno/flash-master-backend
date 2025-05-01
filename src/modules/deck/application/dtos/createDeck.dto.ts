import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeckDTO {
  @IsString({ message: 'Nome do deck é obrigatório.' })
  @IsNotEmpty({ message: 'Nome do deck é obrigatório.' })
  name: string;
}
