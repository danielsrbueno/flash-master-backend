import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from '@auth/application/dtos/signIn.dto';
import { compare } from 'bcryptjs';
import { SignInUseCase } from '../../application/usecases/signIn.usecase';

@Controller('/auth')
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post()
  async handle(@Body() body: SignInDTO) {
    return await this.signInUseCase.resolve(body);
  }
}
