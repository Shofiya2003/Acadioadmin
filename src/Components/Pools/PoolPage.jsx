import React,{Component} from "react";
import {Card} from "react-bootstrap"

class PoolPage extends Component{
    render(){
        return(
            <div>
                 <Card style={{ width: '18rem' }} >
                    
                    <Card.Body>
                       
                    <p>Pool Name: {this.props.location.obj.pool.pool_name}</p>
                <img scr={this.props.location.obj.pool.coverPic} alt="cover pic"/>                  
            
                <p>Talent: {this.props.location.obj.pool.talent}</p>
                <p>End-Date: {this.props.location.obj.pool.end_date}</p>
                <p>Fees: {this.props.location.obj.pool.fees}</p>
                <p>Curr: {this.props.location.obj.pool.curr}</p>
                <p>Prize-Pool:{this.props.location.obj.pool.prize_pool}</p>
                <p>Slots:{this.props.location.obj.pool.total_slots}</p>
                <p>Max Entries:{this.props.location.obj.pool.max_entries}</p>
                <p>No of Winners:{this.props.location.obj.pool.no_of_winners}</p>
                <p>Win Percent:{this.props.location.obj.pool.win_percent}</p>


                <table>
                <th>WINNINGS TABLE</th>
                <tr>
                    <td>Position</td>
                    <td>Winnings</td>
                    
                    </tr>
                    {Object.keys(this.props.location.obj.pool.winnings).map(key=>{
                    
                    return <tr>
                    <td>{key}</td>
                    <td>{this.props.location.obj.pool.winnings[key]}</td>
                </tr>
                })}
                </table>

                <p>Rules:{this.props.location.obj.pool.rules}</p>
                <p>Slots Filled:{this.props.location.obj.pool.slots_filled}</p>
                <p>End:{this.props.location.obj.pool.end}</p>
                <p>--v:{this.props.location.obj.pool.__v}</p>
                <p>Your Entries:{this.props.location.obj.pool.your_entries}</p>
                  
                 
                    </Card.Body>
    
                    
                    </Card>
            </div>
        )
    }
}

export default PoolPage;