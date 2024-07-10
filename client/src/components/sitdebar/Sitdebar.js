import "./sitdebar.css"
import "../../features/homepage/homepage.css"
import NenuLink from "./NenuLink"
import {
  // MdOutlineSettings,
  // MdHelpCenter,
  // MdLogout///היאקון של היציאה 
} from "react-icons/md"
//האיקונים שבתפריט
// import { RiHomeWifiLine } from "react-icons/ri";
// import { HiOutlineInformationCircle } from "react-icons/hi";
// import { FaHandsHelping } from "react-icons/fa";
// import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
// import { CiCalculator2 } from "react-icons/ci";
// import { SiWhatsapp } from "react-icons/si";
// import { GiFiles } from "react-icons/gi";

// import { FaUsers } from "react-icons/fa6";
// import { RiAccountPinCircleLine } from "react-icons/ri";

// import { AiOutlineLogin } from "react-icons/ai";
// import { PiUserCirclePlusDuotone } from "react-icons/pi";

// import { useSendLogoutMutation } from "../../features/auth/authApiSlice"
// import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
const SitdeBar = () => {
  // const [logout, { isSuccess }] = useSendLogoutMutation();//ליציאה 
  // const navigate = useNavigate();
  const { firstName, email, roles, isAdmin, isUser } = useAuth();
  console.log(firstName, email, roles, isAdmin, isUser);
  const notMenuItems = [
    {
      title: "דפים",
      list: [
        {
          title: "עמוד הבית",
          path: "/",
          // icon: <RiHomeWifiLine />
        },
        {
          title: "קצת עלינו",
          path: "/about",
          // icon: <HiOutlineInformationCircle />
        },
        {
          title: "השירותים שלנו",
          path: "/our-services",
          // icon: <FaHandsHelping />
        },
        {
          title: "מספרים עלינו ",
          path: "/they-tell-us",
          // icon: <HiOutlineChatBubbleOvalLeftEllipsis />
        },
        {
          title: "מחשבון משכנתא ",
          path: "/mortgage-calculator",
          // icon: <CiCalculator2 />
        },
        {
          title: "צור קשר ",
          path: "/contact-us",
          // icon: <SiWhatsapp />
        },
      ],
    },
    {
      title: "משתמש",
      list: [
        {
          title: isUser || isAdmin ? "אזור אישי" : "התחברות",
          path: isUser ? "/private-area" : isAdmin ? "/aprivate-area" : "/login",
        },
        !isUser && !isAdmin && { // Show registration link if neither user nor admin
          title: "הרשמה",
          path: "/signup",
        },
      ].filter(Boolean), // Filter out undefined (when isUser or isAdmin is true)
    },
  ];




  let menuItems;


  menuItems = notMenuItems;
  console.log(menuItems, "menuItems");


  return (
    <div className="side-bar">
      <div className="side-bar-user">
        <div className="side-bar-user-details">
          <span className="side-car-user-username">שם משתמש: {firstName} </span>
          <span className="side-car-user-title"> מייל: {email} </span>
          <span className="side-car-user-title"> סוג: {roles} </span>
        </div>
      </div>
      <div className="side-bar-menuItems"> 
      <ul className="side-bar-menu-list">
        <img className="side-bar-menu-img" src="./Rectangle.png" alt="User avatar" />

        {menuItems.map(cat => (
          <li key={cat.title}>
            { cat.title==="משתמש"? 
             <span className="side-bar-menu-catM"> </span>:
            <span className="side-bar-menu-cat">  </span>
          }
            {cat.list.map(itme => (
              <NenuLink itme={itme} key={itme.title} menuItems={isAdmin}/>
            ))}
           </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default SitdeBar