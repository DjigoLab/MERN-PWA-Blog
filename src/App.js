import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

class App extends Component {
  state = {
    data: "Actual Status: Fighting laziness to finish this page, someday. \u{1F440} \u{1F6E0} ",
    logoURL: logo,
    title: "Djigo.io",
    content: "",
    author: "Antonio Djigo",

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
          <img className="App-logo" src={this.state.logoURL} alt="" />
          <h1 className="title">{this.state.title}</h1>
          <p className="article"> {this.state.data} </p>
          <p className="article"> {this.state.content} </p>
        </header>
        <footer className="App-footer">
          <p className="article"> Blame {this.state.author} @ <a className="App-link" href="https://github.com/DjigoLab">Github</a> or <a className="App-link" href="https://twitter.com/Brownio_">Twitter</a> </p>
        </footer>
      </div>
    );
  }
}


export default App;
