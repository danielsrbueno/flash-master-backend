import { Module } from '@nestjs/common';
import { DeckController } from '@deck/presentation/controllers/deck.controller';
import { PrismaService } from '@database/infra/prisma.service';
import { CreateDeckUseCase } from '@deck/application/usecases/createDeck.usecase';
import { FetchManyDecksUseCase } from '@deck/application/usecases/fetchManyDecks.usecase';
import { DeleteDeckUseCase } from '@deck/application/usecases/deleteDeck.usecase';

@Module({
  controllers: [DeckController],
  providers: [PrismaService, CreateDeckUseCase, FetchManyDecksUseCase, DeleteDeckUseCase],
})
export class DeckModule {}
