import { Module } from "@nestjs/common"
import { PrismaService } from "@/modules/database/infra/prisma.service"

@Module(
  {
    providers: [PrismaService]
  }
)
export class PrismaModule {}