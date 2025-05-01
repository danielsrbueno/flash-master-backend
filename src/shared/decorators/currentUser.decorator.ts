import { TokenDTO } from '@/modules/auth/application/dtos/token.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as TokenDTO;
  },
);
