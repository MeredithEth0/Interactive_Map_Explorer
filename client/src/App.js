import 'leaflet/dist/leaflet.css';
import './App.css';
import React from 'react';
import UKMap from './components/UKmap.js';
import githubLogo from './images/github.png';
import linkedinLogo from './images/linkedin.png';


function App() {
  return (
    <div className="App">
      <h1>Custom Landmarks Map</h1>
      
      {/* Your Leaflet Map */}
      <UKMap />

      {/* Footer section */}
      <footer className="bottomBanner">
        <h2 id="creditContacts">
          Created by: Ethan Meredith <br />
          Contact:{' '}
          <a
            id="footerLink"
            href="mailto:ethanmeredith03@hotmail.co.uk"
          >
            ethanmeredith03@hotmail.co.uk
          </a>
        </h2>

        <div className="rightSideLinks">
          <a
            className="linkImages"
            href="https://github.com/MeredithEth0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={githubLogo}
              alt="Github logo"
              width="50"
              height="50"
            />
          </a>

          <a
            className="linkImages"
            href="https://www.linkedin.com/in/ethan-meredith/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedinLogo}
              alt="LinkedIn logo"
              width="50"
              height="50"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
