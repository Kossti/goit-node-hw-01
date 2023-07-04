const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const getlistContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const contactId = String(id);
  const contacts = await getlistContacts();
  const results = contacts.find((item) => item.id === contactId);
  return results || null;
};

const addContacts = async (data) => {
  const allContacts = await getlistContacts();
  const newContacts = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContacts;
};

const editContactsById = async (id, data) => {
  const contactId = String(id);
  const allContacts = await getlistContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

const removeContactsById = async (id) => {
  const contactId = String(id);
  const allContacts = await getlistContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};

module.exports = {
  getlistContacts,
  getById,
  addContacts,
  editContactsById,
  removeContactsById,
};

// ______________________
/*
const addText = async () => {
  const result = await fs.appendFile("./db/contacts.json", "\nTraTaTa-TuRuRu");
};
addText();
*/

/*
const readFile = async () => {
  const text = await fs.readFile("./db/contacts.json", "utf-8");
  console.log(text);
};

readFile();
*/

/*
// fs.readFile("./db/contacts.json")
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error.message));
*/

/*
// const admins = ["mango", "bravo", "tango"];

// const clients = ["joker", "cross", "enigma"];

// const users = { admins, clients };

// module.exports = users;
*/
