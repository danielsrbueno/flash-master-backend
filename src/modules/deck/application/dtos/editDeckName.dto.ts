import { IsNotEmpty, IsString } from 'class-validator';

export class EditDeckNameDTO {
  @IsString({ message: 'Nome do deck é obrigatório.' })
  @IsNotEmpty({ message: 'Nome do deck é obrigatório.' })
  newName: string;
}
