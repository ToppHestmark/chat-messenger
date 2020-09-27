import { Button, Input, InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import { FormControl } from '@material-ui/core';
import Message from './components/Message';
import db from './firebase';
import firebase  from 'firebase';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('')

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
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
      <h1>Hello my ninja warriors</h1>
      <h2>Welcome {username} </h2>

      <form>
      <FormControl>
        <InputLabel>Enter a message...</InputLabel>
        <Input 
          value={input} 
          onChange={event => setInput(event.target.value)} />
        <Button 
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit" 
          onClick={sendMessage}>
          Send Message
        </Button>
      </FormControl>
      </form>

      {
        messages.map(message => (
          <Message 
            username={username}
            message={message} />
        ))
      }
    </div>
  );
}

export default App;
