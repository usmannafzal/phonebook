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
    phone: contact?.phone || '',
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    onSave({ id: contact?.id || 0, ...form });
  }
  return { form, setForm, handleSubmit };
}
