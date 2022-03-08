import request from 'axios';
import { HttpCode } from '../utils/const';

export const handleError = (error: unknown): void => {
  if (!request.isAxiosError(error)) {
    throw new Error(`${error}`);
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BAD_REQUEST:
        break;
      case HttpCode.UNAUTHORIZED:
        break;
      case HttpCode.NOT_FOUND:
        break;
    }
  }
};
