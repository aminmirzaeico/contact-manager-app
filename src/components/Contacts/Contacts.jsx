import {CURRENTLINE, ORANGE, PINK} from "../../helpers/colors";
import Contact from "./Contact";
import Spinner from '../Spinner';
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";
import {Link} from "react-router-dom";

const Contacts = () => {
    const {filteredContacts, loading, deleteContact} = useContext(ContactContext)
    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3 float-end">
                                <Link to={"/contacts/add"} className="btn m-2" style={{backgroundColor: PINK}}>
                                    ساخت مخاطب جدید
                                    <i className="fas fa-user-plus mx-2"/>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> : (
                    <section className="container">
                        <div className="row">
                            {
                                filteredContacts.length > 0 ? filteredContacts.map(c => (
                                        <Contact
                                            key={c.id}
                                            contact={c}
                                            deleteContact={() => deleteContact(c.id, c.fullname)}
                                        />))
                                    : (
                                        <div className="text-center py-5" style={{backgroundColor: CURRENTLINE}}>
                                            <p className="h3" style={{color: ORANGE}}>
                                                مخاطب یافت نشد...
                                            </p>
                                            <img
                                                src={require("../../assets/no-found.gif")}
                                                alt="یافت نشد"
                                                className="w-25"/>
                                        </div>
                                    )
                            }
                        </div>
                    </section>
                )
            }

        </>
    )
}

export default Contacts;