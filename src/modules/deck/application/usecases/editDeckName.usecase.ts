import { PrismaService } from "@/modules/database/infra/prisma.service";
import { Either, left, right } from "@/shared/domain/core/either";
import { Injectable } from "@nestjs/common";

interface EditDeckNameRequest {
  userId: string
  deckId: string
  newName: string
}

type EditDeckNameResponse = Either<
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
        oldName: string;
        newName: string;
        user: string;
      };
    };
  }
>

@Injectable()
export default class EditDeckNameUseCase {
  constructor (private prisma: PrismaService) {}

  async resolve({ userId, deckId, newName }: EditDeckNameRequest): Promise<EditDeckNameResponse> {
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
    
    const renamedDeck = await this.prisma.deck.update({
      where: {
        id: deck.id
      },
      data: {
        name: newName,
        updatedAt: new Date()
      }
    })

    if (!renamedDeck)
      return left(
        { success: false, error: { message: 'Erro ao renomear deck.' } },
        500,
      );

    return right({
      success: true,
      message: "Deck renomeado com sucesso.",
      data: {
        deck: {
          id: renamedDeck.id,
          oldName: deck.name,
          newName: renamedDeck.name,
          user: userId
        }
      }
    })
  }
}