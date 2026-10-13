import * as Yup from 'yup';

import { normalizePhone, PHONE_MESSAGE, PHONE_REGEX } from '@/utils/phone';

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'First name must be at least 3 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .required('First name is mandatory'),
  lastName: Yup.string()
    .required('Last name is mandatory')
    .min(3, 'Last name must be at least 3 characters')
    .max(50, 'Last name cannot exceed 50 characters'),
  phoneNumber: Yup.string()
    .transform((value) => value && normalizePhone(value))
    .required('Phone number is mandatory')
    .matches(PHONE_REGEX, PHONE_MESSAGE),
});
