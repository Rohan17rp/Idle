import React, { useState, useEffect } from "react";

// SERVICES
import chatService from './services/chatService';

function App() {
  const [chats, setChats] = useState(null);

  useEffect(() => {
    if(!chats) {
      getChats();
    }
  })

  const getChats = async () => {
    let res = await chatService.getAll();
    console.log(res);
    setChats(res);
  }

  const renderChat = chat => {
    return (
      <li key={chat._id} className="list__item chat">
        <h3 className="chat__name">{chat.name}</h3>
        <p className="chat__description">{chat.message}</p>
      </li>
    );
  };

  return (
    <div className="App">
      <ul className="list">
        {(chats && chats.length > 0) ? (
          chats.map(chat => renderChat(chat))
        ) : (
          <p>No chats found</p>
        )}
      </ul>
      <form action= '/' method="POST" >
        <input type="text" id="message" name="message" placeholder="message"></input>
        <button type="submit">Send</button>
      </form>
    </div>

  );
}

export default App;
