import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  name: string

  @IsNotEmpty({ message: 'Email é obrigatório.' })
  @IsEmail({}, { message: 'Email inválido.' })
  email: string

  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.'})
  password: string
}