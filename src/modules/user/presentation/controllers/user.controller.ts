import { Body, Controller, Post } from "@nestjs/common"
import { CreateUserDTO } from "@user/application/dtos/createUser.dto"
import { CreateUserUseCase } from "../../application/usecases/createUserUseCase"

@Controller("user")
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase
  ) {}

  @Post("/create")
  async handle(@Body() body: CreateUserDTO) {
    return await this.createUserUseCase.resolve(body)
  }
}