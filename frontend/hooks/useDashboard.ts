import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { API } from '@/api/api';
import { Contact } from '@/data/contacts';

export default function useDashBoard() {
  const [state, setState] = useImmer({
    contacts: [] as Contact[],
    totalPages: 0,
    search: '',
    query: '',
    page: 1,
    showModal: false,
    editingContact: null as Contact | null,
    loading: true,
    error: '',
    reload: 0,
  });
  const {
    contacts,
    totalPages,
    search,
    query,
    page,
    showModal,
    editingContact,
    loading,
    error,
    reload,
  } = state;

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
    try {
      if (id) await API.updateContact(id, data);
      else await API.createContact(data);

      setState((draft) => {
        draft.showModal = false;
        if (!id) draft.page = 1;
        draft.reload += 1;
      });
    } catch (error) {
      showError(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await API.deleteContact(id);

      setState((draft) => {
        if (contacts.length === 1 && page > 1) draft.page = page - 1;
        draft.reload += 1;
      });
    } catch (error) {
      showError(error);
    }
  }

  function retry() {
    setState((draft) => {
      draft.reload += 1;
    });
  }

  function setPage(p: number) {
    setState((draft) => {
      draft.page = p;
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setState((draft) => {
        draft.query = search;
        draft.page = 1;
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, setState]);

  useEffect(() => {
    async function fetchContacts() {
      setState((draft) => {
        draft.loading = true;
        draft.error = '';
      });

      try {
        const res = await API.getContacts(page, query);
        setState((draft) => {
          draft.contacts = res.data.data;
          draft.totalPages = res.data.pagination.totalPages;
          draft.loading = false;
        });
      } catch (error) {
        setState((draft) => {
          draft.error =
            error instanceof Error ? error.message : 'Something went wrong';
          draft.loading = false;
        });
      }
    }

    fetchContacts();
  }, [page, query, reload, setState]);

  return {
    contacts,
    search,
    page,
    showModal,
    editingContact,
    totalPages,
    loading,
    error,
    retry,
    setState,
    openAdd,
    handleSave,
    handleDelete,
    setPage,
    openEdit,
  };
}
