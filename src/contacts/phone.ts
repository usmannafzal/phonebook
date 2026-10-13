export const PHONE_REGEX =
  /^(?:(?:\+1)?[2-9]\d{2}[2-9]\d{6}|(?:\+92|0)[1-9]\d{8,9})$/;

export const PHONE_MESSAGE =
  'Phone number must be a valid US (222-555-6575) or Pakistani (0300-1234567) number';

export function normalizePhone(value: string) {
  return value.replace(/[\s().-]/g, '');
}
