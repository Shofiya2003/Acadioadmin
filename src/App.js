import React, { Component } from "react";
import {Route,Switch} from "react-router-dom";
import Pool from "./Pool";
import Login from "./Login"
import Home from "./Home"

class App extends Component{
  constructor(){

    super();
    this.decideRootRoutePage=this.decideRootRoutePage.bind(this);
    this.id=localStorage.getItem('id');
    
    
  }

  //Function to check local storage for id and render Login or Home componenet accordingly
  decideRootRoutePage(){
   
    if(this.id!==null){
      return <Home />;
    }
    else {
      return <Login />;
    }
  }



  
    render(){
      return(
        <div>
          
          <Switch>
            <Route exact path='/' component={this.decideRootRoutePage}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/poolCreate' component={Pool}></Route>
            
          </Switch>
          
        </div>
      )
    }
}

export default App;