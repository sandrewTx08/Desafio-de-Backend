import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseCodes, ResponseTemplate } from 'src/types';

export const codePattern = /(ERROR|WARN|SUCCESS)+_+[0-9]/g;

export function responseTemplate(
  code: keyof typeof ResponseCodes,
  httpStatus: keyof typeof HttpStatus,
) {
  return new HttpException(
    {
      code,
      message: ResponseCodes[code],
      success: true,
      data: null,
    } as ResponseTemplate,
    HttpStatus[httpStatus],
  );
}
