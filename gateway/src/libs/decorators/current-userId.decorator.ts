// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { Request } from 'express';
// import { JwtPayload } from '../shared/interfaces';

// export const CurrentUserId = createParamDecorator(
//   (_: undefined, context: ExecutionContext): number => {
//     const request: Request = context.switchToHttp().getRequest();


//     const user = request.user as JwtPayload;
//     return user.sub;
//   },
// );

import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../shared/interfaces';

export const CurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest() as any; 

    if (!request.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const user = request.user as JwtPayload;

    if (!user.sub) {
      throw new UnauthorizedException('User ID not found in token');
    }

    return user.sub;
  },
);