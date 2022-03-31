import { toast } from 'react-toastify';
import request, { AxiosError } from 'axios';
import { HttpCode } from '../utils/const';
import { rollbar } from './rollbar';

export const handleError = (error: AxiosError): void => {
  if (!request.isAxiosError(error)) {
    throw new Error(`${error}`);
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest:
        rollbar.error(error);
        toast.info(response.data.error);
        break;
      case HttpCode.Unauthorized:
        rollbar.error(error);
        toast.info('You are not logged in. Not all features of the app are available');
        break;
      case HttpCode.NotFound:
        rollbar.error(error);
        toast.error(`This page not found. Try again`);
        break;
      default:
        rollbar.error(error);
        toast.error('Sorry. Server error or unknown error. Try again later');
    }
  }
};
