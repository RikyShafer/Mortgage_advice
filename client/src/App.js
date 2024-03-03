
// // import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
// import Layout from './common/Layout';
// import Home from './Home';  // Use 'Home' with a capital 'H'
// // import PresentationOfFillingOutTheQuestionnaire from './Registration questionnaire/for the customer/PresentationofFillingOutTheQuestionnaire';
// // import PresentationOfFillingOutTheQuestionnaireManger from './Registration questionnaire/for the manager/PresentationofFillingOutTheQuestionnaire';
// // import FillingQuestionnaireIsNew from './Registration questionnaire/for the customer/FillingQuestionnaireIsNew';
// // import Entrance from './enrollment/Entrance';
// // import FillingNew from './enrollment/FillingNew';
// import UserRegisterAdd from "./features/auth/registeration/UserRegisterAdd";
// import LoginPage from "./features/auth/login/LoginPage";
// import AddQuestionnaire from "./features/questionnaire/add/AddQuestionnaire";
// import ProcessCompletionMessage from "./features/auth/registeration/ProcessCompletionMessage";
// import UserRegisterList from "./features/userRegister/list/UserRegisterList";
// import UserRegisterPut from "./features/userRegister/put/UserRegisterPut";
// import UserQuestionnaireList from "./features/questionnaire/list/UserQuestionnaireList";
// // import DashLayout from "./components/layout/dash/DashLayout";
// // import SiteLayout from "./components/layout/site/SiteLayout";

// // function App() {
// //   return (

// //       <div className="App">
// //         <Router>
// //           <Routes>
// //             <Route path='/' element={<Layout />}>  
// //                <Route path="/login" element={<LoginPage />} />
// //                <Route path="/add" element={<AddQuestionnaire />} > 
// //                  <Route path="/message" element={<Message />} />
// //                  </Route>
// //                {/* <Route path='/add' element={<FillingQuestionnaireIsNew />} /> */}

// //               {/* <Route path='/get' element={<PresentationOfFillingOutTheQuestionnaire />} />
// //               <Route path='/add' element={<FillingQuestionnaireIsNew />} />
// //               <Route path='/getinManeger' element={<PresentationOfFillingOutTheQuestionnaireManger />} />
// //               <Route path='/Entrance' element={<Entrance />} />
// //               <Route path='/FillingNew' element={<FillingNew />} /> */}
// //               <Route path="/signup" element={<UserRegisterAdd />} />
// //               <Route index element={<Home />} />

// //             </Route>
// //           </Routes>
// //         </Router>
// //       </div>

// //   );
// // }

// // export default App;


// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path='/' element={<Layout />}>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/add" element={<AddQuestionnaire />}/>
//             <Route path="/questionnaireList" element={<UserQuestionnaireList />}/>
//             <Route path="/signup" element={<UserRegisterAdd />} />
//             <Route path="/message" element={<ProcessCompletionMessage />}/>
//             {/* <Route path="/registerList" element={<UserRegisterList />}>
//             <Route path='/registerList/:id' element={<UserRegisterPut />} />
//             </Route> */}
//               <Route path="/registerList" element={<UserRegisterList />} />
//               <Route path="/registerList/:userId" element={<UserRegisterPut />} />
//             <Route index element={<Home />} />
//           </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path='/' element={<SiteLayout />}>
// //           <Route index element={<h1> Site</h1>} />
// //           <Route path="/login" element={<LoginPage />} />
// //           {/* <Route element={<PersistsLogin/> }  >  */}
// //           <Route path="/dash" element={<DashLayout />}>
// //             <Route index element={<h1> DashBoard</h1>} />

// //           </Route>


// //         </Route>

// //       </Routes >
// //     </Router >
// //   );
// // }

// // export default App;


import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
// import SiteLayout from "./components/layout/site/SiteLayout"
import DashLayout from "./components/layout/dash/DashLayout";
import RequiireAuth from "./features/auth/RequiireAuth";

 import LoginPage from "./features/auth/login/LoginPage";
import UserRegisterList from "./features/userRegister/list/UserRegisterList";
import UserRegisterPut from "./features/userRegister/put/UserRegisterPut";
import UserRegisterAdd from "./features/auth/registeration/UserRegisterAdd";
import AddQuestionnaire from "./features/questionnaire/add/AddQuestionnaire";

function App() {
  return (
    <Router>
      <Routes>

          <Route path='/' element={<DashLayout />}>
            <Route index element={<h1> Dashboard</h1>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<UserRegisterAdd />} />

            <Route element={<RequiireAuth allowRoles={"ADMIN"} />} >
                <Route path="registerList" element={<UserRegisterList />}>
                  <Route path=':id' element={<UserRegisterPut />} />
                </Route>
                <Route path="/add" element={<AddQuestionnaire />}/>
              {/* <Route path="registerList" element={<UserRegisterList />}>
                <Route path=':id' element={<UserRegisterPut />} />
              </Route> */}
            </Route>

          </Route>

      </Routes>
    </Router>
  );
}

export default App;
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<SiteLayout />}>
//           <Route index element={<h1> Sith</h1>} />

//           <Route path='/dash' element={<DashLayout />}>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<UserRegisterAdd />}/>
//               <Route index element={<h1> Dashboard</h1>} />
//               <Route element={<RequiireAuth allowRoles={"ADMIN"} />} >
//                 <Route path="registerList" element={<UserRegisterList />}>
//                   {/* Relative route path */}
//                   <Route path=':id' element={<UserRegisterPut />} />
//                 </Route>

//               </Route>
//             </Route>
//           <Route element={<RequiireAuth allowRoles={["ADMIN", "USER"]} />} >
//             <Route path='/dash' element={<DashLayout />}>
//               <Route index element={<h1> Dashboard</h1>} />
//               <Route element={<RequiireAuth allowRoles={"ADMIN"} />} >
//                 <Route path="registerList" element={<UserRegisterList />}>
//                   {/* Relative route path */}
//                   <Route path=':id' element={<UserRegisterPut />} />
//                 </Route>
//               </Route>
//             </Route>
//           </Route>
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

/* 
// function App() {
//   return (

//     <Router>
//       <Routes>

//           <Route element={<RequiireAuth allowRoles={["ADMIN", "USER"]} />} >
//             <Route path='/' element={<DashLayout />}>
//               <Route index element={<h1> Dashboard</h1>} />
//               <Route element={<RequiireAuth allowRoles={"ADMIN"} />} >
//                         <Route path="/registerList" element={<UserRegisterList />}>
//                         <Route path='/registerList/:id' element={<UserRegisterPut />} />
  
//                 </Route>
//               </Route>
//             </Route>
//           </Route>
//       </Routes>
//     </Router>

//   );
// }

// export default App; */