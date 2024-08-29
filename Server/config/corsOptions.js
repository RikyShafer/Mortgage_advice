
// const whitelist = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "http://localhost:3002",
//   "http://localhost:3003",
//   "http://localhost:3004",

// ];

// const corsOptions = {
//   origin:  (origin, callback) => {
//       if (whitelist.indexOf(origin) !== -1 || !origin) { 
//           callback(null, true);
//       } else {
//           callback(new Error("Not allowed by CORS"));
//       }
//   },
// };

// module.exports = corsOptions;

// const whitelist = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "http://localhost:3002",
//   "http://localhost:3003",
//   "http://localhost:3297", // Add this line
// ];

// const corsOptions = {
//   origin:  (origin, callback) => {
//       if (whitelist.indexOf(origin) !== -1 || !origin) {
//           callback(null, true);
//       } else {
//           callback(new Error("Not allowed by CORS"));
//       }
//   },
//   credentials: true, // Add this line
// };

// module.exports = corsOptions;

// module.exports = corsOptions;

const whitelist = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3297",
    "https://mortgage-advice.onrender.com",
    "http://shpr-y-vts-mshkntvt.onrender.com",
    "https://shpr-y-vts-mshkntvt.onrender.com",
    "https://mortgage-advice-1.onrender.com",
    "http://mortgage-advice-1.onrender.com",
    "http://mortgage-advice-1.onrender.com/api/auth/registeration",
];



const corsOptions = {
    origin:  (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Add this line
  optionsSuccssStatus:200
};
  
module.exports = corsOptions;