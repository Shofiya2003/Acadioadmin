import React,{Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import {Button,Card} from "react-bootstrap"
import Modal from "react-modal"
class PoolBox extends Component{
    constructor(props){
        super(props);
        this.update=this.update.bind(this);
        this.openModal=this.openModal.bind(this);
        this.onChange=this.onChange.bind(this);
        this.edit=this.edit.bind(this);
        this.state={
            modalIsOpen:false,
            pool_name:this.props.poolName,
            talent:this.props.talent,
            end_date:this.props.endDate,
            fees:this.props.fees,
            talents:["Art","Dance","Writing","Singing"]
        }

        this.modalStyle={
            height:"300px",
            width:"200px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center"
        }

    }

    openModal(){
        this.setState({
            modalIsOpen:true,
        });
        console.log(this.state.end_date)
    }

    onChange(event){
        this.setState({
            [event.target.id]:event.target.value
        })
    }

    edit(){
        if(!this.state.pool_name || !this.state.talent || !this.state.end_date || !this.state.fees){
            alert("Fill all the details");
            return;
        }
        console.log(this.state.talent);
        axios.patch("http://localhost:3000/pool/editDetails",{
            _id:this.props.obj._id,
            pool_name:this.state.pool_name,
            talent:this.state.talent,
            end_date:this.state.end_date.toString(),
            fees:this.state.fees.toString()
        }).then(response=>{
            alert(response.data.message);
            if(response.data.message==="Successfully updated"){
                this.setState({
                    modalIsOpen:false
                });
            }
        }).catch(err=>{
            console.log(err.response.message);
        });
   
        
    }


    update(){
        axios.post("http://contest-test-2.herokuapp.com/poolwinner/editDeadline",{
            pool_id:this.props.obj._id
        }).then(response=>{
            alert(response.data.message);
        }).catch(err=>{
            alert(err.response.message);
        })
    }
    render(){
        return(
            <Card style={{ width: '18rem' }} >
                    
            <Card.Body>
               
           

            <p>Pool Name: {this.state.pool_name}</p>
                <img scr={this.props.coverPic} alt="cover pic"/>                  
            
                <p>Talent: {this.state.talent}</p>
                <p>End-Date: {this.state.end_date}</p>
                <p>Fees: {this.state.fees}</p>
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
              <Button variant="primary">Know More</Button></Link>
              <Button variant="primary" onClick={this.update} style={{marginLeft:"20px"}}>Update</Button>
              <Button variant="primary" onClick={this.openModal}>Edit Details</Button>     

             
                
              <Modal
                isOpen={this.state.modalIsOpen}
                ariaHideApp={false}
              >
                  <span className="cross" onClick={()=>{
                      this.setState({modalIsOpen:false})
                  }}>X</span>
                  <div>
                  <label for="pool_name"/> Pool Name<br/>
                  <input type="text" value={this.state.pool_name} id="pool_name" onChange={this.onChange}/><br/>
                  <label for="talent"/> Talent <br/>
                 <select id="talent">
                     <option defaultValue>{this.state.talent}</option>
                    {this.state.talents.map(talent=>{
                        if(talent!==this.state.talent){
                            return <option>{talent}</option>
                        }
                    })}
                 </select><br/>
                  <label for="end_date"/> End-Date<br/>
                  <input type="date" value={this.state.end_date} id="end_date" onChange={this.onChange}/><br/>
                  <label for="fees"/> Fees<br/>
                  <input type="number" value={this.state.fees} id="fees" onChange={this.onChange}/><br/>
                </div>  
                <Button variant="primary" onClick={this.edit}>Edit</Button>
              </Modal>
             
            </Card.Body>

            
            </Card>
        )
    }
}

export default PoolBox;