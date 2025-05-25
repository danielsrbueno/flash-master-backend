import { Module } from '@nestjs/common';
import { FlashCardController } from '@flashcard/presentation/flashcard.controller';
import { PrismaService } from '@database/infra/prisma.service';
import { CreateFlashCardUseCase } from '@flashcard/application/usecases/createFlashCard.usecase';
import { FetchRandomFlashCardUseCase } from '@flashcard/application/usecases/fetchRandomFlashCard.usecase';
import DeleteFlashCardUseCase from './application/usecases/deleteFlashCard.usecase';
import FetchManyFlashCardUseCase from './application/usecases/fetchManyFlashCards.usecase';

@Module({
  controllers: [FlashCardController],
  providers: [
    PrismaService,
    CreateFlashCardUseCase,
    FetchRandomFlashCardUseCase,
    DeleteFlashCardUseCase,
    FetchManyFlashCardUseCase
  ],
})
export class FlashCardModule {}
