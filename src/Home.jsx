import React, { Component } from "react";

import {Link} from "react-router-dom";
import DisplayPool from "./Components/Pools/DisplayPool";
import Display from "./DisplayPosts";
import Modal from 'react-modal';
import {Button,Navbar,NavLink} from 'react-bootstrap';
import axios from "axios";
import Nav from "./nav";
import status from "./Components/status";
class Home extends Component{
    constructor(){
        super();
        this.edit=this.edit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            modalIsOpen:false,
            talent:"",
            rules:"",
        }
    }

    edit(){
        if(!this.state.rules){
            alert("Fill rules");
            return;
        }
        if(!this.state.talent){
            alert("Select Talent");
            return;
        }
        axios.patch(status.baseUrl+'/rules/editRules',{
            talent:this.state.talent,
            rules:this.state.rules
        }).then(res=>{
            alert(res.data.message);
            console.log(res);
            this.setState({
                modalIsOpen:false
            })
        }).catch(err=>{
            console.log(err);
        })
        
        
    }

    handleChange(event){
        this.setState({
            [event.target.id]:event.target.value,
        })
    }

    backup(){
        axios.get(status.baseUrl+"/backup").then(response=>{
            const data=response.data;
            console.log(data);
            data.forEach(database => {
                const a=document.createElement('a');
            const blob=new Blob([JSON.stringify(database[1])]);
            a.href=URL.createObjectURL(blob);
            a.download=database[0]+".json";
            a.click();
            });
            
        }).catch(err=>{
            console.log(err);
        })
    }

    //toLogout function

    toLogout(){
        localStorage.clear();
        window.location.assign("/");
    }




    render(){
        return(
            <div>
                
                <Nav/>
                <h1 className="mt-3 text-center text-color pagehead">Home</h1>
                <hr/>
                <div className="row" style={{justifyContent:"center"}}>
                <Button type="Button" variant="primary" size="lg" className="home-buttons col-lg-4 col-md-3 " onClick={()=>{
                    window.location.assign("/poolCreate");
                }}>Create a Pool</Button>
                <Button type="Button" variant="primary" size="lg" className="home-buttons col-lg-4 col-md-3" onClick={()=>{
                    window.location.assign("/displayPosts");
                }}>Posts</Button>
                <Button className="home-buttons col-lg-4 col-md-3" variant="primary" size="lg" onClick={()=>{
                    window.location.assign("/displayPools");
                }}>Display Pools</Button>
                
                    
          
                 <Button type="Button" variant="primary" size="lg" className="home-buttons col-lg-4 col-md-3 " onClick={()=>{
                    window.location.assign("/displayChallenges")
                }}>Display Challenges</Button>
             
               <Button type="Button" variant="primary" size="lg" className="home-buttons col-lg-4 col-md-3 " onClick={()=>{
                   window.location.assign("/challengeWinners");
               }}>Challenge Winners</Button>

                <Button type="Button" variant="primary" size="lg" className="home-buttons col-lg-4 col-md-3 " onClick={()=>{
                   window.location.assign("/poolWinners");
               }}>Pool Winners</Button>

               <Button type="Button" variant="primary" size="lg" className="home-buttons col-lg-4 col-md-3 " onClick={()=>{
                   window.location.assign("/contestWinners");
               }}>Contest Winners</Button>

                <Button type="Button" variant="primary" size="lg" className="home-buttons col-lg-4 col-md-3 " onClick={this.backup}>

               Back Up</Button>

                <Button type="Button" variant="primary" size="lg" className="home-buttons col-lg-4 col-md-3 " onClick={()=>{
                   this.setState({
                       modalIsOpen:true
                   })
               }}>Edit Rules</Button>
               </div>
            <Modal
                isOpen={this.state.modalIsOpen}
            >
                  <span className="cross" onClick={()=>{
                      this.setState({modalIsOpen:false})
                  }}>X</span>
                  <div>
                  <label for="talent"/> Talent<br/>
                  <select id="talent" onChange={this.handleChange}>
                    <option selected disabled>Select Talent</option>  
                    <option>Dance</option>
                    <option>Singing</option>
                    <option>Art</option>
                  </select><br/>
                  <label for="rules"/>Rules<br/>
                  <textarea id="rules" onChange={this.handleChange} placeholder="Enter Rules" style={{width:'414px',height:'159px'}}/>
                  
                </div>  
                <Button variant="primary" onClick={this.edit}>Edit</Button>
              </Modal>

                
            </div>
        )
    }
}

export default Home;