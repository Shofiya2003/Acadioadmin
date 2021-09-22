import React,{Component} from "react";
import status from "../status";

class WinnerComponent extends Component{

    constructor(){
        super();
        this.state={
            profile_pic:""
        }


        
    }

    componentDidMount(){
       
        if(this.props.winner.profile_pic===null || this.props.winner.profile_pic==="" || this.props.winner.profile_pic===undefined){
            this.setState({
                profile_pic:status.s3_url+"images/profile_pic2.png"
            })   
        }else{
            this.setState({
                profile_pic:status.s3_url+this.props.winner.profile_pic
               
            })

            
        }
    
        
    
    }


    render(){

           
           return <div className="card-body pt-2 pl-2 pb-0 bg-light flex-justify-center" >
               <h5 className="card-title text-dark">
                    <h1>{this.props.position}</h1>
                    <img src={this.state.profile_pic} style={{height:"30px", float:"left" ,marginRight:"20px",borderRadius:"100%"}} alt="profile_pic"/>
            
                    <span className="ml-2 post_name">{this.props.winner.name}</span>
                    
               </h5>
           
          
           </div>
           
    }
}


export default WinnerComponent;