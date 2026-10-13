import { Contact } from '@/data/contacts';
import { useImmer } from 'use-immer';

interface Props {
  contact: Contact | null;
  onSave: (contact: Contact) => void;
}

export default function useContactModal({ contact, onSave }: Props) {
  const [form, setForm] = useImmer({
    firstName: contact?.firstName || '',
    lastName: contact?.lastName || '',
    phoneNumber: contact?.phoneNumber || '',
  });

  function setField(field: keyof typeof form, value: string) {
    setForm((draft) => {
      draft[field] = value;
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    onSave({ id: contact?.id || 0, ...form });
  }
  return { form, setField, handleSubmit };
}
