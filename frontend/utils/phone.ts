export const PHONE_REGEX =
  /^(?:(?:\+1)?[2-9]\d{2}[2-9]\d{6}|(?:\+92|0)[1-9]\d{8,9})$/;

export const PHONE_MESSAGE =
  'Phone number must be a valid US (222-555-6575) or Pakistani (0300-1234567) number';

export function normalizePhone(value: string) {
  return value.replace(/[\s().-]/g, '');
}

export function formatPhone(phone: string) {
  const us = phone.match(/^(\+1)?(\d{3})(\d{3})(\d{4})$/);
  if (us) return `${us[1] ? '+1 ' : ''}${us[2]}-${us[3]}-${us[4]}`;

  const mobile = phone.match(/^(\+92|0)(3\d{2})(\d{7})$/);
  if (mobile && mobile[1] === '0') return `0${mobile[2]}-${mobile[3]}`;
  if (mobile) return `+92 ${mobile[2]} ${mobile[3]}`;

  return phone;
}
