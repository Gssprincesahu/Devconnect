import React from "react";

export default function Loader({ type = "threeBounce" }) {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.32s]"></div>
                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.16s]"></div>
                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
            </div>
        </div>
    );
}
