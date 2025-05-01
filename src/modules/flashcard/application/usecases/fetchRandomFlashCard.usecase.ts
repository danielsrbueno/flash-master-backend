import { PrismaService } from '@/modules/database/infra/prisma.service';
import { Either, left, right } from '@/shared/domain/core/either';
import { Injectable } from '@nestjs/common';

interface FetchRandomFlashCardRequest {
  deckId: string;
  userId: string;
}

type FetchRandomFlashCardResponse = Either<
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
      flashCard: {
        id: string;
        question: string;
        answer: string;
      };
    };
  }
>;

@Injectable()
export class FetchRandomFlashCardUseCase {
  constructor(private prisma: PrismaService) {}

  async resolve(
    body: FetchRandomFlashCardRequest,
  ): Promise<FetchRandomFlashCardResponse> {
    const { deckId, userId } = body;

    const deck = await this.prisma.deck.findUnique({
      where: {
        userId,
        id: deckId,
      },
    });

    if (!deck)
      return left(
        { success: false, error: { message: 'Deck não encontrado' } },
        404,
      );

    const flashCards = await this.prisma.flashcard.findMany({
      where: {
        deckId,
      },
    });

    if (!flashCards)
      return left(
        { success: false, error: { message: 'Erro ao buscar os flashcards' } },
        500,
      );

    if (flashCards.length < 1)
      return left(
        { success: false, error: { message: 'Nenhum flashcard encontrado' } },
        404,
      );

    const randomIndex = Math.floor(Math.random() * flashCards.length);

    const { id, question, answer } = flashCards[randomIndex];

    return right(
      {
        success: true,
        data: {
          flashCard: {
            id,
            question,
            answer,
          },
        },
      },
      200,
    );
  }
}
