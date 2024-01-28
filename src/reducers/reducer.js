// Initial state for the contacts
const initialState = [];

// Reducer function to manage contact-related actions
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        // Action to fetch contacts
        case 'FETCH_CONTACTS':
            return action.payload;

        // Action to add a new contact
        case 'ADD_CONTACT':
            return [...state, action.payload];

        // Action to update a contact
        case 'UPDATE_CONTACT':
            // Map through the state and update the contact with the matching ID
            const updateState = state.map(contact => contact.id === action.payload.id ? action.payload : contact);
            // Assign the updated state to the current state
            state = updateState;
            return state;

        // Action to delete a contact
        case 'DELETE_CONTACT':
            // Filter out the contact with the matching ID
            const filterContacts = state.filter(contact => contact.id !== action.payload && contact);
            return filterContacts;

        // Default case for unknown actions
        default:
            return state;
    }
}

// Export the reducer function
export default Reducer;
