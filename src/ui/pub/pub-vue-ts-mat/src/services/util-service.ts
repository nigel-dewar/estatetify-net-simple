import { ICheckBox, ISuburb } from '@/models/types';
const splitByValue = '|';

export const processCheckBoxFilters = (
  data: string[]
): Promise<ICheckBox[]> => {
  let checkBoxesToReturn: ICheckBox[] = [];
  data.forEach(element => {
    let checkBoxData: ICheckBox = {
      name: element,
      checked: false,
    };
    checkBoxesToReturn.push(checkBoxData);
  });
  return Promise.resolve(checkBoxesToReturn);
};

export const serializeCheckBoxesToStringArray = (data: ICheckBox[]): string => {
  let strings: string[] = [];
  data.forEach(element => {
    let item: string = element.name;
    strings.push(item);
  });
  // toString().split(',').toString()
  return strings
    .toString()
    .split(',')
    .toString();
};

export const serializeNumbersArrayToStringArray = (data: number[]): string => {
  let strings: string[] = [];
  data.forEach(element => {
    let item: string = element.toString();
    strings.push(item);
  });
  // toString().split(',').toString()
  return strings
    .toString()
    .split(',')
    .toString();
};

export const serializeSuburbsArrayToStringArray = (data: ISuburb[]): string => {
  let strings: string[] = [];
  data.forEach(element => {
    let item: string = element.suburb
    strings.push(item);
  });
  // toString().split(',').toString()
  return strings
    .toString()
    .split(',')
    .toString();
};

export default {
  processCheckBoxFilters,
  serializeCheckBoxesToStringArray,
  serializeNumbersArrayToStringArray,
  serializeSuburbsArrayToStringArray
};
