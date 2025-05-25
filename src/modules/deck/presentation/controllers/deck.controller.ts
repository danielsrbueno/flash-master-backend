import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDeckDTO } from '@deck/application/dtos/createDeck.dto';
import { CurrentUser } from '@/shared/decorators/currentUser.decorator';
import { TokenDTO } from '@/modules/auth/application/dtos/token.dto';
import { CreateDeckUseCase } from '@deck/application/usecases/createDeck.usecase';
import { FetchManyDecksUseCase } from '@deck/application/usecases/fetchManyDecks.usecase';
import { DeleteDeckUseCase } from '@deck/application/usecases/deleteDeck.usecase';
import { EditDeckNameDTO } from '@deck/application/dtos/editDeckName.dto';
import EditDeckNameUseCase from '@deck/application/usecases/editDeckName.usecase';

@Controller('/deck')
@UseGuards(AuthGuard('jwt'))
export class DeckController {
  constructor(
    private createDeckUseCase: CreateDeckUseCase,
    private fetchManyDecksUseCase: FetchManyDecksUseCase,
    private deleteDeckUseCase: DeleteDeckUseCase,
    private editDeckUseCase: EditDeckNameUseCase
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

  @Patch('/edit-name/:deckId')
  async handleEditName (
    @CurrentUser() user: TokenDTO,
    @Param('deckId') deckId: string,
    @Body() body: EditDeckNameDTO
  ) {
    const { sub: userId } = user;
    const { newName } = body

    return await this.editDeckUseCase.resolve({ userId, newName, deckId })
  }

  @Delete('/delete/:deckId')
  async handleDelete(
    @CurrentUser() user: TokenDTO,
    @Param('deckId') deckId: string,
  ) {
    const { sub: userId } = user;
    return await this.deleteDeckUseCase.resolve({ userId, deckId });
  }
}
