import React,{Component} from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import WinnerComponent from "./WinnerComponent";
import {Button} from "react-bootstrap";
import status from '../status';
import Nav from "../../nav";

class ContestWinners extends Component{


    constructor(){
        super();
        this.fetch=this.fetch.bind(this);
        this.state={
            mid:"0",
            contests:[],
            hasMore:true,
            contest_cover_pic:"",
            profile_pic:""
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
                console.log(response.data.message)
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
                <Nav/>
                <h1 className="mt-3 text-center text-color pagehead">Contest Winners</h1>
                <hr/>
                <div>
                    <InfiniteScroll
                        dataLength={this.state.contests}
                        next={this.state.mid!=="0" ?this.fetch:null}
                        loader={<h4>Loading...</h4>}
                        hasMore={this.state.hasMore}
                    >
                         <div className="row ml-3 mr-3">
                        {/* <div style={{display:"flex", justifyContent:"center",flexWrap:"wrap"}}> */}
                            {this.state.contests.map(contest=>{
                                return <div className="col-sm-6 col-lg-4 mt-3 mb-3">
                                <div className='card bg-white shadow rounded overflow-hidden' style={{paddingLeft:"17px",paddingRight:"17px",paddingTop:"17px"}}>
                                {/* <div style={{border:"1px solid black", fontSize:"16px", margin:"10px",flexBasis:"30%",paddingLeft:"10px"}}> */}
                                <h2>Contest Name: {contest["cname"]}</h2>

                                {
                                    contest.contest_cover_pic===null || contest.contest_cover_pic==="" || contest.contest_cover_pic===undefined?
                                    <img src={status.s3_url+"images/profile_bg.jpeg"} alt="cover_pic" style={{width:"100%"}}/>
                                    :
                                    <img src={status.s3_url+contest.contest_cover_pic} alt="cover_pic" style={{width:"100%"}}/>
                                }
                               
            
                                
                                <p>Date: {contest["dateEnd"]}</p>
                                <p>Talent: {contest["talent"]}</p>
                                <h5 className="card-title text-dark">
                                    <span className="ml-2 post_name">Organization name:{contest["o_name"]}</span>
                                    {
                                    contest.o_profile_pic===null || contest.o_profile_pic==="" || contest.o_profile_pic===undefined?
                                    <img src={status.s3_url+"images/profile_pic2.png"} style={{height:"30px", float:"left" ,marginRight:"20px",borderRadius:"100%"}}  alt="o_profile_pic"/>
                                    :
                                    <img src={status.s3_url+contest.o_profile_pic} style={{height:"30px",width:"34px",float:"left" ,marginRight:"20px",borderRadius:"100%"}} alt="o_profile_pic"/>
                                    }
                                </h5>
                               
                               
                               

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