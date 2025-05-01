import { Module } from '@nestjs/common';
import { PrismaModule } from '@database/prisma.module';
import { PrismaService } from '@database/infra/prisma.service';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DeckModule } from '@deck/deck.module';
import { FlashCardModule } from '@flashcard/flashcard.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    DeckModule,
    FlashCardModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
