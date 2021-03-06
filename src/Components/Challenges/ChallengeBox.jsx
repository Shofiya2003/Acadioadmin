/* eslint-disable no-useless-constructor */
import React,{Component} from "react";
import {Card,Button} from "react-bootstrap";

import {Link} from "react-router-dom"
import "../../styles.css"


class ChallengeBox extends Component{
   
        render(){
            // console.log(this.props.obj["prize"]);
            return(


                <div className="card-body pt-2 pl-2 pb-0 bg-light">
              
                    
                <Card.Body>
                   
                <Card.Title>{this.props.obj.ch_name}</Card.Title>
                <Card.Text>No. Of Participants:{this.props.obj["no_of_participants"]}</Card.Text>
    
                 <Card.Text>talent:{this.props.obj["talent"]}</Card.Text>
                <Card.Text>curr:{this.props.obj["curr"]}</Card.Text>
                <Card.Text>fees:{this.props.obj["fees"]}</Card.Text>

                <table>
                    <th>PRIZE TABLE</th>
                    <tr>
                        <td>Position</td>
                        <td>Prize</td>
                        
                        </tr>
                        {Object.keys(this.props.obj["prize"]).map(key=>{
                        
                        return <tr>
                        <td>{key}</td>
                        <td>{this.props.obj["prize"][key]}</td>
                    </tr>
                    })}
                </table>

                <Card.Text>end:{this.props.obj["end"]}</Card.Text>
                <Card.Text>desc:{this.props.obj["desc"]}</Card.Text>
                <Card.Text>Slots Filled:{this.props.obj["slots_filled"]}</Card.Text>
                <Card.Text>date:{this.props.obj["date"]}</Card.Text>
                <Card.Text>__v:{this.props.obj["__v"]}</Card.Text>
                <Card.Text>Taken Part:{this.props.obj["taken_part"]}</Card.Text>
                
              <Link to={{
                  pathname:"/challengeInfo",
                  obj:{
                      challenge:this.props.obj
                  }
              }}>
              <Button variant="primary" onClick={()=>{
                   
                }}>Know More</Button></Link>
                </Card.Body>

                
                
            </div>
                                                
            )
        }
}

export default ChallengeBox;