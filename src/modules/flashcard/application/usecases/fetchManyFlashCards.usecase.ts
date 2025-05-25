import { PrismaService } from "@/modules/database/infra/prisma.service";
import { Either, left, right } from "@/shared/domain/core/either";
import { Injectable } from "@nestjs/common";

interface FetchManyFlashCardRequest {
  deckId: string;
  userId: string;
}

type FetchManyFlashCardResponse = Either<
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
      flashcards: {
        id: string;
        question: string;
        answer: string;
      }[]
    };
  }
>;

@Injectable()
export default class FetchManyFlashCardUseCase {
  constructor(private prisma: PrismaService) {}

  async resolve({ deckId, userId }: FetchManyFlashCardRequest): Promise<FetchManyFlashCardResponse> {
    const deck = await this.prisma.deck.findUnique({
      where: {
        id: deckId,
        userId
      }
    })

    if (!deck)
      return left(
        { success: false, error: { message: 'Deck não encontrado.' } },
        404,
      );
    
    const flashCards = await this.prisma.flashcard.findMany({
      where: {
        deckId: deck.id
      },
      orderBy: { 
        createdAt: "asc" 
      }
    })

    if (!flashCards)
      return left(
        { success: false, error: { message: 'Erro ao buscar os flashcards.' } },
        500,
      );

    if (flashCards.length < 1)
      return left(
        { success: false, error: { message: 'Nenhum flashcard encontrado.' } },
        404,
      );

    return right({
      success: true,
      data: {
        flashcards: flashCards.map((flashcard) => ({
          id: flashcard.id,
          question: flashcard.question,
          answer: flashcard.answer
        }))
      }
    }, 200);
  }
}