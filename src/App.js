import { Button, Input, InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import { FormControl } from '@material-ui/core';
import Message from './components/Message';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {username: "Admirchakee", text: "Hello"},
    {username: "Eframos", text: "Hola"}
  ]);
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(prompt('Please enter your name'))
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, {username: username, text: input}]);
    setInput('')
  }

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
