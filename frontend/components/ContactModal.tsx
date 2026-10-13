'use client';

import { Contact } from '@/data/contacts';
import FormField from '@/components/FormField';
import useContactModal from '@/hooks/useContactModal';

type Props = {
  contact: Contact | null;
  onSave: (contact: Contact) => void;
  onClose: () => void;
};

export default function ContactModal({ contact, onSave, onClose }: Props) {
  const { form, setField, handleSubmit } = useContactModal({ contact, onSave });
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[3px] w-full max-w-sm p-5"
      >
        <h2 className="text-lg mb-4">
          {contact ? 'Edit Contact' : 'Add Contact'}
        </h2>

        <FormField
          label="First Name"
          value={form.firstName}
          onChange={(value) => setField('firstName', value)}
        />
        <FormField
          label="Last Name"
          value={form.lastName}
          onChange={(value) => setField('lastName', value)}
        />
        <FormField
          label="Phone Number"
          value={form.phoneNumber}
          onChange={(value) => setField('phoneNumber', value)}
          placeholder="2225556575"
          className="mb-5"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 h-7 text-xs bg-[#e0e2e5] rounded-[3px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 h-7 text-xs text-white bg-[#4779ee] rounded-[3px]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
