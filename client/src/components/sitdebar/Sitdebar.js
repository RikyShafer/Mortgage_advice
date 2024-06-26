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
          title:  "אזור אישי" ,
          path: isUser ? "private-area" : isAdmin ? "aprivate-area" : "login",
          // icon: <RiAccountPinCircleLine />
        },
      ],
    },
  ];

//   const adminMenuItems = [
//     {
//       title: "דפים",
//       list: [
//         {
//           title: "עמוד הבית",
//           path: "/",
//           // icon: <RiHomeWifiLine />
//         },
//         {
//           title: "קצת עלינו",
//           path: "/about",
//           // icon: <HiOutlineInformationCircle />
//         },
//         {
//           title: "השירותים שלנו",
//           path: "/our-services",
//           // icon: <FaHandsHelping />
//         },
//         {
//           title: "מספרים עלינו ",
//           path: "/they-tell-us",
//           // icon: <HiOutlineChatBubbleOvalLeftEllipsis />
//         },
//         {
//           title: "מחשבון משכנתא ",
//           path: "/mortgagecalculator",
//           // icon: <CiCalculator2 />
//         },
//         {
//           title: "צור קשר ",
//           path: "/contact-us",
//           // icon: <SiWhatsapp />
//         },
//         {
//           title: "העלת מסמכים ",
//           path: "questionnaire",
//           // icon: <GiFiles />
//         },
//         {
//           title: "צפייה מסמכים ",
//           path: "questionnaireList",
//           // icon: <GiFiles />
//         },
//         {
//           title: "צפייה בנרשמים  ",
//           path: "registerList",
//           // icon: <FaUsers />
//         },
//       ],
//     },
//     // {
//     //   title: "משתמש",
//     //   list: [
//         // {
//         //   title: "הגדרות",
//         //   path: "/settings",
//         //   icon: <MdOutlineSettings />
//         // },
//         // {
//         //   title: "עזרה",
//         //   path: "/help",
//         //   icon: <MdHelpCenter />
//         // },
//         // {
//         //   title: "התחברות",
//         //   path: "login",
//         //   icon: <AiOutlineLogin />
//         // },
//         // {
//         //   title: "הרשמה",
//         //   path: "signup",
//         //   icon: <PiUserCirclePlusDuotone />
//         // },
//         {
//           title: "משתמש",
//           list: [
//             {
//               title:  "אזור אישי" ,
//               path: isUser || isAdmin ? "aprivate-area" : "login",
//               // icon: <RiAccountPinCircleLine />
//             },
//           ],
//         },
//       ];
//   const userMenuItems = [
//     {
//       title: "דפים",
//       list: [
//         {
//           title: "עמוד הבית",
//           path: "/",
//           // icon: <RiHomeWifiLine />
//         },
//         {
//           title: "קצת עלינו",
//           path: "/about",
//           // icon: <HiOutlineInformationCircle />
//         },
//         {
//           title: "השירותים שלנו",
//           path: "/our-services",
//           // icon: <FaHandsHelping />
//         },
//         {
//           title: "מספרים עלינו ",
//           path: "/they-tell-us",
//           // icon: <HiOutlineChatBubbleOvalLeftEllipsis />
//         },
//         {
//           title: "מחשבון משכנתא ",
//           path: "/mortgagecalculator",
//           // icon: <CiCalculator2 />
//         },
//         {
//           title: "צור קשר ",
//           path: "/contact-us",
//           // icon: <SiWhatsapp />
//         },
//         {
//           title: "העלת מסמכים ",
//           path: "questionnaireuser",
//           // icon: <GiFiles />
//         },

//       ],
//     },
//   //   {
//   //     title: "משתמש",
//   //     list: [
//   //       {
//   //         title: "הגדרות",
//   //         path: "settings",
//   //         icon: <MdOutlineSettings />
//   //       },
//   //       {
//   //         title: "עזרה",
//   //         path: "help",
//   //         icon: <MdHelpCenter />
//   //       },
//   //       {
//   //         title: "התחברות",
//   //         path: "login",
//   //         icon: <AiOutlineLogin />
//   //       },
//   //       {
//   //         title: "הרשמה",
//   //         path: "signup",
//   //         icon: <PiUserCirclePlusDuotone />
//   //       },
//   //     ],
//   //   },
//   // ];
//   {
//     title: "משתמש",
//     list: [
//       {
//         title:  "אזור אישי" ,
//         path: isUser || isAdmin ? "private-area" : "login",
//         // icon: <RiAccountPinCircleLine />
//       },
//     ],
//   },
// ];

  let menuItems;

  // if (isAdmin) {
  //   menuItems = adminMenuItems;
  // } else if (isUser) {
  //   menuItems = userMenuItems;
  // } else {
  //   menuItems = notMenuItems;
  // }
  menuItems = notMenuItems;
  console.log(menuItems, "menuItems");

  // useEffect(() => {//בשביל זהיציאה מכל הפרטים באמת תקרה ביציאה 
  //   if (isSuccess) {
  //     navigate("/")
  //   }
  // }, [isSuccess, navigate])
  // const logOutClick = () => {//פונציקה כדי להפעיל את היציאה 
  //   logout()
  // }
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
      {/* <button onClick={logOutClick} className="side-bar-logout">
        <MdLogout />
        יציאה
      </button> */}
    </div>
  )
}

export default SitdeBar