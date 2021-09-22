import React,{Component} from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import WinnerComponent from "./WinnerComponent";
import status from '../status';
import Nav from "../../nav"
import {Button} from "react-bootstrap";


class ChallengeWinnerPage extends Component{

    constructor(){
        super();
        this.fetch=this.fetch.bind(this);
        this.state={
            mid:"0",
            winners:[],
            hasMore:true
        }
    }


    componentDidMount(){
        console.log("ENTER");
        this.fetch();
        console.log(this.state.winners);
    }

    componentDidUpdate(){
        console.log(this.state.winners)
    }

    fetch(){
        console.log("i am in fetch");
        axios.post(status.baseUrl+"/challenge/getEndedMid_filter",{
            "talent":"",
            "mid":this.state.mid,
            "uid":localStorage.getItem("id")
        }).then(response=>{
            // console.log("DATA : "+JSON.stringify(status.baseUrl));
            if(response.data.message.length!==0){
                this.setState({
                    winners:[...this.state.winners,...response.data.message],
                    mid:response.data.message[response.data.message.length-1]._id
                })
            }else{
                this.setState({
                    hasMore:false
                })
                console.log("FALSE");
            }
        }).catch(err=>{
            console.log(err);
        })
    }


    //Send Notification

    sendNotification(id){
        axios.post(status.baseUrl+"/notifi/sendNotifi_ChallengeWinners",{
            "ch_id":id
        }).then(response=>{
            alert(response.data.message);
        }).catch(err=>{
            alert(err.message);
        })
    }


   


    render(){
        return <div>
            <Nav/>
            <h1 className="mt-3 text-center text-color pagehead">Challenge Winners</h1>
            <hr/>
            <div>
                <InfiniteScroll
                    dataLength={this.state.winners.length}
                    next={this.state.mid!=="0" ? this.fetch:null}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="row ml-3 mr-3">
                    

               
                        {this.state.winners.map(challenge=>{
                           
                            return <div className="col-sm-6 col-lg-4 mt-3 mb-3">
                            <div className='card bg-white shadow rounded overflow-hidden' style={{paddingLeft:"17px",paddingRight:"17px",paddingTop:"15px"}}>
                            {/* <div style={{border:"1px solid black", fontSize:"16px", margin:"10px",flexBasis:"60%",paddingLeft:"10px"}}> */}
                                <h2>Challenge Name: {challenge["ch_name"]}</h2>
                                <p>Date: {challenge["date"]}</p>
                                <p>Talent: {challenge["talent"]}</p>
                                <p>Prize:</p>
                                {Object.keys(challenge["prize"]).map(position=>{
                                    return <li>{position}: {challenge["prize"][position]}</li>
                                })}



                                
                                    
                                

                                    <p>Winners:</p>
                                    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                                    
                                        {Object.keys(challenge["winners_details"]).map(position=>{
                                        
                                            return <WinnerComponent position={position} winner={challenge["winners_details"][position]}/>
                                        })}

                                    </div>

                        
                                
                                <Button style={{margin:'20px'}} onClick={()=>{
                                    this.sendNotification(challenge._id);
                                }}>Send Notification</Button>

                               
                            </div>
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    }
}

export default ChallengeWinnerPage;