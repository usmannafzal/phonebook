import { Contact, dummyContacts } from '@/data/contacts';
import { useImmer } from 'use-immer';

const PER_PAGE = 5;

export default function useDashBoard() {
  const [state, setState] = useImmer({
    contacts: dummyContacts,
    search: '',
    page: 1,
    showModal: false,
    editingContact: null as Contact | null,
  });
  const { contacts, search, page, showModal, editingContact } = state;

  const filtered = contacts.filter((c) =>
    c.lastName.toLowerCase().includes(search.toLowerCase()),
  );
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
      const existing = contact.id
        ? draft.contacts.find((c) => c.id === contact.id)
        : null;
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

  return {
    contacts,
    search,
    page,
    showModal,
    editingContact,
    totalPages,
    setState,
    openAdd,
    handleSave,
    handleDelete,
    setPage,
    openEdit,
    visible,
  };
}
