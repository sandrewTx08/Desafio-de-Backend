import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseCodes, ResponseTemplate } from './types';

@Injectable()
export class AppResponseTemplate<T> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseTemplate<T>> {
    return next.handle().pipe(
      map((data) => ({
        code: 'SUCCESS_1',
        success: true,
        message: ResponseCodes.SUCCESS_1,
        data,
      })),
    );
  }
}
