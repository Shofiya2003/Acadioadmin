import React, { Component } from "react";
import {Button,Navbar,NavLink} from 'react-bootstrap';

class Nav extends Component{
    toLogout(){
        localStorage.clear();
        window.location.assign("/");
    }

    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <NavLink className="aname text-white font-weight-normal float-left mt-1" href="/"><img src="" className="nav-img" style={{ marginTop: -7 }} alt="" /> <span className="ml-2">Acadio</span></NavLink>

                <Button type="Button" variant="outline-danger" size="lg" className="home-buttons" onClick={this.toLogout}>Logout</Button>
            </Navbar>
        )
    }
}

export default Nav;