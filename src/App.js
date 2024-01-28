import React, {useEffect} from "react";
// import { ToastContainer } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import UpdateContact from "./components/UpdateContact";
import { useDispatch } from "react-redux";

 const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const data = [];
        const fetchContact = async () => {
            await fetch('https://jsonplaceholder.typicode.com/users')
                .then((response) => response.json())
                .then((json) => {
                    json.map((contact) => {
                      return(
                        data.push({
                          id: contact.id,
                          name: contact.name,
                          companyName: contact.company.name,
                          userName: contact.username,
                          number: contact.phone
                       })
                      )
                        
                    })
                });
            dispatch({ type: 'FETCH_CONTACTS', payload: data });
        };
        fetchContact();
    });
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/contact-list" element={<Home />}>

                </Route>
                <Route path="/add" element={<AddContact />}>

                </Route>
                <Route path="/edit/:id" element={<UpdateContact />}>

                </Route>
            </Routes>
            <ToastContainer/>
            
        </div>
    );
}

export default App;
