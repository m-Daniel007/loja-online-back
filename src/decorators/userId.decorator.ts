import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { authorizantionToLoginPayload } from '../utils/base-64-converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;
  const loginpayload = authorizantionToLoginPayload(authorization);
  return loginpayload?.id;
});
