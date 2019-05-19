import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    
    let history = this.getHistory();
    let lastElement = history[history.length - 1];

    this.state = {
      currentLetter: lastElement
    };

    this.updateCurrentLetter = this.updateCurrentLetter.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.restart = this.restart.bind(this);
  }

  updateCurrentLetter () {
    let randomLetter = this.generateRandomLetter();

    this.setState(state => ({ 
      currentLetter: randomLetter
     }));

    this.addLetterToHistory(randomLetter);
  }

  addLetterToHistory (letter) {
    let history = this.getHistory();
  
    history.push(letter);
  
    localStorage.setItem('alreadyShownLetter', JSON.stringify(history));
  }

  getHistory () {
    return JSON.parse(localStorage.getItem('alreadyShownLetter')) || [];
  }

  generateRandomLetter () {
    var leftCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let history = this.getHistory();

    for (var i=0; i<history.length; i++) {
      leftCharacters = leftCharacters.replace(history[i], '');
    }

    if (leftCharacters.length === 0)
      return;
    
    var charactersLength = leftCharacters.length;
    var randomLetter = leftCharacters.charAt(Math.floor(Math.random() * charactersLength));
        
    return randomLetter;
  }

  clearHistory () {
    localStorage.setItem('alreadyShownLetter', JSON.stringify([]));

    this.setState(state => ({ 
      currentLetter: ''
     }));
  }

  restart () {
    this.clearHistory();
    this.updateCurrentLetter();
  }

  render () {
    let history = this.getHistory();
    let mainButton;
    let historyContainer;

    if (history.length === 0) {
      mainButton = <h1 onClick={ this.updateCurrentLetter } className="main-button color-blue">Start</h1>
    }
    else if (history.length > 26) {
      mainButton = <h1 onClick={ this.restart } className="main-button color-red">Restart</h1>
    }
    else {
      mainButton = <h1 onClick={ this.updateCurrentLetter } className="current-letter">{ this.state.currentLetter }</h1>
    }

    if (history.length > 0) {
      historyContainer = <div className="history-container">
                            <h4>History</h4>
                            <span>{ history.filter(letter => letter != null).join(', ') }</span>
                            <br />
                            <span className="clear-history" onClick={ this.clearHistory }>Clear</span>
                          </div>;
    }


    return (
      <div className="app">
        <div className="container">
          <header className="header">
            <img src="./assets/img/logo.svg" className="rotate" alt="logo" />
            <h1>
              <span className="color-red">Bac</span>
              &nbsp;
              <span className="color-blue">&agrave;</span>
              &nbsp;
              <span className="color-grey">lettre</span>
            </h1>
          </header>
      
          { mainButton }

          { historyContainer }
        </div>
      </div>
    );
  }
}

export default App;
