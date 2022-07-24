import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseCodesError, ResponseTemplate } from 'src/types';

export const ERROR_NO_FUNDS = new HttpException(
  <ResponseTemplate>{
    code: 'ERROR_1',
    message: ResponseCodesError.ERROR_1,
    data: null,
  },
  HttpStatus.BAD_REQUEST,
);

export const ERROR_YOURSELF_TRANSFER = new HttpException(
  <ResponseTemplate>{
    code: 'ERROR_2',
    message: ResponseCodesError.ERROR_2,
    data: null,
  },
  HttpStatus.BAD_REQUEST,
);

export const ERROR_USER_TRANSFER = new HttpException(
  <ResponseTemplate>{ code: 'ERROR_3', message: ResponseCodesError.ERROR_3 },
  HttpStatus.NOT_FOUND,
);
