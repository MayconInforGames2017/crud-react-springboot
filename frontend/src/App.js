import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListaGrupos from './ListaGrupos';

class App extends Component {
   render() {
     return (
       <Router>
         <Switch>
           <Route path='/' exact={true} component={Home} />
           <Route path='/grupos' exact={true} component={ListaGrupos} />
         </Switch>
       </Router>
     )
   }
}

export default App;
