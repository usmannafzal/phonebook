import { useFormik } from 'formik';
import { Contact } from '@/data/contacts';
import { validationSchema } from '@/api/validation-schemas/contact.schema';

interface Props {
  contact: Contact | null;
  onSave: (contact: Contact) => void;
}

export default function useContactModal({ contact, onSave }: Props) {
  const formik = useFormik({
    initialValues: {
      firstName: contact?.firstName || '',
      lastName: contact?.lastName || '',
      phoneNumber: contact?.phoneNumber || '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => onSave({ id: contact?.id || 0, ...values }),
  });

  return {
    form: formik.values,
    errors: formik.errors,
    setField: formik.setFieldValue,
    handleSubmit: formik.handleSubmit,
  };
}
