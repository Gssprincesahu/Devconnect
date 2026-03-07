import React from "react";

export default function Message({ messages }) {
    if (!messages || messages.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-center text-gray-500">
                No messages yet. Start the conversation!
            </div>
        );
    }
    
    return (
        <ul className="w-full max-w-4xl mx-auto space-y-4">
            {messages.map((messages, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-start space-x-4">
                    {messages.avatar ? (
                        <img
                            src={messages.avatar}
                            alt={messages.user_name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                            {messages.user_name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    {/*Message Content */}
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            {messages.user_name}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                            {messages.message_text}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    )
}