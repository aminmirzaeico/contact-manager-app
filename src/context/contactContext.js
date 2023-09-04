import {createContext} from 'react'

export const ContactContext = createContext({
    loading: false,
    setLoading: () => {
    },
    contact: {},
    setContacts: () => {
    },
    setFilteredContacts: () => {
    },
    filteredContacts: [],
    contacts: [],
    groups: [],
    onContactChange: () => {
    },
    deleteContact: () => {
    },
    createContact: () => {
    },
    contactSearch: () => {
    },
})