import {useLocation} from "react-router-dom";
import SearchContact from "./Contacts/SearchContact";
import {PURPLE, BACKGROUND} from '../helpers/colors';

const Navbar = () => {
    const location = useLocation();
    return (
        <nav className="nav navbar-dark navbar-expand-sm shadow-lg"
             style={{backgroundColor: BACKGROUND}}>
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand m-2">
                            <i className="fas fa-address-book fa-lg"
                               style={{color: PURPLE}}/>
                            {" "}
                            وب اپلیکیشن مدیریت {" "}
                            <span style={{color: PURPLE}}>مخاطبین</span>
                        </div>
                    </div>
                    {
                        location.pathname === "/contacts" ? (
                            <div className="col-md-6 col-lg-6 col-sm-12 d-flex justify-content-center">
                                <SearchContact/>
                            </div>) : null
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;