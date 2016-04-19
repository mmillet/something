import { ACTION_TYPES } from './constant';
const { PUSH_OPERATOR, PUSH_NUMBER, CALCULATE, CLEAN, BACK } = ACTION_TYPES;

export const pushOperator = (operator) => {
  return { type: PUSH_OPERATOR, operator };
};

export const pushNumber = (number) => {
  return { type: PUSH_NUMBER, number };
};

export const calculate = () => {
  return { type: CALCULATE };
};

export const clean = () => {
  return { type: CLEAN };
};

export const back = () => {
  return { type: BACK };
};
