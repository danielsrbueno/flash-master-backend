import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CreateFlashCardDTO } from '@flashcard/application/dtos/createFlashCard.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateFlashCardUseCase } from '@flashcard/application/usecases/createFlashCard.usecase';
import { CurrentUser } from '@/shared/decorators/currentUser.decorator';
import { TokenDTO } from '@/modules/auth/application/dtos/token.dto';
import { FetchRandomFlashCardUseCase } from '@flashcard/application/usecases/fetchRandomFlashCard.usecase';
import DeleteFlashCardUseCase from '../application/usecases/deleteFlashCard.usecase';
import FetchManyFlashCardUseCase from '../application/usecases/fetchManyFlashCards.usecase';

@UseGuards(AuthGuard('jwt'))
@Controller('/flashcard')
export class FlashCardController {
  constructor(
    private createFlashCardUseCase: CreateFlashCardUseCase,
    private fetchRandomFlashCardUseCase: FetchRandomFlashCardUseCase,
    private deleteFlashCardUseCase: DeleteFlashCardUseCase,
    private fetchManyFlashCardUseCase: FetchManyFlashCardUseCase
  ) {}

  @Post('create')
  async handleCreate(@Body() body: CreateFlashCardDTO) {
    return await this.createFlashCardUseCase.resolve(body);
  }

  @Get('fetch-random')
  async handleFetchRandom(
    @Query('deckId') deckId: string,
    @CurrentUser() user: TokenDTO,
  ) {
    const { sub: userId } = user;
    return await this.fetchRandomFlashCardUseCase.resolve({ deckId, userId });
  }

  @Get('fetch-many')
  async handleFetchMany(
    @Query('deckId') deckId: string,
    @CurrentUser() user: TokenDTO,
  ) {
    const { sub: userId } = user;
    return await this.fetchManyFlashCardUseCase.resolve({ deckId, userId });
  }
  
  @Delete('delete/:flashCardId')
  async handleDelete(
    @Param("flashCardId") flashCardId: string,
    @CurrentUser() user: TokenDTO,
  ) {
    const { sub: userId } = user
    return await this.deleteFlashCardUseCase.resolve({ flashCardId, userId })
  }
}
