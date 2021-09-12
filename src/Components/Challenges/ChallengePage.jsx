import axios from "axios";
import React,{Component} from "react";
import {Card} from "react-bootstrap";
import PostIndi from "../PostIndi";

class ChallengePage extends Component{

    constructor(props){
        super(props);
        this.onTick=this.onTick.bind(this);
        this.toSubmitWinners=this.toSubmitWinners.bind(this);
        
        this.state={
            posts:[],
            winner1:"",
            winner2:"",
            winners:{}
            
        }
    }

    componentWillMount(){
       
        axios.post("http://contest-test-2.herokuapp.com/challengePost/getAllPost_ofChallenge",{
        
            "ch_id":this.props.location.obj.challenge._id,
            "uid":localStorage.getItem('id'),
        }).then(res=>{
            
             this.setState({
                 posts:res.data
             })
           

        }).catch(err=>{
            console.log(err);
        })


    }

    



    onTick(event){
       if(event.target.id==="1"){
           this.setState({
               winner1:event.target.value
           })
       }
       else if(event.target.id==="2"){
           this.setState({
               winner2:event.target.value
           })
       }
       this.setState({
           
        winners:{...this.state.winners,[(event.target.id).toString()]:event.target.value}
    })
       
        
    }

    toSubmitWinners(){
        if(Object.keys(this.state.winners).length===0){
            alert("Select Winners");
            return;
        }
        for(const key in this.state.winners){
            if(this.state.winners[key]===""){
                alert("Select winners");
                return;
            }
        }

        
         
        axios.post("http://contest-test-2.herokuapp.com/challengeWinner/create",{
            "declarer_id":localStorage.getItem("id"),
            "ch_id":this.props.location.obj.challenge._id,
            "winners":this.state.winners

        }).then(res=>{

            window.location.assign("/home");
        }).catch(err=>{
            console.log(err.response.data.message);
            alert(err.response.data.message)
        })
        console.log(this.state.winners);
        console.log("ch_oid: "+this.props.location.obj.challenge.ch_oid);
        console.log("uid:" + localStorage.getItem("id"));


        
       
    }

    render(){
    

        return(
            <div>
                    
                    <Card style={{ width: '18rem' }} >
                    
                    <Card.Body>
                       
                    <Card.Title>ch_name:{this.props.location.obj.challenge.ch_name}</Card.Title>
                    <Card.Text>No. Of Participants:{this.props.location.obj.challenge["no_of_participants"]}</Card.Text>
        
                     <Card.Text>talent:{this.props.location.obj.challenge["talent"]}</Card.Text>
                    <Card.Text>curr:{this.props.location.obj.challenge["curr"]}</Card.Text>
                    <Card.Text>fees:{this.props.location.obj.challenge["fees"]}</Card.Text>
    
                    <table>
                        <th>PRIZE TABLE</th>
                        <tr>
                            <td>Position</td>
                            <td>Prize</td>
                            
                            </tr>
                            {Object.keys(this.props.location.obj.challenge["prize"]).map(key=>{
                            
                            return <tr>
                            <td>{key}</td>
                            <td>{this.props.location.obj.challenge["prize"].key}</td>
                        </tr>
                        })}
                    </table>
    
                    <Card.Text>end:{this.props.location.obj.challenge["end"]}</Card.Text>
                    <Card.Text>desc:{this.props.location.obj.challenge["desc"]}</Card.Text>
                    <Card.Text>Slots Filled:{this.props.location.obj.challenge["slots_filled"]}</Card.Text>
                    <Card.Text>date:{this.props.location.obj.challenge["date"]}</Card.Text>
                    <Card.Text>__v:{this.props.location.obj.challenge["__v"]}</Card.Text>
                    <Card.Text>Taken Part:{this.props.location.obj.challenge["taken_part"]}</Card.Text>
                  
                 
                    </Card.Body>
    
                    
                    </Card>

                    <div>
                        <div style={this.props.location.obj.challenge["slots_filled"]!==this.props.location.obj.challenge["no_of_participants"]?{display:"none"}:null}>
                            <table>
                                <tr>
                                    <td>Entries</td>
                                    <td>First</td>
                                    {this.state.posts.no_of_participants===4 ?
                                    <td>Second</td>:null
                                }
                                    
                                </tr>
                                {this.state.posts.map(post=>{
                                    return <tr>
                                        <td>{post.name}</td>
                                        <td><input type="checkbox" id="1" onChange={this.onTick} value={post._id} checked={this.state.winner1===post._id ? true:false} /></td>
                                        {this.state.posts.no_of_participants===4 ?
                                    <td><input type="checkbox" id="2" onChange={this.onTick}  checked={this.state.winner2===post._id ? true:null}/></td>:null
                                }
                                        
                                    </tr>
                                })}
                            </table>
                            <button type="button"onClick={this.toSubmitWinners}>Submit</button>
                        </div>
                        
                        <h1>Posts</h1>
                        <div className="row ml-3 mr-3">
                            
                                {this.state.posts.map(post=>{
                                
                            
                                return <PostIndi post={post}></PostIndi>
                            })}
                            

                        </div>
                        
                    </div>
              
                                                    
            </div>
        )
    }
}

export default ChallengePage;