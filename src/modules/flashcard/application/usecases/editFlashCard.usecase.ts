import { PrismaService } from "@/modules/database/infra/prisma.service";
import { Either, left, right } from "@/shared/domain/core/either";
import { Injectable } from "@nestjs/common";

interface EditFlashCardRequest {
  userId: string
  flashcard: {
    id: string
    question: string
    answer: string
  }
}

type EditFlashCardResponse = Either<
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
      user: string;
      flashcardId: string;
      newFlashcard: {
        question: string;
        answer: string;
      };
      oldFlashcard: {
        question: string;
        answer: string;
      }
    };
  }
>

@Injectable()
export default class EditFlashCardUseCase {
  constructor (private prisma: PrismaService) {}

  async resolve({ userId, flashcard }: EditFlashCardRequest): Promise<EditFlashCardResponse> {
    let message: string = "";

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        decks: { some: { flashcards: { some: { id: flashcard.id } } } }
      }
    })

    if (!user)
      return left({ success: false, error: { message: "Usuário não encontrado." } }, 404)

    const flashCard = await this.prisma.flashcard.findUnique({
      where: {
        id: flashcard.id
      }
    })

    if (!flashCard)
      return left({ success: false, error: { message: "Flashcard não encontrado." } }, 404)

    const newFlashCard = await this.prisma.flashcard.update({
      where: {
        id: flashCard.id
      },
      data: {
        question: flashcard.question,
        answer: flashcard.answer,
        updatedAt: new Date()
      }
    })

    if (!newFlashCard)
      return left({ success: false, error: { message: "Erro ao modificar flashcard." } }, 500)

    if(newFlashCard.question === flashCard.question && newFlashCard.answer === flashCard.answer)
      message = " Porém é idêntico ao antigo."

    return right({
      success: true,
      message: "Flashcard foi modificado." + message,
      data: {
        user: user.id,
        flashcardId: newFlashCard.id,
        newFlashcard: {
          question: newFlashCard.question,
          answer: newFlashCard.answer,
        },
        oldFlashcard: {
          question: flashCard.question,
          answer: flashCard.answer,
        }
      }
    }, 200)
  }
}