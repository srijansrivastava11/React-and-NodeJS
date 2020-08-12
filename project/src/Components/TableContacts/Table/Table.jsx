import React, { useState, useEffect } from 'react';

import TableRow from '../TableRow/TableRow';
import FormContact from '../FormContact/FormContact';
import {fetchContacts, sendContact, deleteContact} from "../../../services";

import './Table.css';


function Table({ user }){
    const [contacts, setContacts] = useState([]);
    const [username, setUsername] = useState('');
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
     // console.log("contacts",contacts);
    const handleChange = (event) => {
        setSearch(event.target.value);
    }
    let filteredContacts = contacts.filter(contact =>
           contact.phone.startsWith(search)
        || contact.firstname.startsWith(search)
        || contact.lastname.startsWith(search));


    // Add Contact to Table
    const handleAdd = (obj) =>{
      setContacts([...contacts , obj]);
      filteredContacts = contacts;
      sendContact(obj)
        .then(() => {
      })
      .catch((err) => {
        setError(err.error);
      });

    }

    //Delete Contact
    const handleDelete = (id) => {
        setContacts([...contacts.filter(contact => contact.id !== id)]);
        filteredContacts = contacts;
        deleteContact(id)
          .then(() => {
        })
        .catch((err) => {
          setError(err.error);
        });
    }

    const GetFormContacts = ({ setContacts, setError }) => {
        fetchContacts()
          .then(formContacts => {
            setContacts(formContacts.contacts);
            setUsername(formContacts.username);
            filteredContacts = contacts;
          })
          .catch(err => {
            setError(err.error);
          });
      };
    useEffect(() => {
      GetFormContacts({ setContacts, setError });
    }, []);
    return (

        <div className="container">
        <div className="header">WELCOME</div>
         <div className="second-header">
           { username}
         </div>
            <div className="row ">
                <div className="col ">
                    <div className="row justify-content-center fixBox">
                        <input
                            className="searchBar"
                            name={'search'}
                            value={search}
                            onChange={handleChange}
                            placeholder="Search by Name or Phone"
                        />
                        <span><i className="fa fa-search"/></span>
                    </div>

                </div>
            </div>
            <div className="formBox">
                <FormContact handleAdd={handleAdd}/>
            </div>
            <div className="row justify-content-center contentTable">
                <div className="col">
                    <table className="table table-hover">
                        <thead className="headerColor">
                            <tr className="">
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredContacts.map(contact=>(
                                                        <TableRow
                                                            key={contact.id}
                                                            firstname={contact.firstname}
                                                            lastname={contact.lastname}
                                                            email={contact.email}
                                                            phone={contact.phone}
                                                            handleDelete={()=>handleDelete(contact.id)}
                                                        />
                                                    ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  )
}

export default Table;
