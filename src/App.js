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
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Facebook_Messenger_2019.png" 
      alt=""/>
      <h1>Hello my ninja warriors</h1>
      <h2>Welcome {username} </h2>

      <form className="app__form">
      <FormControl>
        <InputLabel>Enter a message...</InputLabel>
        <Input 
          value={input} 
          onChange={event => setInput(event.target.value)} />

          <IconButton 
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
