const { program } = require("commander");
// const program = new Command();
program
  .option("--action, <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log(argv);

// const yargs = require("yargs");

// const { hideBin } = require("yargs/helpers");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.getlistContacts();
      return console.log(allContacts);
    case "getById":
      const oneContacts = await contacts.getById(id);
      return console.log(oneContacts);
    case "addContacts":
      const newContacts = await contacts.addContacts({ name, email, phone });
      return console.log(newContacts);
    case "editContactsById":
      const editContacts = await contacts.editContactsById(id, {
        name,
        email,
        phone,
      });
      return console.log(editContacts);
    case "removeContactsById":
      const removeContact = await contacts.removeContactsById(id);
      return console.log(removeContact);
    default:
      return console.log("Unknown action");
  }
};

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
invokeAction(argv);

// invokeAction({ action: "list" });
// invokeAction({ action: "getById", id: "C9sjBfCo4UJCWjzBnOtxl1" });
// invokeAction({
//   action: "addContacts",
//   name: "George Washington",
//   email: "GodBlessAmerica@gov.org",
//   phone: "(000) 111-2233",
// });
// invokeAction({
//   action: "editContactsById",
//   id: "K8RLT2eBpHB0EO1TE1G0b",
//   name: "George Bush",
//   email: "GodBlessAmerica@gov.org",
//   phone: "(000) 111-2233",
// });
// invokeAction({
//   action: "removeContactsById",
//   id: "K8RLT2eBpHB0EO1TE1G0b",
// });
