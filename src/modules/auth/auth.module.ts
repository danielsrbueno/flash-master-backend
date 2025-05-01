import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ENVIRONMENT } from '@/config/environment';
import { AuthController } from '@auth/presentation/controllers/auth.controller';
import { PrismaService } from '@database/infra/prisma.service';
import { SignInUseCase } from './application/usecases/signIn.usecase';
import { JwtStrategy } from './infra/strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, SignInUseCase, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: ENVIRONMENT.JWT.SECRET_KEY,
        signOptions: {
          expiresIn: ENVIRONMENT.JWT.EXPIRES_IN,
        },
      }),
    }),
  ],
})
export class AuthModule {}
