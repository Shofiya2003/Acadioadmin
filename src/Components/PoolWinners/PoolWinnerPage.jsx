import React,{Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import WinnerComponent from "../ChallengeWinners/WinnerComponent";
import status from "../status"
import {Button}  from "react-bootstrap";
import Nav from "../../nav"
import Pool from "../Pools/Pool";


class PoolWinnerPage extends Component{

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
    }

    componentDidUpdate(){
        console.log(this.state.winners)
    }

    fetch(){
        console.log("i am in fetch");
        axios.post(status.baseUrl+"/pool/getEndedMid_filter",{
            "talent":"",
            "mid":this.state.mid,
            "uid":localStorage.getItem("id")
        }).then(response=>{
            console.log(response);
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
        axios.post(status.baseUrl+"/sendNotifi_PoolWinners",{
            "pool_id":id
        }).then(response=>{
            alert(response.data.message);
        }).catch(err=>{
            alert(err.response.message);
        })
    }

    //
    


    render(){
        return <>
            <Nav/>
            <h1 className="mt-3 text-center text-color pagehead">Pool Winners</h1>
            <hr/>
            <div>
                <InfiniteScroll
                    dataLength={this.state.winners.length}
                    next={this.state.mid!=="0" ? this.fetch:null}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                >

                    <div className="row ml-3 mr-3">

               
                        {this.state.winners.map(pool=>{
                           
                            return  <div className="col-sm-6 col-lg-4 mt-3 mb-3">
                            <div className='card bg-white shadow rounded overflow-hidden' style={{paddingLeft:"17px",paddingRight:"17px",paddingTop:"15px"}}>
                            {/* <div style={{border:"1px solid black", fontSize:"16px", margin:"10px",flexBasis:"40%",paddingLeft:"10px"}}> */}
                                <h2>Pool Name: {pool["pool_name"]}</h2>
                                {
                                    pool.cover_pic===null || pool.cover_pic==="" || pool.cover_pic===undefined?
                                    <img src={status.s3_url+"images/profile_bg.jpeg"} alt="cover_pic" style={{width:"100%"}}/>
                                    :
                                    <img src={status.s3_url+pool.contest_cover_pic} alt="cover_pic" style={{width:"100%"}}/>
                                }
                                <p>Date: {pool["date"]}</p>
                                <p>Talent: {pool["talent"]}</p>
                                <p>Prize:</p>
                                {Object.keys(pool["winnings"]).map(position=>{
                                    return <li>{position}: {pool["winnings"][position]}</li>
                                })}

                                <p>Winners:</p>
                                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                                  
                                    {Object.keys(pool["winners_details"]).map(position=>{
                                    return <WinnerComponent position={position} winner={pool["winners_details"][position]}/>
                                    
                                    })}

                                </div>

                                <div>
                                    <Link to={{
                                        pathname:"/poolWinnerPosts",
                                        obj:{
                                            _id:pool._id,
                                            name:pool.pool_name
                                        }
                                    }}><Button style={{margin:'20px'}}>Show Winners</Button> </Link>  
                                    <Button style={{margin:'20px'}} onClick={()=>{
                                        this.sendNotification(pool._id);
                                    }}>Send Notification</Button>
                                </div>
                                
                                 

                                
                            </div>
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        </>
    }
}

export default PoolWinnerPage;