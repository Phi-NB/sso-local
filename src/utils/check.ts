import { isString } from 'lodash';

export const stringCheck = (data: any) => {
  if (data === undefined) {
    return '';
  }
  if (data === null) {
    return '';
  }
  if (!isString(data)) {
    return '';
  }
  if (data === 'null') {
    return '';
  }
  return data;
};

export const isNumber = (data: any) => {
  return !isNaN(Number(data));
};

export const isPathOrURL = (str: string) => {
  if (/^(\/[a-zA-Z0-9_-]+)+$/g.test(str)) {
    return true;
  }

  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
};
