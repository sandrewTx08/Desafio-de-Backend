export type ResponseTemplate<D = any> = {
  code:
    | keyof typeof ResponseCodesError
    | keyof typeof ResponseCodesWarn
    | keyof typeof ResponseCodesSuccess;
  message: ResponseCodesError | ResponseCodesWarn | ResponseCodesSuccess;
  data: D;
};

export enum ResponseCodesError {
  ERROR_1 = 'Not enough funds to complete operation.',
  ERROR_2 = 'You cannot send funds to yourself.',
  ERROR_3 = "User you're trying to transfer funds may not exist.",
}

export enum ResponseCodesWarn {
  WARN_1 = '',
}

export enum ResponseCodesSuccess {
  SUCCESS_1 = '',
}
