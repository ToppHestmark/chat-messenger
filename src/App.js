import { Button, Input, InputLabel } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
import { FormControl } from '@material-ui/core';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  console.log(input);
  console.log(messages);

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, input]);
    setInput('')
  }

  return (
    <div className="app">
      <h1>Hello my ninja warriors</h1>

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
          <p> {message} </p>
        ))
      }
    </div>
  );
}

export default App;
