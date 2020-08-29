import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Landing from './pages/landing';
import Login from "./pages/login"
import SignUp from "./pages/signUp"
import dashboard from "./pages/dashboard"
import Subir from "./pages/Subir"
import Reproductor from "./pages/reproductor"
import "./index.css"

function App(){
  return(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/iniciar-sesion" component={Login}/>
      <Route exact path="/crear-cuenta" component={SignUp}/>
      <Route exact path="/dashboard" component = {dashboard}/>
      <Route exact path="/dashboard/subir" component = {Subir}/>
      <Route exact path="/dashboard/escuchar/:id" component={Reproductor}/>
      <Redirect from='*' to='/'/>
    </Switch>
  </BrowserRouter>
  )
}

ReactDOM.render(App(), document.getElementById("root"))
export default App