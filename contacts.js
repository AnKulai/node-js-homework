import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "./db/contacts.json");

export const listContacts = async () => {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const selectContact = contacts.find((contact) => contact.id === contactId);
  return selectContact ?? -1;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removeIndex = contacts.findIndex(({ id }) => id === contactId);
  if (removeIndex === -1) return null;
  const [result] = contacts.splice(removeIndex, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const id = nanoid();
  contacts.push({ id, name, email, phone });
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
};
