import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons"
// import { faHouse, faImage, faList, faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

const Naviage = () => {
    return <div className="nav">

        <NavLink to="/signup"> <FontAwesomeIcon icon={faUser} />  UserRegister Add </NavLink>
        <br></br>
        
        <NavLink to="/login"> <FontAwesomeIcon icon={faHouse} /> login</NavLink>
        <br></br>
        <NavLink to="/"> <FontAwesomeIcon icon={faHouse} /> Home</NavLink>
        <br></br>
        <NavLink to="/add"> <FontAwesomeIcon icon={faUser} />  add </NavLink>
        <br></br>
        <NavLink to="/questionnaireList"> <FontAwesomeIcon icon={faUser} />  questionnaire List </NavLink>
        <br></br>
        <NavLink to="/registerList"> <FontAwesomeIcon icon={faUser} />  register List </NavLink>
        
        <br></br>
        {/* <NavLink to="/get"> <FontAwesomeIcon icon={faUser} />  get </NavLink>
        <br></br>
        <NavLink to="/add"> <FontAwesomeIcon icon={faUser} />  add </NavLink>
        <br></br>
        <NavLink to="/getinManeger"> <FontAwesomeIcon icon={faUser} />  get in Maneger </NavLink>
        <br></br>
        <NavLink to="/Entrance"> <FontAwesomeIcon icon={faUser} />  Entrance </NavLink>
        <br></br>
        <NavLink to="/FillingNew"> <FontAwesomeIcon icon={faUser} />  FillingNew </NavLink> */}
        <br></br>


    </div>
}
export default Naviage