import react from "react";
import Chat from "./components/Chat/Chat.jsx";
import Loginform from "./components/Login/Loginform.jsx";

export default function App() {
    const [userData, setUserData] = react.useState("");
    if(!userData) {
        return <Loginform setUserData={setUserData} />
    }
    return (
        <Chat CurrentuserData={userData} />
    )
}

