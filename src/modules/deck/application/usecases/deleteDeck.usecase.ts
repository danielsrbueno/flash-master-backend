import { PrismaService } from "@/modules/database/infra/prisma.service";
import { Either, left, right } from "@/shared/domain/core/either";
import { Injectable } from "@nestjs/common";

interface DeckDeleteRequest {
  userId: string
  deckId: string
}

type DeckDeleteResponse = Either<
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
      deck: {
        id: string;
        name: string;
        user: string;
      };
    };
  }
>

@Injectable()
export class DeleteDeckUseCase {
  constructor (private prisma: PrismaService) {}

  async resolve ({ userId, deckId }: DeckDeleteRequest): Promise<DeckDeleteResponse> {
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
      )
    
    const responseDeleteFlashCard = await this.prisma.flashcard.deleteMany({
      where: {
        deckId
      }
    })

    const responseDeleteDeck = await this.prisma.deck.delete({
      where: {
        id: deckId,
        userId
      }
    })

    if (!responseDeleteDeck || !responseDeleteFlashCard) 
      return left(
        { success: false, error: { message: 'Erro ao deletar deck.' } },
        500,
      )
    
    return right({
      success: true,
      data: {
        deck: {
          id: responseDeleteDeck.id,
          name: responseDeleteDeck.name,
          user: responseDeleteDeck.userId
        }
      }
    })
  }
}