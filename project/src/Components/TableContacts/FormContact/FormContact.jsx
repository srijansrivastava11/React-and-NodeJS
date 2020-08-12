import React from 'react';
import {useState} from 'react';
import './FormContact.css';

const FormContact = (props) => {
    const [newContact,
        setNewContact] = useState({firstname: '', lastname: '', email: '', phone: ''});

    const createUUID = () => {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
       });
    }

    let random = createUUID();

    const handleChange = (event) => {
        const value = event.target.value;
        setNewContact({
            ...newContact,
            [event.target.name]: value
        })
    }

    // Clear Form contact
    const handleClear = () => {
        setNewContact({firstname: '', lastname: '', email: '', phone: ''})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newContact.firstname.length > 0 && newContact.lastname.length > 0 && newContact.email.length > 0 && newContact.phone.length > 0) {
            props.handleAdd({
                ...newContact,
                id: random,
            })
            handleClear();
        }
    }

    return (
        <div>
        {/* Form Contacts */}
            <form  onSubmit={handleSubmit}>
                <div className="row">
                    <div></div>
                    <div className="col ">
                        <div className="contactForm">
                            <label>Name:</label>
                            <input
                                className="form-control"
                                name={"firstname"}
                                id="name"
                                value={newContact.firstname}
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter name of contact"
                                required
                                pattern=".{4,}"
                                title="Please enter at least 4 characters."/>
                        </div>
                        <div className="contactForm">
                            <label>Lastname:</label>
                            <input
                                className="form-control"
                                name={"lastname"}
                                id="lastname"
                                value={newContact.lastname}
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter surname of contact"
                                required/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="contactForm">
                            <label>Email:</label>
                            <input
                                className="form-control"
                                name={"email"}
                                id="email"
                                value={newContact.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Enter email of contact"
                                required/>
                        </div>
                        <div className="contactForm">
                            <label>Phone:</label>
                            <input
                                className="form-control"
                                name={"phone"}
                                id="phone"
                                value={newContact.phone}
                                onChange={handleChange}
                                type="tel"
                                placeholder="Enter phone of contact"
                                required
                                />
                        </div>

                    </div>
                        <div>
                            <div>

                                <button className="btn-success saveBtn" type="submit">Save Contact</button>
                            </div>
                            <div>
                                <button className="btn-outline-secondary clearBtn" onClick={handleClear} type="reset">Clear</button>
                            </div>
                        </div>
                        <div ></div>

                </div>

            </form>
        </div>
    );
}

export default FormContact;
