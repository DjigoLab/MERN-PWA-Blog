import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: "Loading...",
    title: "",
    content: "",
    author: "",

  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/api/articles');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({
        data: res.articles[1].title,
        content: res.articles[1].content,
        author: res.articles[1].author
      }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="article"> {this.state.data} </p>
          <p className="article"> {this.state.author} </p>
          <p className="article"> {this.state.content} </p>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}


export default App;
