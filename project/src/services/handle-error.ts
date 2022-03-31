import { toast } from 'react-toastify';
import request, { AxiosError } from 'axios';
import { HttpCode } from '../utils/const';
import Rollbar from 'rollbar';

const rollbarConfig = {
  accessToken: '5a09cc4879534a72b3afd23cce6f87df',
  environment: 'production',
};

const rollbar = new Rollbar(rollbarConfig);

export const isAxiosError = (error: AxiosError) => {
  if (!request.isAxiosError(error)) {
    throw new Error(`${error}`);
  }
};

export const handleError = (error: AxiosError): void => {
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
