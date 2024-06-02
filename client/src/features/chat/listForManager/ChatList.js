
import React, { useState, useEffect } from 'react';
import { useViewInChatToADMINQuery } from '../ChatApiSlice';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import { useGetAllUsersQuery } from '../../userRegister/UserRegisterApiSlice';
import ChatAdd from '../add/ChatAdd';
import ContinueChatting from '../ContinueChatting/ContinueChatting';
import './chat-list.css';
import DeletingMessage from '../DeletingMessage/DeletingMessage';
import { formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';

const ChatList = () => {
    const [showChatAdd, setShowChatAdd] = useState(false);
    const { data: chat, isLoading, isError, error } = useViewInChatToADMINQuery();
    const { data: users, isLoading: isUserLoading, isError: isUserError, error: userError } = useGetAllUsersQuery();
    const { firstName, roles } = useAuth();
    const token = useSelector((state) => state.auth.token); // Get token from Redux store
    console.log(roles);
    console.log(roles.includes("ADMIN"));
    console.log("הצליחה להגיע לדף הצאט ");

    console.log(token);
    useEffect(() => {
        if (token) {
            console.log("Fetching users...");
        }
    }, [token]);

    if (isLoading || isUserLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }

    if (isUserError) {
        return <h2>Error: {userError.message}</h2>;
    }

    const formatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const now = new Date();
        const diffMs = now - messageDate;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 60) {
            return `${diffMins} דקות`;
        } else {
            const hours = messageDate.getHours().toString().padStart(2, '0');
            const minutes = messageDate.getMinutes().toString().padStart(2, '0');
            const distanceInWords = formatDistanceToNow(messageDate, { addSuffix: true, locale: he });

            return `${distanceInWords} בשעה ${hours}:${minutes}`;
        }
    };

    let chatsData = chat?.data || [];

    return (
        <div className="chat-container">
            <div className="messages-list-title">תצוגה של התכתבות עם כל הלקוחות</div>
            <button onClick={() => setShowChatAdd(!showChatAdd)} className="new-conversation-button">
                {showChatAdd ? 'סגור התחלת שיחה חדשה' : 'התחל שיחה חדשה'}
            </button>
            {showChatAdd && <ChatAdd />}
            <div className="messages-list">
                {chatsData.map((chat) => {
                    const receiver = users.data.find(user => user._id === chat.user2);

                    return (
                        <div className="messagesMap" key={chat._id}>
                            <h1>השולח- {firstName}</h1>
                            <p>המקבל- {receiver ? receiver.firstName + ' ' + receiver.lastName : "Unknown"}</p>
                            <div>
                                {chat.messages.map((m, index) => (
                                    <div key={index}>
                                        <h5 className={m.sender === chat.user2 ? 'receiver-Timestamp' : 'sender-Timestamp'}>{formatTimestamp(m.timestamp)}</h5>
                                        <p className={m.sender === chat.user2 ? 'receiver-message' : 'sender-message'}>
                                            {m.text}
                                            {m.sender === chat.user1 && (
                                                <DeletingMessage conversationId={chat._id} messageId={m._id} />
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <ContinueChatting conversationId={chat._id} className={"Manager"} onMessageSent={() => console.log('Message sent!')} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatList;
//גירסא נוספת 1 
// import React, { useState, useEffect } from 'react';
// import { useViewInChatToADMINQuery } from '../ChatApiSlice';
// import { useSelector } from 'react-redux';
// import { selectToken } from '../authSlice';
// import useAuth from '../../../hooks/useAuth';
// import { useGetAllUsersQuery } from '../../userRegister/UserRegisterApiSlice';
// import ChatAdd from '../add/ChatAdd';
// import ContinueChatting from '../ContinueChatting/ContinueChatting';
// import './chat-list.css';
// import DeletingMessage from '../DeletingMessage/DeletingMessage';

// const ChatList = () => {
//     const [showChatAdd, setShowChatAdd] = useState(false);
//     const { data: chat, isLoading, isError, error } = useViewInChatToADMINQuery();
//     const { data: users, isLoading: isUserLoading, isError: isUserError, error: userError } = useGetAllUsersQuery();
//     const token = useSelector(selectToken); // Get token from Redux store
//     const { firstName } = useAuth();

//     useEffect(() => {
//         if (token) {
//             console.log("Fetching users...");
//         }
//     }, [token]);

  

//     if (isLoading || isUserLoading) {
//         return <h1>Loading...</h1>;
//     }

//     if (isError) {
//         return <h2>Error: {error.message}</h2>;
//     }

//     if (isUserError) {
//         return <h2>Error: {userError.message}</h2>;
//     }

//     const formatTimestamp = (timestamp) => {
//         const messageDate = new Date(timestamp);
//         const now = new Date();
//         const diffMs = now - messageDate;
//         const diffMins = Math.floor(diffMs / 60000);

//         if (diffMins < 60) {
//             return `${diffMins} דקות`;
//         } else {
//             const hours = messageDate.getHours().toString().padStart(2, '0');
//             const minutes = messageDate.getMinutes().toString().padStart(2, '0');
//             return `${hours}:${minutes}`;
//         }
//     };

//     let chatsData = chat?.data || [];

//     return (
//         <div className="chat-container">
//             <div className="messages-list-title">תצוגה של התכתבות עם כל הלקוחות</div>
//             <button onClick={() => setShowChatAdd(!showChatAdd)} className="new-conversation-button">
//                 {showChatAdd ? 'סגור התחלת שיחה חדשה' : 'התחל שיחה חדשה'}
//             </button>
//             {showChatAdd && <ChatAdd />}
//             <div className="messages-list">
//                 {chatsData.map((chat) => {
//                     const receiver = users.data.find(user => user._id === chat.user2);

//                     return (
//                         <div className="messagesMap" key={chat._id}>
//                             <h1>השולח- {firstName}</h1>
//                             <p>המקבל- {receiver ? receiver.firstName + ' ' + receiver.lastName : "Unknown"}</p>
//                             <div>
//                                 {chat.messages.map((m, index) => (
//                                     <div key={index}>
//                                        <h5 className={m.sender === chat.user2 ? 'receiver-Timestamp' : 'sender-Timestamp'} >{formatTimestamp(m.timestamp)}</h5>

//                                         <p className={m.sender === chat.user2 ? 'receiver-message' : 'sender-message'}>{m.text}                                         <DeletingMessage
//                                             conversationId={chat._id}
//                                             messageId={m._id}
//                                         /> </p>

//                                     </div>
//                                 ))}
//                             </div>
//                             <ContinueChatting conversationId={chat._id} onMessageSent={() => console.log('Message sent!')} />
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default ChatList;

//גירסא נוספת 2
// import React, { useState, useEffect } from 'react';
// import { useViewInChatToADMINQuery } from '../ChatApiSlice';
// import { useSelector } from 'react-redux';
// import { selectToken } from '../authSlice';  // Adjust this path according to your project structure
// import useAuth from '../../../hooks/useAuth';
// import { useGetAllUsersQuery } from '../../userRegister/UserRegisterApiSlice';
// import ChatAdd from '../add/ChatAdd';
// import ContinueChatting from '../ContinueChatting/ContinueChatting';
// import './chat-list.css';
// import DeletingMessage from '../DeletingMessage/DeletingMessage';
// import { useNavigate } from 'react-router-dom';

// const ChatList = () => {
//     const [showChatAdd, setShowChatAdd] = useState(false);
//     const { data: chat, isLoading, isError, error } = useViewInChatToADMINQuery();
//     const { data: users, isLoading: isUserLoading, isError: isUserError, error: userError } = useGetAllUsersQuery();
//     const token = useSelector((state) => state.auth.token);
//     const { firstName } = useAuth();
//     const navigate = useNavigate();
// console.log(token+"c");
//     // useEffect(() => {
//     //     if (token) {
//     //         navigate('/login');  // Redirect to login if no token
//     //     } else {
//     //         console.log("Fetching users...");
//     //     }
//     // }, [token, navigate]);
//     useEffect(() => {
//         if (token) {
//             console.log("Fetching users...");
//         }
//     }, [token]);

//     if (isLoading || isUserLoading) {
//         return <h1>Loading...</h1>;
//     }

//     if (isError) {
//         return <h2>Error: {error.message}</h2>;
//     }

//     if (isUserError) {
//         return <h2>Error: {userError.message}</h2>;
//     }

//     const formatTimestamp = (timestamp) => {
//         const messageDate = new Date(timestamp);
//         const now = new Date();
//         const diffMs = now - messageDate;
//         const diffMins = Math.floor(diffMs / 60000);

//         if (diffMins < 60) {
//             return `${diffMins} דקות`;
//         } else {
//             const hours = messageDate.getHours().toString().padStart(2, '0');
//             const minutes = messageDate.getMinutes().toString().padStart(2, '0');
//             return `${hours}:${minutes}`;
//         }
//     };

//     let chatsData = chat?.data || [];

//     return (
//         <div className="chat-container">
//             <div className="messages-list-title">תצוגה של התכתבות עם כל הלקוחות</div>
//             <button onClick={() => setShowChatAdd(!showChatAdd)} className="new-conversation-button">
//                 {showChatAdd ? 'סגור התחלת שיחה חדשה' : 'התחל שיחה חדשה'}
//             </button>
//             {showChatAdd && <ChatAdd />}
//             <div className="messages-list">
//                 {chatsData.map((chat) => {
//                     const receiver = users.data.find(user => user._id === chat.user2);

//                     return (
//                         <div className="messagesMap" key={chat._id}>
//                             <h1>השולח- {firstName}</h1>
//                             <p>המקבל- {receiver ? receiver.firstName + ' ' + receiver.lastName : "Unknown"}</p>
//                             <div>
//                                 {chat.messages.map((m, index) => (
//                                     <div key={index}>
//                                        <h5 className={m.sender === chat.user2 ? 'receiver-Timestamp' : 'sender-Timestamp'}>{formatTimestamp(m.timestamp)}</h5>
//                                         <p className={m.sender === chat.user2 ? 'receiver-message' : 'sender-message'}>
//                                             {m.text} 
//                                             <DeletingMessage conversationId={chat._id} messageId={m._id} />
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                             <ContinueChatting conversationId={chat._id} onMessageSent={() => console.log('Message sent!')} />
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default ChatList;
