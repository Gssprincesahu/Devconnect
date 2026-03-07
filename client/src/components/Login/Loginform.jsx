import react, { useState, useRef } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";


export default function Loginform({ setUserData }) {
    const [Loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const userNameInput = useRef("");
    const ImageInput = useRef("");

    const enterChatclick = async (e) => {
        e.preventDefault();
        setUserName(userNameInput.current.value, ImageInput.current.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserName(userNameInput.current.value, ImageInput.current.files[0]);
    }

    const sendData = async (userData) => {
        return await axios.post("http://localhost:5000/api/user", userData);
    }

    const setUserName = async (username, imageFile) => {
        if (!username) {
            alert("Please enter a username");
            return;
        }
        
        setLoading(true);
        
        try {
            // Save user to MongoDB with avatar (base64 if exists)
            const response = await sendData({ 
                user_name: username, 
                user_avatar: imagePreview || null 
            });
            
            if (response.data.success) {
                // After successful MongoDB save, redirect to chat
                setUserData({
                    user_id: response.data.data.user_id,
                    user_name: response.data.data.user_name,
                    user_avatar: response.data.data.user_avatar
                });
            } else {
                alert("Failed to register user");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Failed to save user data: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    }

    return (Loading ? <Loader type="threeBounce" /> : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Enter Chat</h2>
                
                <div className="mb-4">
                    <label htmlFor="chat-username" className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                    </label>
                    <input
                        id="chat-username"
                        type="text"
                        placeholder="Enter Username"
                        ref={userNameInput}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={event => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                setUserName(event.target.value, ImageInput.current.files[0]);
                            }
                        }}
                    />
                </div>

                <div className="mb-6">
                    <label className="block">
                        <input
                            style={{ display: "none" }}
                            id="upload-avatar"
                            name="upload-avatar"
                            ref={ImageInput}
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg"
                            onChange={handleImageChange}
                        />
                        <span className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg cursor-pointer hover:bg-purple-600 transition">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Upload avatar
                        </span>
                        {imagePreview && (
                  <img src = {imagePreview} alt="Preview" className='mt-3 max-h-48 rounded-lg object-cover border border-gray-300' />
                )}
                    </label>
                </div>

                <button
                    type="submit"
                    onClick={enterChatclick}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                >
                    Enter Chat
                </button>
            </form>
        </div>
    ));
};