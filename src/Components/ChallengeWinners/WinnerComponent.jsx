import React,{Component} from "react";


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
                profile_pic:"https://zsquare-contest.s3.ap-south-1.amazonaws.com/images/profile_pic2.png"
            })   
        }else{
            this.setState({
                profile_pic:this.props.winner.profile_pic
            })
        }
    
        
    
    }


    render(){

           
           return <div style={{border:"1px solid black", flexBasis:"36%"}}>
            <h1>{this.props.position}</h1>
            <img src={this.state.profile_pic} style={{height:"30px", float:"left" ,marginRight:"20px"}}/>
            <p>{this.props.winner.name || this.props.winner.user_name}</p>
           </div>
           
    }
}


export default WinnerComponent;