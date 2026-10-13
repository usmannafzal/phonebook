import { Contact } from "@/data/contacts";
import { PencilIcon, PhoneIcon, TrashIcon } from "./Icons";

type Props = {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
};

export default function ContactList({ contacts, onEdit, onDelete }: Props) {
  if (contacts.length === 0) {
    return (
      <div className="bg-white border border-[#ebebeb] rounded-[3px] py-6 text-center text-sm text-[#a6a6a6]">
        No contacts found
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[3px]">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center justify-between h-[58px] px-3 border-b border-[#ebebeb] last:border-b-0"
        >
          <div>
            <p className="text-[15px] font-medium">
              {contact.firstName} {contact.lastName}
            </p>
            <p className="flex items-center gap-1 text-[10px] font-bold text-[#a6a6a6]">
              <PhoneIcon />
              {contact.phoneNumber}
            </p>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => onEdit(contact)}
              className="w-6 h-6 flex items-center justify-center bg-[#4779ee] rounded-[3px]"
            >
              <PencilIcon />
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="w-6 h-6 flex items-center justify-center bg-[#bc4e4e] rounded-[3px]"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
