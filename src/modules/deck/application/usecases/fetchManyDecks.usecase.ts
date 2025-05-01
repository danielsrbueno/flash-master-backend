import { PrismaService } from '@/modules/database/infra/prisma.service';
import { Either, left, right } from '@/shared/domain/core/either';
import { Injectable } from '@nestjs/common';

interface FetchManyDecksRequest {
  userId: string;
}

type FetchManyDecksResponse = Either<
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
      decks: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date | null;
      }[];
    };
  }
>;

@Injectable()
export class fetchManyDecksUseCase {
  constructor(private prisma: PrismaService) {}

  async resolve({
    userId,
  }: FetchManyDecksRequest): Promise<FetchManyDecksResponse> {
    const decks = await this.prisma.deck.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    if (!decks)
      return left(
        { success: false, error: { message: 'Erro ao buscar os decks' } },
        500,
      );
    if (decks.length < 1)
      return left(
        { success: false, error: { message: 'Nenhum deck encontrado' } },
        404,
      );

    return right(
      {
        success: true,
        data: {
          decks: decks.map((deck) => ({
            id: deck.id,
            name: deck.name,
            createdAt: deck.createdAt,
            updatedAt: deck.updatedAt,
          })),
        },
      },
      200,
    );
  }
}
