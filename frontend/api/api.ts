import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
});

client.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.message ?? error.message;
    return Promise.reject(new Error([message].flat().join('\n')));
  },
);

export class API {
  static getContacts(page?: number, lastName?: string) {
    return client.get('/contacts', { params: { page, lastName } });
  }

  static getContact(id: number) {
    return client.get(`/contacts/${id}`);
  }

  static createContact(contact: object) {
    return client.post('/contacts', contact);
  }

  static updateContact(id: number, contact: object) {
    return client.patch(`/contacts/${id}`, contact);
  }

  static deleteContact(id: number) {
    return client.delete(`/contacts/${id}`);
  }
}
