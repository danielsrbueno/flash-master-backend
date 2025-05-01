import { PrismaService } from '@/modules/database/infra/prisma.service';
import { Either, left, right } from '@/shared/domain/core/either';
import { Injectable } from '@nestjs/common';

interface CreateFlashCardResquest {
  question: string;
  answer: string;
  deckId: string;
}

type CreateFlashCardResponse = Either<
  {
    success: false;
    error: {
      message: string;
    };
  },
  {
    success: true;
    message?: string;
    data: {
      flashcard: {
        id: string;
        question: string;
        answer: string;
        deck: string;
      };
    };
  }
>;

@Injectable()
export class CreateFlashCardUseCase {
  constructor(private prisma: PrismaService) {}

  async resolve(
    body: CreateFlashCardResquest,
  ): Promise<CreateFlashCardResponse> {
    const { question, answer, deckId } = body;

    const deck = await this.prisma.deck.findUnique({
      where: {
        id: deckId,
      },
    });

    if (!deck)
      return left(
        { success: false, error: { message: 'Deck não encontrado' } },
        404,
      );

    const flashcard = await this.prisma.flashcard.create({
      data: {
        question,
        answer,
        deckId,
      },
    });

    if (!flashcard)
      return left(
        { success: false, error: { message: 'Erro ao criar o flashcard' } },
        500,
      );

    return right(
      {
        success: true,
        message: 'Flashcard criado com sucesso!',
        data: {
          flashcard: {
            id: flashcard.id,
            question: flashcard.question,
            answer: flashcard.answer,
            deck: flashcard.deckId,
          },
        },
      },
      201,
    );
  }
}
