import React,{Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class Login extends Component{

    constructor(){
        super();
        this.onInput=this.onInput.bind(this);
        this.onLogin=this.onLogin.bind(this);
        this.state={
            loginDetails:{email:"",password:""}
            
        }
    }

   


    //on Input in email and password field 
    onInput(event){
        const {value,id}=event.target;
        this.setState(prevState=>{
            return {
                
                loginDetails:{...this.state.loginDetails,[id]:value}

            }
        })
    }
    

    onLogin(event){
        event.preventDefault();
        axios.post("https://contest-test-2.herokuapp.com/user/AdminLogin",
            this.state.loginDetails
        ).then(response=>{
            console.log(response);
            const {id,academy,email,name,profile_pic,token}=(response.data);
            localStorage.setItem('id',id);
            localStorage.setItem('academy',academy);
            localStorage.setItem('email',email);
            localStorage.setItem('name',name);
            localStorage.setItem('profile_pic',profile_pic);
            localStorage.setItem('token',token);
            window.location.assign("/home");
        }).catch(err=>{
            console.log(err.response);
            alert(err.response.data.message);
        })

    }
    render(){
        return (
            <div>
                <form onSubmit={this.onLogin}>
                 <input onChange={this.onInput}  type="email" id="email" placeholder="Email" />
                 <input onChange={this.onInput} id="password" type="password" placeholder="Password" />
                 <button type="submit">Login</button>
                </form>
                
            </div>
        )
    }
}


export default Login