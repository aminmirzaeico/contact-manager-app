import {CURRENTLINE, CYAN, ORANGE, PURPLE, RED} from "../../helpers/colors";
import {Link} from "react-router-dom";

const Contact = ({contact, deleteContact}) => {
    return (
        <div className="col-md-6 col-lg-6 col-sm-12">
            <div style={{backgroundColor: CURRENTLINE}} className="card my-2">
                <div className="card-body">
                    <div className="row align-items-center d-flex justify-content-around ">
                        <div className="col-md-4 col-sm-12 my-2">
                            <img src={contact.photo}
                                 alt={contact.fullname}
                                 style={{
                                     // border: `1px solid ${PURPLE}`,
                                     objectFit: "cover",
                                     width: "150px",
                                     height: "150px",
                                 }}
                                 className="img-fluid rounded"
                            />
                        </div>
                        <div className="col-md-7 col-sm-12 col-">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                    نام و نام خانوادگی : {" "}
                                    <span className="fw-bold">{contact.fullname}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                    شماره موبایل : {" "}
                                    <span className="fw-bold">{contact.mobile}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                    آدرس ایمیل : {" "}
                                    <span className="fw-bold">{contact.email}</span>
                                </li>
                            </ul>
                        </div>
                        <div
                            className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
                            <Link to={`/contacts/${contact.id}`} className="btn my-1"
                                  style={{backgroundColor: ORANGE}}>
                                <i className="fas fa-user-tag"/>
                            </Link>
                            <Link to={`/contacts/edit/${contact.id}`} className="btn my-1"
                                  style={{backgroundColor: CYAN}}>
                                <i className="fas fa-user-edit"/>
                            </Link>
                            <button onClick={deleteContact} className="btn my-1"
                                    style={{backgroundColor: RED}}>
                                <i className="fas fa-user-times"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;