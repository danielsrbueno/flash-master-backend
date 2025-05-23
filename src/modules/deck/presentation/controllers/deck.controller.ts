import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDeckDTO } from '@deck/application/dtos/createDeck.dto';
import { CurrentUser } from '@/shared/decorators/currentUser.decorator';
import { TokenDTO } from '@/modules/auth/application/dtos/token.dto';
import { CreateDeckUseCase } from '@deck/application/usecases/createDeck.usecase';
import { FetchManyDecksUseCase } from '@deck/application/usecases/fetchManyDecks.usecase';
import { DeleteDeckUseCase } from '@deck/application/usecases/deleteDeck.usecase';

@Controller('/deck')
@UseGuards(AuthGuard('jwt'))
export class DeckController {
  constructor(
    private createDeckUseCase: CreateDeckUseCase,
    private fetchManyDecksUseCase: FetchManyDecksUseCase,
    private deleteDeckUseCase: DeleteDeckUseCase
  ) {}

  @Post('/create')
  async handleCreate(
    @Body() body: CreateDeckDTO,
    @CurrentUser() user: TokenDTO,
  ) {
    const { name: deckName } = body;
    const { sub: userId } = user;

    return await this.createDeckUseCase.resolve({ deckName, userId });
  }

  @Get('/fetch-many')
  async handleFetchMany(@CurrentUser() user: TokenDTO) {
    const { sub: userId } = user;
    return await this.fetchManyDecksUseCase.resolve({ userId: userId });
  }

  @Delete('/delete/:deckId')
  async handleDeleteDeck(
    @CurrentUser() user: TokenDTO,
    @Param('deckId') deckId: string,
  ) {
    const { sub: userId } = user;
    console.log(deckId)
    return await this.deleteDeckUseCase.resolve({ userId, deckId });
  }
}
