import React,{ useContext } from 'react';
import ReactDom from "react-dom";
import "./styles.css";

const AppContext = React.createContext({});

const NavBar = () => {
    const { username } = useContext(AppContext);
    return(
        <div className="navbar">
            <p>AweasomeSite</p>
            <p>{username}</p>
        </div>
    )
}


const Messages = () => {
    const { username } = useContext(AppContext)
    return (
        <div className="messages">
            <h1>Messages</h1>
            <p>1 messages for {username}</p>
            <p className="message">useContext is awesome！</p>
        </div>
    )
} 

const UseContextTest = () => {
    return (
        <AppContext.Provider value={{username:"superawesome"}}>
            <div className="App">
                <NavBar />
                <Messages />
            </div>
        </AppContext.Provider>
    )
}

export default UseContextTest;