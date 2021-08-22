import React,{Component} from "react";
import {Link} from "react-router-dom"
import {Button,Card} from "react-bootstrap"
class PoolBox extends Component{
    render(){
        return(
            <Card style={{ width: '18rem' }} >
                    
            <Card.Body>
               
           

            <p>Pool Name: {this.props.poolName}</p>
                <img scr={this.props.coverPic} alt="cover pic"/>                  
            
                <p>Talent: {this.props.talent}</p>
                <p>End-Date: {this.props.endDate}</p>
                <p>Fees: {this.props.fees}</p>
                <p>Curr: {this.props.curr}</p>
                <p>Prize-Pool:{this.props.prizePool}</p>
                <p>Slots:{this.props.totalSlots}</p>
                <p>Max Entries:{this.props.maxEntries}</p>
                <p>No of Winners:{this.props.noOfWinners}</p>
                <p>Win Percent:{this.props.winPercent}</p>


                <table>
                <th>WINNINGS TABLE</th>
                <tr>
                    <td>Position</td>
                    <td>Winnings</td>
                    
                    </tr>
                    {Object.keys(this.props.winnings).map(key=>{
                    
                    return <tr>
                    <td>{key}</td>
                    <td>{this.props.winnings[key]}</td>
                </tr>
                })}
                </table>

                <p>Rules:{this.props.rules}</p>
                <p>Slots Filled:{this.props.slotsFilled}</p>
                <p>End:{this.props.end}</p>
                <p>--v:{this.props.v}</p>
                <p>Your Entries:{this.props.yourEntries}</p>
                
                <Link to={{
                  pathname:"/poolInfo",
                  obj:{
                      pool:this.props.obj
                  }
              }}>
              <Button variant="primary" onClick={()=>{
                   
                }}>Know More</Button></Link>
            </Card.Body>

            
            </Card>
        )
    }
}

export default PoolBox;