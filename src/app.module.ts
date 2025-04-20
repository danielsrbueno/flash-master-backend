import { Module } from '@nestjs/common';
import { PrismaModule } from '@database/prisma.module';
import { PrismaService } from '@database/infra/prisma.service';
import { UserModule } from '@user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [PrismaService],
})
export class AppModule {}
