import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
});

export class API {
  static async getContacts(page?: number, lastName?: string) {
    const res = await client.get('/contacts', { params: { page, lastName } });
    return res;
  }

  static async getContact(id: number) {
    const res = await client.get(`/contacts/${id}`);
    return res;
  }

  static async createContact(contact: object) {
    const res = await client.post('/contacts', contact);
    return res;
  }

  static async updateContact(id: number, contact: object) {
    const res = await client.patch(`/contacts/${id}`, contact);
    return res;
  }

  static async deleteContact(id: number) {
    const res = await client.delete(`/contacts/${id}`);
    return res;
  }
}
