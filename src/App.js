import './App.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SongForm from './SongForm'; // Import your form component
import PutExample from './PutExample';
import GetExample from './GetExample';

// this is the main app where all the CRUD functions are called

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Snoopy</h1>
      </header>
      <main className="content">
        <section className="submit-section">
          <h2>let the music play</h2>
          <SongForm />
        </section>
        <section className="put-section">
          <h2>update that music</h2>
          <PutExample />
        </section>
      </main>
      <section className="get-section">
        <h2>your music list</h2>
        <GetExample />
      </section>
    </div>
  );
}

export default App;
