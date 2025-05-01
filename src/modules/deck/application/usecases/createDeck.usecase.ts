import { PrismaService } from '@/modules/database/infra/prisma.service';
import { Either, left, right } from '@/shared/domain/core/either';
import { Injectable } from '@nestjs/common';

interface CreateDeckRequest {
  deckName: string;
  userId: string;
}

type CreateDeckResponse = Either<
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
>;

@Injectable()
export class CreateDeckUseCase {
  constructor(private prisma: PrismaService) {}

  async resolve(body: CreateDeckRequest): Promise<CreateDeckResponse> {
    const { deckName, userId } = body;

    const deck = await this.prisma.deck.create({
      data: {
        name: deckName,
        userId,
      },
    });

    if (!deck)
      return left(
        { success: false, error: { message: 'Erro ao criar o deck' } },
        500,
      );

    return right(
      {
        success: true,
        statusCode: 201,
        message: 'Deck criado com sucesso!',
        data: {
          deck: {
            id: deck.id,
            name: deck.name,
            user: deck.userId,
          },
        },
      },
      201,
    );
  }
}
