export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
};

export const dummyContacts: Contact[] = [
  { id: 1, firstName: "Eric", lastName: "Elliot", phone: "222-555-6575" },
  { id: 2, firstName: "Steve", lastName: "Jobs", phone: "220-454-6754" },
  { id: 3, firstName: "Fred", lastName: "Allen", phone: "210-657-9886" },
  { id: 4, firstName: "Steve", lastName: "Wozniak", phone: "343-675-8786" },
  { id: 5, firstName: "Bill", lastName: "Gates", phone: "343-654-9688" },
  { id: 6, firstName: "Ada", lastName: "Lovelace", phone: "212-555-0142" },
  { id: 7, firstName: "Alan", lastName: "Turing", phone: "415-555-0198" },
  { id: 8, firstName: "Grace", lastName: "Hopper", phone: "646-555-0123" },
  { id: 9, firstName: "Linus", lastName: "Torvalds", phone: "503-555-0177" },
  { id: 10, firstName: "Margaret", lastName: "Hamilton", phone: "617-555-0165" },
  { id: 11, firstName: "Tim", lastName: "Berners-Lee", phone: "202-555-0111" },
  { id: 12, firstName: "Dennis", lastName: "Ritchie", phone: "908-555-0134" },
  { id: 13, firstName: "Ken", lastName: "Thompson", phone: "908-555-0189" },
];
