import React,{Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import WinnerComponent from "../ChallengeWinners/WinnerComponent";
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
        axios.post("http://contest-test-2.herokuapp.com/pool/getEndedMid_filter",{
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
        axios.post("http://contest-test-2.herokuapp.com/notifi/sendNotifi_PoolWinners",{
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
            <h1>POOL WINNERS</h1>
            <div>
                <InfiniteScroll
                    dataLength={this.state.winners.length}
                    next={this.state.mid!=="0" ? this.fetch:null}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                >

                    <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap"}}>

               
                        {this.state.winners.map(pool=>{
                           
                            return <div style={{border:"1px solid black", fontSize:"16px", margin:"10px",flexBasis:"40%",paddingLeft:"10px"}}>
                                <h2>Pool Name: {pool["pool_name"]}</h2>
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
                                
                                 <Link to={{
                                     pathname:"/poolWinnerPosts",
                                     obj:{
                                         _id:pool._id,
                                         name:pool.pool_name
                                     }
                                 }}><button>Show Winners</button> </Link>  
                                <button style={{margin:'20px'}} onClick={()=>{
                                    this.sendNotification(pool._id);
                                }}>Send Notification</button>

                                
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        </>
    }
}

export default PoolWinnerPage;