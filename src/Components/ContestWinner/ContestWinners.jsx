import React,{Component} from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import WinnerComponent from "./WinnerComponent";
import {Button} from "react-bootstrap";
import status from '../status';

class ContestWinners extends Component{


    constructor(){
        super();
        this.fetch=this.fetch.bind(this);
        this.state={
            mid:"0",
            contests:[],
            hasMore:true
        }

       
    }

    componentDidMount(){
        console.log("ENTER");
        this.fetch();
    }

   

    //Fetch Function


    fetch(){
        axios.post(status.baseUrl+"/contest/getWinnerMidTEST",{
            "mid":this.state.mid
        }).then(response=>{
            if(response.data.message.length!==0){
                
                this.setState({
                    contests:[...this.state.contests,...response.data.message],
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


    //Send Notification to winners
    sendNotification(cid){
        axios.post(status.baseUrl+"/notifi/sendNotifi_ContestWinners",{
            cid:cid.toString()
        }).then(response=>{
             alert(response.data.message+"  count: "+response.data.count);
        }).catch(err=>{
            alert(err);
        })
    }

    

    notifyAllParticipants(cid){
        axios.post(status.baseUrl+"/notifi/sendNotifi_ContestParticipants",{
            cid:cid
           
        }).then(response=>{
            console.log(response.data);
            alert(response.data.message+"  count: "+response.data.count);
        }).catch(err=>{
            alert(err);
        })
    }


    render(){
        return(
            <div>
                <h1>Contest Winners</h1>
                <div>
                    <InfiniteScroll
                        dataLength={this.state.contests}
                        next={this.state.mid!=="0" ?this.fetch:null}
                        loader={<h4>Loading...</h4>}
                        hasMore={this.state.hasMore}
                    >
                        <div style={{display:"flex", justifyContent:"center",flexWrap:"wrap"}}>
                            {this.state.contests.map(contest=>{
                                return <div style={{border:"1px solid black", fontSize:"16px", margin:"10px",flexBasis:"30%",paddingLeft:"10px"}}>
                                <h2>Contest Name: {contest["cname"]}</h2>
                                <img src={contest.contest_cover_pic}></img>
                                <p>Date: {contest["dateEnd"]}</p>
                                <p>Talent: {contest["talent"]}</p>
                                <div>
                                    <img src={contest.o_profile_pic}/>
                                    <p>Organization name:{contest["o_name"]}</p>
                                </div>
                               
                               

                                    <p>Winners:</p>
                                    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                                    
                                        {Object.keys(contest["winners"]).map(position=>{
                                        
                                            return <WinnerComponent position={parseInt(position)+1} winner={contest["winners"][position]}/>
                                        })}

                                    </div>
                                    <Button style={{margin:"20px"}} onClick={()=>{
                                        this.sendNotification(contest.cid);
                                    }}>Send Notification</Button>
                                    <Button style={{margin:"20px"}} onClick={()=>{
                                        this.notifyAllParticipants(contest.cid);
                                    }}>Notify All Participants</Button>                      
                                </div>
                    
                            })}
                         </div>
                    </InfiniteScroll>
                  
                </div>
            </div>
        )
    }
}


export default ContestWinners;