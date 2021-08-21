import React, { Component } from "react";

import {Link} from "react-router-dom";


class Home extends Component{


    //toLogout function

    toLogout(){
        localStorage.clear();
        window.location.assign("/");
    }




    render(){
        return(
            <div>
                <h1>Home</h1>
                <Link to="/poolCreate"><button className="home-buttons">Create A Pool</button></Link>
                
                <button type="button" className="home-buttons" onClick={()=>{
                    window.location.assign("/displayPosts");
                }}>Posts</button>
                <button type="button" className="home-buttons" onClick={()=>{
                    window.location.assign("/displayPools")
                }}>Display Pools</button>
                 <button type="button" className="home-buttons" onClick={()=>{
                    window.location.assign("/displayChallenges")
                }}>Display Challenges</button>
               <button type="button" className="home-buttons" onClick={this.toLogout}>Logout</button>
            </div>
        )
    }
}

export default Home;