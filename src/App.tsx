import React from 'react';
import './App.css';
import Footer from './Footer/Footer';
import Bufos from './Bufo/Bufo';
import Navbar from './Navbar/Navbar';
import { ReactComponent as CopyLogo } from './copy.svg';
import { useState, useEffect } from 'react';
import PackageReadme from './PackageReadme/PackageReadme';

function App() {
  const [copied, setCopied] = useState('copy');

  function copyToClipboard() {
    navigator.clipboard.writeText('npm install refractile -D');
    setCopied('copied!');
    setTimeout(() => {
      setCopied('copy');
    }, 2000);
  }

  return (
    <div className="App">
      <Navbar />
      <div className="hero min-h-screen-less-navbar   ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Experience Refractile</h1>
            <p className="py-6">
              Seamlessly integrate the benefits of other programming languages into a Node Express environment
            </p>
            <div className="flex justify-around items-center rounded-lg text-white bg-black border-black p-5 m-7 dark:bg-white dark:text-black">
              <pre>npm install refractile</pre>
              <ul className="menu menu-horizontal ">
                <li>
                  <div id="copyTooltip" className="tooltip" data-tip={copied}>
                    <button
                      onClick={copyToClipboard}
                      className="bg-white p-2 rounded-lg ">
                      <CopyLogo className="h-7 w-7" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <button className="btn btn-background ring-2 ring-brown ring-offset-4 ring-offset-purple-100/[.55]">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url(https://upload.wikimedia.org/wikipedia/commons/7/71/GGB_reflection_in_raindrops.jpg)',
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Unlock Performance</h1>
            <p className="mb-5 text-xl">
              Leverage the power of WebAssembly to bring the affordances of many programming languages into your web application's Express backend at near-native speed. Read below to learn more.
            </p>
          </div>
        </div>
      </div>
      <PackageReadme />
      <Bufos />
      <Footer />
    </div>
  );
}

export default App;
