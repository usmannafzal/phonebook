import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { API } from '@/api/api';
import { Contact } from '@/data/contacts';

export default function useDashBoard() {
  const [state, setState] = useImmer({
    contacts: [] as Contact[],
    totalPages: 0,
    search: '',
    page: 1,
    showModal: false,
    editingContact: null as Contact | null,
  });
  const { contacts, totalPages, search, page, showModal, editingContact } =
    state;

  function showError(error: unknown) {
    if (error instanceof Error) alert(error.message);
  }

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

  async function handleSave({ id, ...data }: Contact) {
    const previous = contacts;
    const tempId = -Date.now();

    setState((draft) => {
      draft.showModal = false;
      const existing = draft.contacts.find((c) => c.id === id);
      if (existing) Object.assign(existing, data);
      else draft.contacts.unshift({ id: tempId, ...data });
    });

    try {
      const res = id
        ? await API.updateContact(id, data)
        : await API.createContact(data);
      setState((draft) => {
        const index = draft.contacts.findIndex((c) => c.id === (id || tempId));
        draft.contacts[index] = res.data;
      });
    } catch (error) {
      setState((draft) => {
        draft.contacts = previous;
      });
      showError(error);
    }
  }

  async function handleDelete(id: number) {
    const previous = contacts;

    setState((draft) => {
      draft.contacts = draft.contacts.filter((c) => c.id !== id);
    });

    try {
      await API.deleteContact(id);
      if (previous.length === 1 && page > 1) setPage(page - 1);
    } catch (error) {
      setState((draft) => {
        draft.contacts = previous;
      });
      showError(error);
    }
  }

  function setPage(p: number) {
    setState((draft) => {
      draft.page = p;
    });
  }

  useEffect(() => {
    async function fetchContacts() {
      const res = await API.getContacts(page, search);
      setState((draft) => {
        draft.contacts = res.data.data;
        draft.totalPages = res.data.pagination.totalPages;
      });
    }

    fetchContacts();
  }, [page, search, setState]);

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
  };
}
