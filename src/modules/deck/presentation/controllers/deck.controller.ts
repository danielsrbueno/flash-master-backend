import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDeckDTO } from '@deck/application/dtos/createDeck.dto';
import { CurrentUser } from '@/shared/decorators/currentUser.decorator';
import { TokenDTO } from '@/modules/auth/application/dtos/token.dto';
import { CreateDeckUseCase } from '@deck/application/usecases/createDeck.usecase';
import { fetchManyDecksUseCase } from '../../application/usecases/fetchManyDecks.usecase';

@Controller('/deck')
@UseGuards(AuthGuard('jwt'))
export class DeckController {
  constructor(
    private createDeckUseCase: CreateDeckUseCase,
    private fetchManyDecksUseCase: fetchManyDecksUseCase,
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
    const { sub: userID } = user;
    return await this.fetchManyDecksUseCase.resolve({ userId: userID });
  }
}
