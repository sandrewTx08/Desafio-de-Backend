import { responseTemplate } from 'src/response-template';

export const ERROR_NO_FUNDS = responseTemplate('ERROR_1', 'BAD_REQUEST'),
  ERROR_YOURSELF_TRANSFER = responseTemplate('ERROR_2', 'BAD_REQUEST'),
  ERROR_USER_TRANSFER = responseTemplate('ERROR_3', 'NOT_FOUND');
