import moment from 'moment';

export const celvinToCelsius = (celcius: number) => {
  return Math.round(celcius - 273.15);
};

export const getDay = (timestamp: number, timezone: number) => {
  return moment
    .unix(timestamp)
    .utcOffset(timezone / 60)
    .format('dddd');
};

export const getHours = (timestamp: number) => {
  return moment.unix(timestamp).format('HH:mm');
};

export const getHoursFromString = (timestamp: string) => {
  return moment(timestamp).format('HH:mm');
};

export const getHour = (timestamp: number, timezone: number) => {
  return moment
    .unix(timestamp)
    .utcOffset(timezone / 60)
    .format('HH:mm');
};

export const convertToLocalTime1Arg = (timestamp: number) => {
  return moment.unix(timestamp).format('HH:mm');
};

export const toKMformat = (value: number) => {
  return Math.round(value / 1000);
};