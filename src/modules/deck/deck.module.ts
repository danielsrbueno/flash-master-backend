import { Module } from '@nestjs/common';
import { DeckController } from '@deck/presentation/controllers/deck.controller';
import { PrismaService } from '@database/infra/prisma.service';
import { CreateDeckUseCase } from '@deck/application/usecases/createDeck.usecase';
import { fetchManyDecksUseCase } from '@deck/application/usecases/fetchManyDecks.usecase';

@Module({
  controllers: [DeckController],
  providers: [PrismaService, CreateDeckUseCase, fetchManyDecksUseCase],
})
export class DeckModule {}
