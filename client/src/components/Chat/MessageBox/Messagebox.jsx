import { useState } from "react";

export default function MessageBox({ userData, sendMessage }) {
    const [message, setMessage] = useState("");

    const sendMessageClick = () => {
        if (message.trim() === "") return;

        const messageData = {
            user_name: userData.user_name,
            avatar: userData.user_avatar,
            message_text: message
        }
        sendMessage(messageData);
        setMessage("");
    };
    return (
        <form
            className="w-full max-w-4xl mx-auto flex flex-col gap-3 p-4 bg-white shadow-lg rounded-xl"
            autoComplete="off"
            onSubmit={(e) => {
                e.preventDefault();
                sendMessageClick();
            }}
        >
            <textarea
                placeholder="Write your message here..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessageClick();
                    }
                }}
            />
            <button
                type="submit"
                className="self-end px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
                Send
            </button>
        </form>
    )
}