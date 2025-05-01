import { Module } from '@nestjs/common';
import { PrismaService } from '@database/infra/prisma.service';
import { UserController } from '@user/presentation/controllers/user.controller';
import { CreateUserUseCase } from '@user/application/usecases/createUser.usecase';

@Module({
  controllers: [UserController],
  providers: [PrismaService, CreateUserUseCase],
})
export class UserModule {}
