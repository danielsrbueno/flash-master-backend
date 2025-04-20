import { PrismaService } from "@/modules/database/infra/prisma.service";
import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = {
  success: boolean
}

@Injectable()
export class CreateUserUseCase {
  constructor(private prisma: PrismaService) {}

  async resolve(body: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const { name, email, password } = body
    
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userWithSameEmail) throw new ConflictException("Já existe um usuário com esse email.")
    
    const hashedPassword = await hash(password, 8)

    const user = {
      name,
      email, 
      password: hashedPassword
    }

    await this.prisma.user.create({ data: user })
    
    return { success: true }
  }
}