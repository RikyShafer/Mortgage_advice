
// import React, { useEffect, useState } from 'react';
import React, { useEffect } from 'react';
import './list-for-user.css';
import { useViewInChatQuery } from '../ChatApiSlice';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import DeletingMessage from '../DeletingMessage/DeletingMessage';
import ContinueChatting from '../ContinueChatting/ContinueChatting';
import { formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';
import { useSendLogoutMutation } from '../../auth/authApiSlice';
import { useNavigate } from 'react-router-dom';

const ListForUser = () => {
    const [logout] = useSendLogoutMutation();
    const navigate = useNavigate();
    // const [page, setPage] = useState(1);
    const page = 1;
    const limit = 4;
    // const { data: chat, isLoading, isError, error, refetch } = useViewInChatQuery({ page, limit });
    const { data: chat, isLoading, isError, error } = useViewInChatQuery({ page, limit });

    const { firstName,lastName,active } = useAuth(); 
    const token = useSelector((state) => state.auth.token);



    useEffect(() => {
        if (token) {
            console.log("Fetching users...");
        }
        const handleLogout = async () => {
            if (!active) {
                // If active is false, navigate away from personal area
                await logout();
                // After logout, navigate away from personal area
                navigate("/inactive-account");
            }
        };
        handleLogout();
    }, [token,active,logout,navigate]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>;
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

    // const handlePageChange = (newPage) => {
    //     setPage(newPage);
    //     refetch();
    // };

    let chatsData = chat || [];

    if (!chatsData.length) {
        return <h2>No conversations found.</h2>;
    }

    console.log(chatsData);

    return (
        <div className="chat-containerU">
            <div className="messages-list-titleU">ההתכתבות שלך עם שפר יועץ משכנאות      </div>
            <div className="messages-listU">
                {chatsData.map((chat) => {
                    return (
                        <div className="messagesMapU" key={chat._id}>
                            <h1>השולח- {firstName } {lastName}</h1>
                            <p> המקבל - {'שפר יעוץ משכנאות'}</p>

                            <div>
                                {chat.messages.map((m, index) => (
                                    <div key={index}>
                                        <h5 className={m.sender._id === chat.user2._id ? ' receiver-TimestampU' : 'sender-TimestampU'}>{formatTimestamp(m.timestamp)}</h5>
                                        <p className={m.sender._id === chat.user2._id ? 'receiver-messageU' : 'sender-messageU'}>
                                        {m.text}
                                        {m.sender._id === chat.user2._id && (
                                            <DeletingMessage conversationId={chat._id} messageId={m._id} />
                                        )}
                                    </p>
                                    </div>
                                ))}
                            </div> 
                            <ContinueChatting conversationId={chat._id} className={"user"} onMessageSent={() => console.log('Message sent!')} />
                        </div>
                    );
                })}
            </div>
            {/* <div className="paginationU">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                <span>Page {page}</span>
                <button onClick={() => handlePageChange(page + 1)}>Next</button>
            </div> */}
        </div>
    );
};

export default ListForUser;


//יגרסא 1
// import React, { useEffect, useState } from 'react';
// import './list-for-user.css';
// import { useViewInChatQuery } from '../ChatApiSlice';
// import { useSelector } from 'react-redux';
// import useAuth from '../../../hooks/useAuth';
// import DeletingMessage from '../DeletingMessage/DeletingMessage';
// import ContinueChatting from '../ContinueChatting/ContinueChatting';
// import { formatDistanceToNow } from 'date-fns';
// import { he } from 'date-fns/locale';

// const ListForUser = () => {
//     const [page, setPage] = useState(1);
//     const limit = 4;
//     const { data: chat, isLoading, isError, error, refetch } = useViewInChatQuery({ page, limit });
//     const [userIds, setUserIds] = useState([]);
//     const {  id: currentUserId } = useAuth(); // Assuming `id` is the user's ID
//     const token = useSelector((state) => state.auth.token);

//     useEffect(() => {
//         if (chat) {
//             const ids =  chat[0].user1._id;
//             console.log(ids);
//             setUserIds(ids);
//         }
//     }, [chat, currentUserId]);


//     useEffect(() => {
//         if (token) {
//             console.log("Fetching users...");
//         }
//     }, [token]);


//     if (isLoading ) {
//         return <h1>Loading...</h1>;
//     }

//     if (isError) {
//         return <h2>Error1: {error.message}</h2>;
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
//             const distanceInWords = formatDistanceToNow(messageDate, { addSuffix: true, locale: he });

//             return `${distanceInWords} בשעה ${hours}:${minutes}`;
//         }
//     };

//     const handlePageChange = (newPage) => {
//         setPage(newPage);
//         refetch();
//     };

//     let chatsData = chat || [];

//     if (!chatsData.length) {
//         return <h2>No conversations found.</h2>;
//     }

//     return (
//         <div className="chat-container">
//             <div className="messages-list-title">תצוגה של התכתבות עם כל הלקוחות</div>
//             <div className="messages-list">
//                 {chatsData.map((chat, index) => {
//                     const receiver = chat.user1._id === currentUserId ? chat.user2 : chat.user1;
//                     const user =  null;

//                     return (
//                         <div className="messagesMap" key={chat._id}>
//                             <p>השולח- {user ? user.firstName + ' ' + user.lastName : "Unknown"}</p>
//                             <h1> המקבל - {'שפר יעוץ משכנאות'}</h1>

//                             <div>
//                                 {chat.messages.map((m, index) => (
//                                     <div key={index}>
//                                         <h5 className={m.sender === currentUserId ? 'sender-Timestamp' : 'receiver-Timestamp'}>{formatTimestamp(m.timestamp)}</h5>
//                                         <p className={m.sender === currentUserId ? 'sender-message' : 'receiver-message'}>
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
//             <div className="pagination">
//                 <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
//                 <span>Page {page}</span>
//                 <button onClick={() => handlePageChange(page + 1)}>Next</button>
//             </div>
//         </div>
//     );
// };

// export default ListForUser;
//גירסא 2  
// import React, { useEffect, useState } from 'react';
// import './list-for-user.css';
// import { useViewInChatQuery } from '../ChatApiSlice';
//  import { useGetUserByIdInBodyQuery } from '../../userRegister/UserRegisterApiSlice';

// import { useSelector } from 'react-redux';
// import useAuth from '../../../hooks/useAuth';
// import DeletingMessage from '../DeletingMessage/DeletingMessage';
// import ContinueChatting from '../ContinueChatting/ContinueChatting';
// import { formatDistanceToNow } from 'date-fns';
// import { he } from 'date-fns/locale';

// const ListForUser = () => {
//     const [page, setPage] = useState(1);
//     const limit = 4;
//     const { data: chat, isLoading, isError, error, refetch } = useViewInChatQuery({ page, limit });
//     const { data: users, isLoading: isUserLoading, isError: isUserError, error: userError } = useGetUserByIdInBodyQuery(chat[0].user1._id);

//     const { firstName, id: currentUserId } = useAuth(); // Assuming `id` is the user's ID
//     const token = useSelector((state) => state.auth.token);
//     useEffect(() => {
//         if (token) {
//             console.log("Fetching users...");
//         }
//     }, [token]);

//     useEffect(() => {
//         if (chat) {
//             console.log("Chat data:", chat);
//         }
//     }, [chat]);

//     useEffect(() => {
//         if (error) {
//             console.error("Error fetching chat data:", error);
//         }
//     }, [error]);

 
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
//             const distanceInWords = formatDistanceToNow(messageDate, { addSuffix: true, locale: he });

//             return `${distanceInWords} בשעה ${hours}:${minutes}`;
//         }
//     };

//     const handlePageChange = (newPage) => {
//         setPage(newPage);
//         refetch();
//     };

//     let chatsData = chat || [];

//     if (!chatsData.length) {
//         return <h2>No conversations found.</h2>;
//     }

//     return (
//         <div className="chat-container">
//             <div className="messages-list-title">תצוגה של התכתבות עם כל הלקוחות</div>
//             <div className="messages-list">
//                 {chatsData.map((chat) => {

//                     return (
//                         <div className="messagesMap" key={chat._id}>
//                             <h1>השולח- {firstName}</h1>
//                               <p>המקבל- {users ? users.firstName + ' ' + users.lastName : "Unknown"}</p>
//                             <div>
//                                 {chat.messages.map((m, index) => (
//                                     <div key={index}>
//                                         <h5 className={m.sender === currentUserId ? 'sender-Timestamp' : 'receiver-Timestamp'}>{formatTimestamp(m.timestamp)}</h5>
//                                         <p className={m.sender === currentUserId ? 'sender-message' : 'receiver-message'}>
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
//             <div className="pagination">
//                 <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
//                 <span>Page {page}</span>
//                 <button onClick={() => handlePageChange(page + 1)}>Next</button>
//             </div>
//         </div>
//     );
// };

// export default ListForUser;
//גירסא 3 
// import React, { useEffect, useState } from 'react';
// import './list-for-user.css';
// import { useViewInChatQuery } from '../ChatApiSlice';
// import { useSelector } from 'react-redux';
// import useAuth from '../../../hooks/useAuth';
// import DeletingMessage from '../DeletingMessage/DeletingMessage';
// import ContinueChatting from '../ContinueChatting/ContinueChatting';
// import { formatDistanceToNow } from 'date-fns';
// import { he } from 'date-fns/locale';

// const ListForUser = () => {
//     const [page, setPage] = useState(1);
//     const limit = 4;
//     const { data: chat, isLoading, isError, error, refetch } = useViewInChatQuery({ page, limit });
//     const { firstName } = useAuth();
//     const token = useSelector((state) => state.auth.token);

//     useEffect(() => {
//         if (token) {
//             console.log("Fetching users...");
//         }
//     }, [token]);

//     useEffect(() => {
//         if (chat) {
//             console.log("Chat data:", chat);
//         }
//     }, [chat]);

//     useEffect(() => {
//         if (error) {
//             console.error("Error fetching chat data:", error);
//         }
//     }, [error]);

//     if (isLoading ) {
//         return <h1>Loading...</h1>;
//     }

//     if (isError) {
//         return <h2>Error: {error.message}</h2>;
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
//             const distanceInWords = formatDistanceToNow(messageDate, { addSuffix: true, locale: he });

//             return `${distanceInWords} בשעה ${hours}:${minutes}`;
//         }
//     };

//     const handlePageChange = (newPage) => {
//         setPage(newPage);
//         refetch();
//     };

//     let chatsData = chat || [];

//     if (!chatsData.length) {
//         return <h2>No conversations found.</h2>;
//     }
//     const receiver="65de1994832cae84d5ed732d"
//     return (
//         <div className="chat-container">
//             <div className="messages-list-title">תצוגה של התכתבות עם כל הלקוחות</div>
//             <div className="messages-list">
//                 {chatsData.map((chat) => {
//                     // const receiver = users?.data?.find(user => user._id === chat.user2);
//                     // console.log(receiver);
//                     return (
//                         <div className="messagesMap" key={chat._id}>
//                             <h1>השולח- {firstName}</h1>
//                             <p>המקבל- {receiver ? receiver.firstName + ' ' + receiver.lastName : "Unknown"}</p>
//                             <div>
//                                 {chat.messages.map((m, index) => (
//                                     <div key={index}>
//                                         <h5 className={m.sender === chat.user2 ? 'receiver-Timestamp' : 'sender-Timestamp'}>{formatTimestamp(m.timestamp)}</h5>
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
//             <div className="pagination">
//                 <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
//                 <span>Page {page}</span>
//                 <button onClick={() => handlePageChange(page + 1)}>Next</button>
//             </div>
//         </div>
//     );
// };

// export default ListForUser;
