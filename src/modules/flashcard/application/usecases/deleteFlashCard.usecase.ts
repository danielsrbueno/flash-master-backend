import { PrismaService } from "@/modules/database/infra/prisma.service";
import { Either, left, right } from "@/shared/domain/core/either";
import { Injectable } from "@nestjs/common";

interface DeleteFlashCardRequest {
  userId: string
  flashCardId: string
}

type DeleteFlashCardResponse = Either<
  {
    success: false,
    error: {
      message: string
    }
  },
  {
    success: true,
    message?: string
    data: {
      flashcard: string
    }
  }
>

@Injectable()
export default class DeleteFlashCardUseCase {
  constructor (private prisma: PrismaService) {}

  async resolve({ userId, flashCardId }: DeleteFlashCardRequest): Promise<DeleteFlashCardResponse> {
    const flashCard = await this.prisma.flashcard.findUnique({
      where: {
        id: flashCardId,
      }
    })

    if (!flashCard)
      return left({ success: false, error: { message: "Flashcard não encontrado." } }, 404)

    const user = await this.prisma.user.findUnique({
      where: { 
        id: userId,
        decks: { some: { flashcards: { some: { id: flashCard.id } } } }
      }
    })

    if (!user)
      return left({ success: false, error: { message: "Usuário não encontrado." } }, 404)

    const deletedFlashCard = await this.prisma.flashcard.delete({
      where: { id: flashCard.id }
    })

    if (!deletedFlashCard)
      return left({ success: false, error: { message: "Erro ao deletar flashcard." } }, 500)

    return right({
      success: true,
      message: "Flashcard deletado.",
      data: {
        flashcard: deletedFlashCard.id
      }
    })
  }
}