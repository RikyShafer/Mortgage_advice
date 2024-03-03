import{
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md"
import "./navbar.css"
const Navbar = () => {
  return (
  <div className="navbar">
    <div className="navbar-title">
ראשי
    </div>
    <div className="navbar-manu">
      <div className="navbar-search">
        <MdSearch/>
        <input 
        type="text" 
        placeholder="Search..." 
        className="navbar-input"/>

      </div>
      <div className="navbar-icons">
        <MdOutlineChat size={20} />
        <MdNotifications size={20}/>
        <MdPublic size={20}/>

        </div>
    </div>
  </div>
  )
}

export default Navbar