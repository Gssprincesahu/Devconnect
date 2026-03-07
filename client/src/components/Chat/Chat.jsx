import Message from "./Message/Message";
import MessageBox from "./MessageBox/Messagebox";
import usechat from "./usechat";

export default function Chat({ CurrentuserData }) {
     const {messages, sendMessage} = usechat();
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-1 overflow-y-auto p-4">
                <Message
                    messages={messages}
                />
            </div>
            <div className="p-4">
                <MessageBox
                    userData={CurrentuserData}
                    sendMessage={(message) => {
                        sendMessage(message)
                    }}
                />
            </div>
        </div>
    )
}