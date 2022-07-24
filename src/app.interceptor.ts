import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseCodesSuccess, ResponseTemplate } from './types';

@Injectable()
export class AppResponseTemplate<T> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseTemplate<T>> {
    return next.handle().pipe(
      map((data) => ({
        code: 'SUCCESS_1',
        message: ResponseCodesSuccess.SUCCESS_1,
        data,
      })),
    );
  }
}
