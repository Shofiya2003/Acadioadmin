import React, { Component } from "react";
import {Route,Switch} from "react-router-dom";
import Pool from "./Components/Pools/Pool";
import Login from "./Login"
import Home from "./Home"
import DisplayPool from "./Components/Pools/DisplayPool";
import DisplayPosts from "./DisplayPosts";
import DisplayChallenges from "./Components/Challenges/DisplayChallenges";
import ChallengePage from "./Components/Challenges/ChallengePage";
import PoolPage from "./Components/Pools/PoolPage";

import ChallengeWinnerPage from "./Components/ChallengeWinners/ChallengeWinnerPage";
import PoolWinnerPage from "./Components/PoolWinners/PoolWinnerPage";
import PoolWinnerPosts from "./Components/PoolWinners/PoolWinnerPosts";
import ContestWinners from "./Components/ContestWinner/ContestWinners";
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
            <Route path='/displayPosts' component={DisplayPosts}></Route>
            <Route path='/displayPools' component={DisplayPool}></Route>
            <Route path="/displayChallenges" component={DisplayChallenges}></Route>
            <Route path="/challengeInfo" component={ChallengePage} ></Route>
            <Route path="/poolInfo" component={PoolPage}></Route>
            <Route path="/challengeWinners" component={ChallengeWinnerPage}></Route>
            <Route path="/poolWinners" component={PoolWinnerPage}></Route>
            <Route path="/poolWinnerPosts" component={PoolWinnerPosts}></Route>
            <Route path="/contestWinners" component={ContestWinners}></Route>


            
          </Switch>
          
        </div>
      )
    }
}

export default App;