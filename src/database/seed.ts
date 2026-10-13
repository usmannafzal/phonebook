import dataSource from './data-source.js';
import { Contact } from '../contacts/entities/contact.entity.js';

const contacts: Pick<Contact, 'firstName' | 'lastName' | 'phoneNumber'>[] = [
  { firstName: 'Ahmed', lastName: 'Khan', phoneNumber: '+923001234567' },
  { firstName: 'Sarah', lastName: 'Johnson', phoneNumber: '+12125551234' },
  { firstName: 'Bilal', lastName: 'Hussain', phoneNumber: '03211234567' },
  { firstName: 'Emily', lastName: 'Carter', phoneNumber: '2125559876' },
  { firstName: 'Fatima', lastName: 'Malik', phoneNumber: '+923331234567' },
  { firstName: 'Michael', lastName: 'Brown', phoneNumber: '+14155552671' },
  { firstName: 'Ayesha', lastName: 'Siddiqui', phoneNumber: '03451234567' },
  { firstName: 'Daniel', lastName: 'Wilson', phoneNumber: '3105550142' },
  { firstName: 'Hamza', lastName: 'Raza', phoneNumber: '+923451112233' },
  { firstName: 'Olivia', lastName: 'Martin', phoneNumber: '+16465550188' },
  { firstName: 'Usman', lastName: 'Tariq', phoneNumber: '03004445566' },
  { firstName: 'Sophia', lastName: 'Davis', phoneNumber: '+13125550123' },
];

async function seed() {
  await dataSource.initialize();
  try {
    const repo = dataSource.getRepository(Contact);

    // Idempotent: skip contacts whose phone number is already stored.
    const existing = new Set((await repo.find()).map((c) => c.phoneNumber));
    const fresh = contacts.filter((c) => !existing.has(c.phoneNumber));

    if (fresh.length) await repo.save(repo.create(fresh));
    console.log(
      `Seed complete: ${fresh.length} inserted, ${contacts.length - fresh.length} already present.`,
    );
  } finally {
    await dataSource.destroy();
  }
}

await seed();
