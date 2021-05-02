import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    grupos: []
  };

  async componentDidMount() {
    const response = await fetch('/api/grupos');
    const body = await response.json();
    this.setState({ grupos: body, isLoading: false });
  }

  render() {
    const { grupos, isLoading } = this.state;

    if (isLoading) {
      return <p>Carregando...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>JUG LIST</h2>
            { grupos.map(grupo => 
              <div key={ grupo.id }>
                {grupo.name}
              </div>
              ) }
          </div>
        </header>
      </div>
    )

  }

}

export default App;
