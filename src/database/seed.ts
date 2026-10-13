import dataSource from './data-source.js';
import { Contact } from '../contacts/entities/contact.entity.js';

const contacts = [
  { firstName: 'Ahmed', lastName: 'Khan', phoneNumber: '+923001234567' },
  { firstName: 'Sarah', lastName: 'Johnson', phoneNumber: '2225556575' },
  { firstName: 'Bilal', lastName: 'Hussain', phoneNumber: '03211234567' },
  { firstName: 'Emily', lastName: 'Carter', phoneNumber: '+12204546754' },
  { firstName: 'Fatima', lastName: 'Malik', phoneNumber: '04235761234' },
  { firstName: 'Michael', lastName: 'Brown', phoneNumber: '2106579886' },
  { firstName: 'Ayesha', lastName: 'Siddiqui', phoneNumber: '03451234567' },
  { firstName: 'Daniel', lastName: 'Wilson', phoneNumber: '3436758786' },
  { firstName: 'Hamza', lastName: 'Raza', phoneNumber: '+923331234567' },
  { firstName: 'Olivia', lastName: 'Martin', phoneNumber: '+13436549688' },
  { firstName: 'Usman', lastName: 'Tariq', phoneNumber: '0512345678' },
  { firstName: 'Sophia', lastName: 'Davis', phoneNumber: '4155552671' },
];

async function seed() {
  await dataSource.initialize();
  try {
    const repo = dataSource.getRepository(Contact);

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
