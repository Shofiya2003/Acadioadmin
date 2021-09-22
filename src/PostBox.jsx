import React,{Component} from "react";
import status from "./Components/status";
class PostBox extends Component{
    constructor(){
        super();
        this.state={
            profile_pic:"",
            cover_pic:""
        }
    }

    componentDidMount(){
    
        if(this.props.profile_pic===null || this.props.profile_pic==="" || this.props.profile_pic===undefined){
            this.setState({
                profile_pic:"https://zsquare-contest.s3.ap-south-1.amazonaws.com/images/profile_pic2.png"
            })   
        }else{
            this.setState({
                profile_pic:this.props.profile_pic
            })
        }
    

        if(this.props.coverPic===null || this.props.coverPic==="" || this.props.coverPic===undefined){
            this.setState({
                cover_pic:status.s3_url+"images/profile_bg.jpeg"
            })   
        }else{
            this.setState({
                cover_pic:status.s3_url+this.props.coverPic
            })
        }
    
        
    
    }

    render(){
        return(
            <div className="card-body pt-2 pl-2 pb-0 bg-light">
                
            <h5 className="card-title text-dark">
                <span className="ml-2 post_name">{this.props.name}</span>
                <img src={this.state.profile_pic} style={{height:"30px", float:"left" ,marginRight:"20px"}} alt="profile_pic"/>
            </h5>
            
           
           
                <p>Academy:{this.props.academy}</p>
            
                <p>Contest Name:{this.props.cname}</p>
               <img src={this.state.cover_pic} alt="Cover Pic" style={{width:"100%"}}/>
               
               
               
                <p>End Date:{this.props.endDate}</p>
                <p>Fees:{this.props.fees}</p>
               
               
              
                <p>Talent:{this.props.talent}</p>

            </div>
        )
    }
}

export default PostBox;


