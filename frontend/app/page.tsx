"use client";

import { useImmer } from "use-immer";
import ContactList from "@/components/ContactList";
import ContactModal from "@/components/ContactModal";
import Pagination from "@/components/Pagination";
import { BookIcon, SearchIcon } from "@/components/Icons";
import { Contact, dummyContacts } from "@/data/contacts";

const PER_PAGE = 5;

export default function Home() {
  const [state, setState] = useImmer({
    contacts: dummyContacts,
    search: "",
    page: 1,
    showModal: false,
    editingContact: null as Contact | null,
  });
  const { contacts, search, page, showModal, editingContact } = state;

  const filtered = contacts.filter((c) => c.lastName.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function openAdd() {
    setState((draft) => {
      draft.editingContact = null;
      draft.showModal = true;
    });
  }

  function openEdit(contact: Contact) {
    setState((draft) => {
      draft.editingContact = contact;
      draft.showModal = true;
    });
  }

  function handleSave(contact: Contact) {
    setState((draft) => {
      const existing = contact.id ? draft.contacts.find((c) => c.id === contact.id) : null;
      if (existing) Object.assign(existing, contact);
      else draft.contacts.push({ ...contact, id: Date.now() });
      draft.showModal = false;
    });
  }

  function handleDelete(id: number) {
    setState((draft) => {
      draft.contacts = draft.contacts.filter((c) => c.id !== id);
      if (visible.length === 1 && draft.page > 1) draft.page -= 1;
    });
  }

  function setPage(p: number) {
    setState((draft) => {
      draft.page = p;
    });
  }

  return (
    <main className="max-w-[600px] mx-auto px-[25px] py-10">
      <div className="flex items-center justify-center gap-3 mb-[45px]">
        <BookIcon />
        <h1 className="text-[28px] text-[#212121]">Phone Book App</h1>
      </div>

      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-lg">Contacts</h2>
        <button onClick={openAdd} className="w-[100px] h-[26px] text-[11px] text-white bg-[#4779ee] rounded-[3px]">
          + Add Contact
        </button>
      </div>

      <div className="flex items-center gap-2 h-7 px-2 mb-4 bg-white border border-[#e0e2e5] rounded-[3px]">
        <SearchIcon />
        <input
          className="flex-1 text-xs outline-none placeholder:text-[#6f757b]"
          placeholder="Search for contact by last name..."
          value={search}
          onChange={(e) => {
            setState((draft) => {
              draft.search = e.target.value;
              draft.page = 1;
            });
          }}
        />
      </div>

      <ContactList contacts={visible} onEdit={openEdit} onDelete={handleDelete} />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {showModal && (
        <ContactModal contact={editingContact} onSave={handleSave} onClose={() => setState((draft) => { draft.showModal = false; })} />
      )}
    </main>
  );
}
