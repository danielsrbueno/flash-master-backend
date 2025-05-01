import { PrismaService } from '@/modules/database/infra/prisma.service';
import { Either, left, right } from '@/shared/domain/core/either';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type CreateUserUseCaseResponse = Either<
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
      user: {
        id: string;
        name: string;
        email: string;
      };
    };
  }
>;

@Injectable()
export class CreateUserUseCase {
  constructor(private prisma: PrismaService) {}

  async resolve(
    body: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail)
      return left(
        { success: false, error: { message: 'Email já cadastrado' } },
        409,
      );

    const hashedPassword = await hash(password, 8);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const user = await this.prisma.user.create({ data: userData });

    if (!user)
      return left(
        { success: false, error: { message: 'Erro ao criar o usuário' } },
        500,
      );

    return right(
      {
        success: true,
        message: 'Usuário criado com sucesso!',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
      },
      201,
    );
  }
}
