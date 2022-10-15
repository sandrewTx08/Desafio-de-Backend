export type ResponseTemplate<D = any> = {
  code: keyof typeof ResponseCodes;
  message: ResponseCodes;
  success: boolean;
  data: D;
};

export enum ResponseCodes {
  ERROR_1 = 'Not enough funds to complete operation.',
  ERROR_2 = 'You cannot send funds to yourself.',
  ERROR_3 = "User you're trying to transfer funds may not exist.",
  WARN_1 = '',
  SUCCESS_1 = 'Request succeed.',
}
