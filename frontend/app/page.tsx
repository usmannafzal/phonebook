'use client';

import ContactList from '@/components/ContactList';
import ContactModal from '@/components/ContactModal';
import Pagination from '@/components/Pagination';
import { BookIcon, SearchIcon } from '@/components/Icons';
import useDashBoard from '@/hooks/useDashboard';

export default function Home() {
  const {
    contacts,
    search,
    page,
    showModal,
    editingContact,
    totalPages,
    loading,
    error,
    retry,
    openAdd,
    handleSave,
    handleDelete,
    setPage,
    openEdit,
    setState,
  } = useDashBoard();

  return (
    <main className="max-w-[600px] mx-auto px-[25px] py-10">
      <div className="flex items-center justify-center gap-3 mb-[45px]">
        <BookIcon />
        <h1 className="text-[28px] text-[#212121]">Phone Book App</h1>
      </div>

      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-lg">
          Contacts
          {loading && contacts.length > 0 && (
            <span className="ml-2 text-xs text-[#a6a6a6]">Loading...</span>
          )}
        </h2>
        <button
          onClick={openAdd}
          className="w-[100px] h-[26px] text-[11px] text-white bg-[#4779ee] rounded-[3px]"
        >
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
            });
          }}
        />
      </div>

      <ContactList
        contacts={contacts}
        loading={loading}
        error={error}
        onRetry={retry}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {showModal && (
        <ContactModal
          contact={editingContact}
          onSave={handleSave}
          onClose={() =>
            setState((draft) => {
              draft.showModal = false;
            })
          }
        />
      )}
    </main>
  );
}
