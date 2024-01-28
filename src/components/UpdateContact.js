import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
// import { useToasts } from 'react-toast-notifications';

// Component to update a contact
const UpdateContact = () => {
    const [name, setName] = useState('');
    const [companyName, setcompanyName] = useState('');
    const [userName, setuserName] = useState('');
    const [number, setNumber] = useState('');

    const { id } = useParams();
    // const { addToast } = useToasts();
    const contacts = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentContact = contacts.find(contact => contact.id === parseInt(id));

    useEffect(() => {
        // Set initial values when the component mounts
        if (currentContact) {
            setName(currentContact.name);
            setcompanyName(currentContact.companyName);
            setuserName(currentContact.userName);
            setNumber(currentContact.number);
        }

    }, [currentContact]);

    const handleSubmit = e => {
        e.preventDefault();

        const checkuserName = contacts.find(contact => contact.id !== parseInt(id) && contact.userName === userName);
        const checkNumber = contacts.find(contact => contact.id !== parseInt(id) && contact.number === parseInt(number));

        if (!userName || !number || !name || !companyName) {
            return toast.warning("Please fill in all fields!");
            // return addToast("Please fill in all fields!",{
            //     appearance:"error"
            // });
        }

        if (checkuserName) {
            return toast.error("This userName already Exists!");
            // return addToast("This userName already Exists!", {
            //     appearance: 'error'
            //   });
        }

        if (checkNumber) {
            return toast.error("This number already Exists!");
            // return addToast("This number already Exists!", {
            //     appearance: 'error'
            //   });
        }

        // Create data object with updated contact details
        const data = {
            id: parseInt(id),
            name,
            companyName,
            userName,
            number
        }

        // Dispatch the action to update the contact
        dispatch({ type: 'UPDATE_CONTACT', payload: data });
        toast.success("Contact updated successfully!");
        navigate('/contact-list');
    };

    return (
        <div className='updateContact'>
            {
                currentContact ? (
                    <>
                        {/* Display header with contact ID */}
                        <h1>Edit Contact {id}</h1>
                        <div className='row'>
                            {/* Form for updating contact */}
                            <form onSubmit={handleSubmit}>
                                {/* Input fields for contact details */}
                                <div className='form-inputs'>
                                    <input style={{ height: 25, marginBottom: 3 }} size="30" type='text' placeholder='Name'
                                        value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className='form-inputs'>
                                    <input style={{ height: 25, marginBottom: 3 }} size="30" type='text' placeholder='CompanyName'
                                        value={companyName} onChange={e => setcompanyName(e.target.value)} />
                                </div>
                                <div className='form-inputs'>
                                    <input style={{ height: 25, marginBottom: 3 }} size="30" type='userName' placeholder='Email'
                                        value={userName} onChange={e => setuserName(e.target.value)} />
                                </div>
                                <div className='form-inputs'>
                                    <input type="number" style={{ height: 25, marginBottom: 3, width: 228 }} value={number} placeholder='Phone Number' onChange={e => setNumber(e.target.value)} />
                                </div>
                                <div className='form-inputs'>
                                    {/* Button to update contact and link to cancel */}
                                    <button style={{ marginRight: 10, fontSize: 20, color: "white", backgroundColor: "black", cursor: "pointer" }}>
                                        Update Contact
                                    </button>
                                    <Link to='/' className=''>Cancel</Link>
                                </div>
                            </form>
                        </div >
                    </>
                ) : (
                    // Display loading message if contact is not found
                    <h1 className=''>Loading...</h1>
                )
            }
        </div >
    )
}

export default UpdateContact;
