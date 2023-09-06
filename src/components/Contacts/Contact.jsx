import {CURRENTLINE, CYAN, ORANGE, PURPLE, RED} from "../../helpers/colors";
import {Link} from "react-router-dom";

const Contact = ({contact, deleteContact}) => {
    return (
        <div className="col-md-6 col-lg-6 col-sm-12 ">
            <div style={{backgroundColor: CURRENTLINE}} className="card my-2 ">
                <div className="container">
                    <div className="card-body">
                        <div className="row">
                            <div
                                className="col align-items-center d-flex justify-content-around col-md-4 col-sm-12 col-lg-4">
                                <div className="col-md-12 col-sm-12 col-lg-12">
                                    <img src={contact.photo}
                                         alt={contact.fullname}
                                         style={{
                                             border: `1px solid ${PURPLE}`,
                                             objectFit: "cover",
                                             width: "150px",
                                             height: "150px",
                                         }}
                                         className="img-fluid rounded-pill"
                                    />
                                    <div className="col-lg-12 col-md-12 col-sm-12 d-flex flex-row
                            align-items-center justify-content-center mt-2">
                                        <div className="btn-group" role="group" style={{direction: "ltr"}}>
                                            <Link to={`/contacts/${contact.id}`}
                                                  className="btn d-flex "
                                                  style={{backgroundColor: ORANGE}} type="button">
                                                <i className="fas fa-user-tag "/>
                                            </Link>
                                            <Link to={`/contacts/edit/${contact.id}`}
                                                  className="btn d-flex "
                                                  style={{backgroundColor: CYAN}} type="button">
                                                <i className="fas fa-user-edit "/>
                                            </Link>
                                            <button onClick={deleteContact}
                                                    className="btn d-flex "
                                                    style={{backgroundColor: RED}} type="button">
                                                <i className="fas fa-user-times "/>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-12 col-lg-8">
                                <ul className="list-group p-0 d-flex flex-column justify-content-center my-1"
                                    style={{height: "100%"}}>
                                    <li className="list-group-item list-group-item-dark">
                                        نام و نام خانوادگی : {" "}
                                        <span className="fw-bold">{contact.fullname}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-dark">
                                        شماره موبایل : {" "}
                                        <span className="fw-bold">{contact.mobile}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-dark">
                                        ایمیل : {" "}
                                        <span className="fw-bold">{contact.email}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;