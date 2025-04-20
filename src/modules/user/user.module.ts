import { Module } from "@nestjs/common";
import { UserController } from "@user/presentation/controllers/user.controller";
import { PrismaService } from "@database/infra/prisma.service";
import { CreateUserUseCase } from "@user/application/usecases/createUserUseCase";

@Module({
  controllers: [UserController],
  providers: [PrismaService, CreateUserUseCase]
})
export class UserModule {}