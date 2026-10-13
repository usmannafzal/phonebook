"use client";

import { useState } from "react";
import ContactList from "@/components/ContactList";
import ContactModal from "@/components/ContactModal";
import Pagination from "@/components/Pagination";
import { BookIcon, SearchIcon } from "@/components/Icons";
import { Contact, dummyContacts } from "@/data/contacts";

const PER_PAGE = 5;

export default function Home() {
  const [contacts, setContacts] = useState(dummyContacts);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const filtered = contacts.filter((c) => c.lastName.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function openAdd() {
    setEditingContact(null);
    setShowModal(true);
  }

  function openEdit(contact: Contact) {
    setEditingContact(contact);
    setShowModal(true);
  }

  function handleSave(contact: Contact) {
    if (contact.id) 
      setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
     else 
      setContacts([...contacts, { ...contact, id: Date.now() }]);
    
    setShowModal(false);
  }

  function handleDelete(id: number) {
    setContacts(contacts.filter((c) => c.id !== id));
    if (visible.length === 1 && page > 1) setPage(page - 1);
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
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <ContactList contacts={visible} onEdit={openEdit} onDelete={handleDelete} />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {showModal && (
        <ContactModal contact={editingContact} onSave={handleSave} onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}
