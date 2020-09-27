import { Button, Input, InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import { FormControl } from '@material-ui/core';
import Message from './components/Message';
import db from './firebase';
import firebase  from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('')

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        message: doc.data(),
        id: doc.id
      })))
    })
  }, [])

  useEffect(() => {
    setUsername(prompt('Please enter your name'))
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages')
    .add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('')
  };

  return (
    <div className="app">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Not_official_WeChat_logo.png" 
      alt=""/>
      <h1>Hello friends 🧀</h1>
      <h3>Welcome {username} </h3>

      <form className="app__form">
      <FormControl className="app__formControl">
        <Input 
          className="app__input"
          value={input} 
          onChange={event => setInput(event.target.value)} 
          placeholder="Enter a message"
          />
        <IconButton 
          className="app__iconButton"
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit" 
          onClick={sendMessage}
          >
          <SendIcon />
        </IconButton>
      </FormControl>
      </form>
      
      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message 
              key={id}
              username={username}
              message={message} />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
