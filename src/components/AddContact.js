import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddContact = () => {
    // State for managing form inputs
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [userName, setUserName] = useState('');
    const [number, setNumber] = useState('');

    // Accessing Redux state
    const contacts = useSelector(state => state);

    // Dispatch function for updating Redux state
    const dispatch = useDispatch();

    // Navigate function for redirecting to different routes
    const navigate = useNavigate();

    // Handling form submission
    const handleSubmit = e => {
        e.preventDefault();

        // Checking if userName or number already exists in contacts
        const checkUserName = contacts.find(contact => contact.userName === userName && userName);
        const checkNumber = contacts.find(contact => contact.number === number && number);

        // Validation: Checking if all fields are filled
        if (!companyName || !userName || !number || !name) {
            return toast.warning("Please fill in all fields!");
        }

        // Validation: Checking if userName already exists
        if (checkUserName) {
            return toast.error("This userName already exists!");
        }

        // Validation: Checking if number already exists
        if (checkNumber) {
            return toast.error("This number already exists!");
        }

        // Creating new contact data
        const data = {
            id: contacts[contacts.length - 1].id + 1,
            name,
            companyName,
            userName,
            number
        };

        // Dispatching action to update Redux state
        dispatch({ type: 'ADD_CONTACT', payload: data });

        // Showing success toast
        toast.success("Contact added successfully!!");

        // Redirecting to contact list page
        navigate('/contact-list');
    };

    return (
        <div className='addContact'>
            <h1>Add New Contact</h1>
            <div className='main-container'>
                <form onSubmit={handleSubmit}>
                    {/* Input for Name */}
                    <div className='form-inputs'>
                        <input type='text' style={{ height: 25, marginBottom: 3 }} placeholder='Name' value={name} size="30" onChange={e => setName(e.target.value)} />
                    </div>
                    {/* Input for CompanyName */}
                    <div className='form-inputs'>
                        <input type='text' style={{ height: 25, marginBottom: 3 }} size="30" placeholder='CompanyName' value={companyName} onChange={e => setCompanyName(e.target.value)} />
                    </div>
                    {/* Input for UserName */}
                    <div className='form-inputs'>
                        <input type='text' style={{ height: 25, marginBottom: 3 }} size="30" placeholder='userName' value={userName} onChange={e => setUserName(e.target.value)} />
                    </div>
                    {/* Input for Phone Number */}
                    <div className='form-inputs'>
                        <input type="number" style={{ height: 25, marginBottom: 3, width: 228 }} value={number} placeholder='Phone Number' onChange={e => setNumber(e.target.value)} />
                    </div>
                    {/* Submit Button */}
                    <div className='submitBtn'>
                        <button style={{ fontSize: 20, color: "white", backgroundColor: "black", cursor: "pointer" }}>Add Contact</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddContact;
