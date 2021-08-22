import axios from "axios";
import React,{Component} from "react";
import {Card} from "react-bootstrap";
import PostIndi from "../PostIndi";

class ChallengePage extends Component{

    constructor(){
        super();
        this.state={
            posts:[]
        }
    }

    componentWillMount(){
        console.log(this.props.location.obj.challenge._id);
        axios.post("http://contest-test-2.herokuapp.com/challengePost/getAllPost_ofChallenge",{
        
            "ch_id":this.props.location.obj.challenge._id,
            "uid":localStorage.getItem('id'),
        }).then(res=>{
            
             this.setState({
                 posts:res.data
             })
             console.log(this.state.posts);

        }).catch(err=>{
            console.log(err);
        })
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
                        <h1>Posts</h1>
                        <div className="row ml-3 mr-3">
                            
                                {this.state.posts.map(post=>{
                                console.log(post);
                            
                                return <PostIndi post={post}></PostIndi>
                            })}
                            

                        </div>
                        
                    </div>
              
                                                    
            </div>
        )
    }
}

export default ChallengePage;