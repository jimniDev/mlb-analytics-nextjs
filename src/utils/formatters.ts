// src/lib/formatters.ts

export const formatMoney = (value: number): string => {
  return `$${Math.round(value).toLocaleString()}`;
};

export const formatPayroll = (value: number): string => {
  return `$${value.toFixed(1)}M`;
};
