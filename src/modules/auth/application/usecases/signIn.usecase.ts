import { PrismaService } from '@/modules/database/infra/prisma.service';
import { Either, left, right } from '@/shared/domain/core/either';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

interface SignInUseCaseRequest {
  email: string;
  password: string;
}

type SignInUseCaseResponse = Either<
  {
    success: false;
    error: {
      message: string;
    };
  },
  {
    success: true;
    message?: string;
    data: {
      access_token: string;
    };
  }
>;

@Injectable()
export class SignInUseCase {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async resolve(body: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return left(
        { success: false, error: { message: 'Email ou senha incorretos.' } },
        401,
      );

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      return left(
        { success: false, error: { message: 'Email ou senha incorretos.' } },
        401,
      );

    const accessToken = await this.jwt.sign({ sub: user.id });

    return right(
      {
        success: true,
        message: 'Usuário autenticado com sucesso!',
        data: {
          access_token: accessToken,
        },
      },
      200,
    );
  }
}
