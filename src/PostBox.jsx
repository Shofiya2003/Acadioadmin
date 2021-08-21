import React,{Component} from "react";

class PostBox extends Component{
    render(){
        return(
            <div>
                <p>{this.props.academy}</p>
                <p>{this.props.certiBool}</p>
                <p>{this.props.cname}</p>
               <img src={this.props.coverPic} alt="Cover Pic"/>
                <p>{this.props.curr}</p>
                <p>{this.props.desc}</p>
                <p>{this.props.end}</p>
                <p>{this.props.endDate}</p>
                <p>{this.props.fees}</p>
                <p>{this.props.name}</p>
                <p>{this.props.prize1}</p>
                <p>{this.props.prize2}</p>
                <p>{this.props.prize3}</p>
                <img src={this.props.profilePic} alt="Profile Pic"/>
                <p>{this.props.talent}</p>

            </div>
        )
    }
}

export default PostBox;


