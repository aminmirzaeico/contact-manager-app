import {useState, useEffect} from "react";
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import {confirmAlert} from 'react-confirm-alert'

import _ from 'lodash';

import {ContactContext} from "./context/contactContext";
import {Contacts, AddContact, EditContact, ViewContact, Navbar} from "./components";
import {createContact, getAllContacts, getAllGroups, deleteContact} from "./services/contactService"

import {COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW} from "./helpers/colors";
import './App.css';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([])
    const [groups, setGroups] = useState([]);
    const [contact, setContact] = useState({})
    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)

                const {data: contactsData} = await getAllContacts()
                const {data: groupsData} = await getAllGroups()

                setContacts(contactsData)
                setFilteredContacts(contactsData)
                setGroups(groupsData)
                setLoading(false)

            } catch (err) {
                console.log(err.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const createContactForm = async (event,) => {
        event.preventDefault()
        try {
            setLoading(prevLoading => !prevLoading)
            const {status, data} = await createContact(contact)

            /*
            * NOTE
            * 1 - Rerender -> forceRender, setForceRender
            * 2 - setContacts(data)
             */

            if (status === 201) {
                const allContacts = [...contacts, data];
                setContacts(allContacts)
                setFilteredContacts(allContacts)

                setContact({})
                setLoading(prevLoading => !prevLoading)
                navigate("/contacts")
            }
        } catch (e) {
            console.log(e.message)
            setLoading(prevLoading => !prevLoading)
        }
    }

    const onContactChange = (event) => {
        setContact({...contact, [event.target.name]: event.target.value})
    }

    const confirmDelete = (contactId, contactFullname) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div dir="rtl" style={{
                        backgroundColor: CURRENTLINE, border: `1px solid $PURPLE`,
                        borderRadius: "1em"
                    }} className="p-4">
                        <h1 style={{color: YELLOW}}>پاک کردن مخاطب</h1>
                        <p style={{color: FOREGROUND}}>
                            آیا مطمئنی میخوای مخاطب {contactFullname} را پاک کنی؟
                        </p>
                        <button
                            onClick={() => {
                                removeContact(contactId)
                                onClose()
                            }}
                            className="btn mx-2"
                            style={{backgroundColor: PURPLE}}>
                            مطمئن هستم
                        </button>
                        <button
                            onClick={onClose}
                            className="btn"
                            style={{backgroundColor: COMMENT}}>
                            انصراف
                        </button>
                    </div>
                )
            }
        })
    }

    const removeContact = async (contactId) => {
        /*
         * NOTE
         * 1- forceRender -> setForceRender(true)
         * 2- Send request server
         * 3- Delete local state
         * 4- Delete local state before sending request to server
         */

        // Contacts Copy
        const allContacts = [...contacts];
        try {
            const updatedContact = contacts.filter(c => c.id !== contactId)
            setContacts(updatedContact);
            setFilteredContacts(updatedContact);

            // Sending delete request to server
            const {status} = await deleteContact(contactId)
            if (status !== 200) {
                setContacts(allContacts)
                setFilteredContacts(allContacts)
            }
        } catch (e) {
            console.log(e.message)
            setContacts(allContacts)
            setFilteredContacts(allContacts)
        }
    }

    const contactSearch = _.debounce((query) => {
        if (!query) return setFilteredContacts([...contacts])

        setFilteredContacts(
            contacts.filter((contact) => {
                    return contact.fullname.toLowerCase()
                        .includes(query.toLowerCase())
                }
            ))


    }, 1000)

    return (
        <ContactContext.Provider value={{
            loading,
            setLoading,
            contact,
            setContacts,
            filteredContacts,
            setFilteredContacts,
            contacts,
            groups,
            deleteContact: confirmDelete,
            createContact: createContactForm,
            contactSearch,
            onContactChange
        }}>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts"/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/contacts/add" element={<AddContact/>}/>
                    <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                    <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
                </Routes>
            </div>
        </ContactContext.Provider>
    );
}

export default App;
