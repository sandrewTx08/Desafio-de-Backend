import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseCodesError, ResponseTemplate } from 'src/types';

export function errorResponseTemplate(
  code: keyof typeof ResponseCodesError,
  httpStatus: keyof typeof HttpStatus,
) {
  return new HttpException(
    {
      code,
      message: ResponseCodesError[code],
      data: null,
    } as ResponseTemplate,
    HttpStatus[httpStatus],
  );
}

export const ERROR_NO_FUNDS = errorResponseTemplate('ERROR_1', 'BAD_REQUEST'),
  ERROR_YOURSELF_TRANSFER = errorResponseTemplate('ERROR_2', 'BAD_REQUEST'),
  ERROR_USER_TRANSFER = errorResponseTemplate('ERROR_3', 'NOT_FOUND');
