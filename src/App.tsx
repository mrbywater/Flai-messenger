import React from 'react';
import './styles/style.scss';
import '@mantine/core/styles.css';
import Chat from './components/chat/Chat';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <main className="mainContainer">
        <Chat />
      </main>
    </MantineProvider>
  );
}

export default App;
