import "./App.css";
import contacts from "../src/contacts.json";
import { useState } from "react";

function App() {
  const [contactsList, setContactsList] = useState(contacts.slice(0, 5));

  const handleAddRandomContact = () => {
    let randomIndex = Math.floor(Math.random() * contacts.length);
   
    let newContact = contacts[randomIndex]
    let repeatedIsTrue = contactsList.find((eachcontact) => {
      return eachcontact.id === newContact.id ? true : undefined;    
    })

    // return repeatedIsTrue !== undefined ?  handleAddRandomContact() : null;
    if (repeatedIsTrue !== undefined) {
   
      handleAddRandomContact()
      return;
    }



    setContactsList([newContact, ...contactsList]);
  };

  const handleSortByPopularity = () => {
    let contactsListToSort = JSON.parse(JSON.stringify(contactsList));
    contactsListToSort.sort((a, b) => {
      return a.popularity < b.popularity ? 1 : -1;
    });
    setContactsList(contactsListToSort);
  };

  const handleSortByName = () => {
    let contactsListToSort = JSON.parse(JSON.stringify(contactsList));
    contactsListToSort.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    setContactsList(contactsListToSort);
  };

  const handleDelete = (idToFind) => {
    // console.log("in")
 
    let contactsToDel =  contactsList.filter((contact) => {
      return contact.id === idToFind ? false : true;
    });
    setContactsList(contactsToDel);
  };







  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={handleAddRandomContact}>Add Random Contact</button>
      <button onClick={handleSortByPopularity}>Sort by popularity</button>
      <button onClick={handleSortByName}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contactsList.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} width="120" />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar === true ? "🏆" : null}</td>
                <td>{contact.wonEmmy === true ? "🌟" : null}</td>
                <th><button onClick={() => {handleDelete(contact.id)}}>Delete</button></th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
