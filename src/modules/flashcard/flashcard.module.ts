import { Module } from '@nestjs/common';
import { FlashCardController } from '@flashcard/presentation/flashcard.controller';
import { PrismaService } from '@database/infra/prisma.service';
import { CreateFlashCardUseCase } from '@flashcard/application/usecases/createFlashCard.usecase';
import { FetchRandomFlashCardUseCase } from '@flashcard/application/usecases/fetchRandomFlashCard.usecase';

@Module({
  controllers: [FlashCardController],
  providers: [
    PrismaService,
    CreateFlashCardUseCase,
    FetchRandomFlashCardUseCase,
  ],
})
export class FlashCardModule {}
