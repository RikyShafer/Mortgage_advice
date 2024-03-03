import "./sitdebar.css"
import NenuLink from "./NenuLink"
import {
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout
} from "react-icons/md"
import { RiHomeWifiLine } from "react-icons/ri";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { FaHandsHelping } from "react-icons/fa";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { CiCalculator2 } from "react-icons/ci";
import { SiWhatsapp } from "react-icons/si";
import { GiFiles } from "react-icons/gi";
import { AiOutlineLogin } from "react-icons/ai";
import { PiUserCirclePlusDuotone } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";


import { useSendLogoutMutation } from "../../features/auth/authApiSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
const SitdeBar = () => {
  const [logout, { isSuccess }] = useSendLogoutMutation()
  const navigate = useNavigate();
  // const {userName, fullName, company}=useAuth
  const { firstName, email, roles, isUser } = useAuth()


  console.log(firstName, email, roles);
 

  let userStatus = isUser; // Declare userStatus using let

  if(roles === "")
    userStatus = "not";
  const notMenuItems = [
    {
      title: "דפים",
      list: [
        {
          title: "עמוד הבית",
          path: "/",
          icon: <RiHomeWifiLine />
        },
        {
          title: "קצת עלינו",
          path: "/about",
          icon: <HiOutlineInformationCircle />
        },
        {
          title: "השירותים שלנו",
          path: "/our-services",
          icon: <FaHandsHelping />
        },
        {
          title: "מספרים עלינו ",
          path: "/they-tell-us",
          icon: <HiOutlineChatBubbleOvalLeftEllipsis />
        },
        {
          title: "מחשבון משכנתא ",
          path: "/mortgagecalculator",
          icon: <CiCalculator2 />
        },
        {
          title: "צור קשר ",
          path: "/contact-us",
          icon: <SiWhatsapp />
        },
      ],
    },
    {
      title: "משתמש",
      list: [
        {
          title: "הגדרות",
          path: "/settings",
          icon: <MdOutlineSettings />
        },
        {
          title: "עזרה",
          path: "/help",
          icon: <MdHelpCenter />
        },
        {
          title: "התחברות",
          path: "login",
          icon: <AiOutlineLogin />
        },
        {
          title: "הרשמה",
          path: "signup",
          icon: <PiUserCirclePlusDuotone />
        },

      ],
    },
  ];
  const adminMenuItems = [
    {
      title: "דפים",
      list: [
        {
          title: "עמוד הבית",
          path: "/",
          icon: <RiHomeWifiLine />
        },
        {
          title: "קצת עלינו",
          path: "/about",
          icon: <HiOutlineInformationCircle />
        },
        {
          title: "השירותים שלנו",
          path: "/our-services",
          icon: <FaHandsHelping />
        },
        {
          title: "מספרים עלינו ",
          path: "/they-tell-us",
          icon: <HiOutlineChatBubbleOvalLeftEllipsis />
        },
        {
          title: "מחשבון משכנתא ",
          path: "/mortgagecalculator",
          icon: <CiCalculator2 />
        },
        {
          title: "צור קשר ",
          path: "/contact-us",
          icon: <SiWhatsapp />
        },
        {
          title: "העלת מסמכים ",
          path: "add",
          icon: <GiFiles />
        },
        {
          title: "צפייה בנרשמים  ",
          path: "registerList",
          icon: <FaUsers />
        },
      ],
    },
    {
      title: "משתמש",
      list: [
        {
          title: "הגדרות",
          path: "/settings",
          icon: <MdOutlineSettings />
        },
        {
          title: "עזרה",
          path: "/help",
          icon: <MdHelpCenter />
        },
        {
          title: "התחברות",
          path: "login",
          icon: <AiOutlineLogin />
        },
        {
          title: "הרשמה",
          path: "signup",
          icon: <PiUserCirclePlusDuotone />
        },

      ],
    },
  ];
  const userMenuItems = [
    {
      title: "דפים",
      list: [
        {
          title: "עמוד הבית",
          path: "/",
          icon: <RiHomeWifiLine />
        },
        {
          title: "קצת עלינו",
          path: "/about",
          icon: <HiOutlineInformationCircle />
        },
        {
          title: "השירותים שלנו",
          path: "/our-services",
          icon: <FaHandsHelping />
        },
        {
          title: "מספרים עלינו ",
          path: "/they-tell-us",
          icon: <HiOutlineChatBubbleOvalLeftEllipsis />
        },
        {
          title: "מחשבון משכנתא ",
          path: "/mortgagecalculator",
          icon: <CiCalculator2 />
        },
        {
          title: "צור קשר ",
          path: "/contact-us",
          icon: <SiWhatsapp />
        },
        {
          title: "העלת מסמכים ",
          path: "add",
          icon: <GiFiles />
        },
        {
          title: "צפייה בנרשמים  ",
          path: "registerList",
          icon: <FaUsers />
        },
      ],
    },
    {
      title: "משתמש",
      list: [
        {
          title: "הגדרות",
          path: "settings",
          icon: <MdOutlineSettings />
        },
        {
          title: "עזרה",
          path: "help",
          icon: <MdHelpCenter />
        },
      ],
    },
  ];

  let menuItems
  // const menuItems = isUser ? userMenuItems : adminMenuItems;
if(userStatus==="ADMIN")
{
  menuItems=adminMenuItems
}
else if (userStatus==="not")
{
  menuItems=notMenuItems
}
else {
  menuItems=userMenuItems
}



  // const menuItems = adminMenuItems;
  useEffect(() => {
    if (isSuccess) {
      navigate("/")
    }
  }, [isSuccess, navigate])
  const logOutClick = () => {
    logout()
  }
  return (
    <div className="side-bar">
      <div className="side-bar-user">
        {/* <img src={company.image?"http://localhost:1010/uploads/" +company.image :"/logo612.jpg"} */}

        <div className="side-bar-user-details">
          <span className="side-car-user-username">{firstName} </span>
          <span className="side-car-user-title">{email} </span>
          <span className="side-car-user-title">{roles} </span>

        </div>

      </div>
      <ul className="side-bar-menu-list">
      <img className="side-bar-menu-img" src="./logo612.jpg" alt="User avatar" />

        {menuItems.map(cat => (
          <li key={cat.title}>
            <span className="side-bar-menu-cat"> {cat.title} </span>
            {cat.list.map(itme => (
              <NenuLink itme={itme} key={itme.title} />
            ))}
          </li>
        ))}
      </ul>
      <button onClick={logOutClick} className="side-bar-logout">
        <MdLogout />
        יציאה
      </button>

    </div>
  )
}

export default SitdeBar