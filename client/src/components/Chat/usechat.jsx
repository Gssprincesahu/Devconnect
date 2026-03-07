import { useEffect , useState, useRef } from "react";
import socketIOClient from "socket.io-client";
const usechat = () => {
    const socketRef = useRef();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socketRef.current = socketIOClient("http://localhost:5000");

        socketRef.current.on("mostRecentmessage", (mostRecentmessage) => {
            setMessages([...mostRecentmessage]);
        });

        socketRef.current.on("newChatMessage", ({user_name , avatar, message_text}) => {
            setMessages(messages => [...messages, {user_name: user_name , avatar:avatar, message_text: message_text}]);
        });
        return () => {
            socketRef.current.disconnect();
        }
    }, []);

    const sendMessage = (message) => {
        socketRef.current.emit("newChatMessage", message);
    }

    return { messages, sendMessage };
}

export default usechat;