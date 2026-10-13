import * as Yup from 'yup';

const phoneRegex =
  /^(?:\+1[2-9]\d{2}[2-9]\d{6}|\+92[1-9]\d{8,9}|0\d{9,10}|[2-9]\d{9})$/;

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
    .required('Phone number is mandatory')
    .matches(
      phoneRegex,
      'Phone number must be a valid US or Pakistani phone number',
    ),
});
