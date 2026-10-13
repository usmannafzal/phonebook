"use client";

import { useImmer } from "use-immer";
import { Contact } from "@/data/contacts";

const inputClass = "w-full h-8 px-2 text-sm bg-white border border-[#e0e2e5] rounded-[3px] outline-none";

type Props = {
  contact: Contact | null;
  onSave: (contact: Contact) => void;
  onClose: () => void;
};

export default function ContactModal({ contact, onSave, onClose }: Props) {
  const [form, setForm] = useImmer({
    firstName: contact?.firstName || "",
    lastName: contact?.lastName || "",
    phone: contact?.phone || "",
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    onSave({ id: contact?.id || 0, ...form });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-[3px] w-full max-w-sm p-5">
        <h2 className="text-lg mb-4">{contact ? "Edit Contact" : "Add Contact"}</h2>

        <label className="block text-xs mb-1">First Name</label>
        <input className={`${inputClass} mb-3`} value={form.firstName} onChange={(e) => setForm((draft) => { draft.firstName = e.target.value; })} required />

        <label className="block text-xs mb-1">Last Name</label>
        <input className={`${inputClass} mb-3`} value={form.lastName} onChange={(e) => setForm((draft) => { draft.lastName = e.target.value; })} required />

        <label className="block text-xs mb-1">Phone Number</label>
        <input
          className={`${inputClass} mb-5`}
          value={form.phone}
          onChange={(e) => setForm((draft) => { draft.phone = e.target.value; })}
          placeholder="222-555-6575"
          required
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 h-7 text-xs bg-[#e0e2e5] rounded-[3px]">
            Cancel
          </button>
          <button type="submit" className="px-4 h-7 text-xs text-white bg-[#4779ee] rounded-[3px]">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
