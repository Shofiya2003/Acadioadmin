import React, { Component } from "react";

import {Link} from "react-router-dom";
import Display from "./Display";

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
                <button type="button" onClick={this.toLogout}>Logout</button>
                <button type="button" onClick={()=>{
                    window.location.assign("/process");
                }}>Posts</button>
                <Display />
            </div>
        )
    }
}

export default Home;