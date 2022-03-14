import { toast } from 'react-toastify';
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
        toast.info(response.data.error);
        break;
      case HttpCode.UNAUTHORIZED:
        toast.info('You are not logged in. Not all features of the app are available');
        break;
      case HttpCode.NOT_FOUND:
        toast.error(`This page not found. Try again`);
        break;
      default:
        toast.error('Sorry. Server error or unknown error. Try again later');
    }
  }
};
