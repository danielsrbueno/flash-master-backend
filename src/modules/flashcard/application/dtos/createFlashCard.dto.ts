import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFlashCardDTO {
  @IsString({ message: 'A pergunta é obrigatória.' })
  @IsNotEmpty({ message: 'A pergunta é obrigatória.' })
  question: string;

  @IsString({ message: 'A resposta é obrigatória.' })
  @IsNotEmpty({ message: 'A resposta é obrigatória.' })
  answer: string;

  @IsNotEmpty()
  deckId: string;
}
