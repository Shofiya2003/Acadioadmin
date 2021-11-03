import axios from "axios";
import React,{Component} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import status from "../status";
import WinnerPost from "./WinnerPost";


class PoolWinnerPosts extends Component{

    constructor(){
        super();
        this.fetch=this.fetch.bind(this);
        this.addAmountToObject=this.addAmountToObject.bind(this);
        this.toPay=this.toPay.bind(this);
        this.state={
            mid:"1",
            hasMore:true,
            winners:[],
            prize:{},
            rankAmount:{}
        }
    }


    componentDidMount(){
        console.log("ENTER");
        this.fetch();
        
    }

    componentDidUpdate(){
        console.log(this.state.prize)
    }
    fetch(){
        axios.post(status.baseUrl+"/poolwinner/getWinnersPost_ofPool_byrank",{
            "pool_id":this.props.location.obj._id,
            "mid":this.state.mid
        }).then(response=>{
            console.log(response.data.message.length);
            if(response.data.message.length!==0){
               
                this.setState({
                    winners:[...this.state.winners,...response.data.message],
                    mid:(response.data.message[response.data.message.length-1].rank)+1,
                })
            }else{
                this.setState({
                    hasMore:false
                })
                console.log("FALSE");
            }
        }).catch(err=>{
            this.setState({
                hasMore:false
            })
            console.log(err);
        })
    }

    recordAmount(event,rank){
        console.log(event.target.value);
        console.log(rank);
        this.setState({
            rankAmount:{...this.state.rankAmount,[rank]:event.target.value}
        })
    }


    //On Clicking OK Button

    addAmountToObject(rank,pid,uid){
        if(!this.state.rankAmount[rank]){
            alert("Add amount for rank "+rank);
            return;
        }
        this.setState({
            prize:{...this.state.prize,[rank.toString()]:{
                pid:pid,
                uid:uid,
                amt:parseInt(this.state.rankAmount[rank])
            }}
        })
    }

    //For payment

    toPay(){
        if(Object.keys(this.state.prize).length===0){
            alert("Add amount");
            return;
        }

       Object.keys(this.state.prize).forEach(key=>{
           if(!this.state.prize[key]){
               alert("Please fill the amount for rank "+key);
               return;
           }
       });

       if(this.state.winners.length!==Object.keys(this.state.prize).length){
           alert("Enter amount for all positions");
           return;
       }
       

        axios.post(status.baseUrl+"/poolwinner/payPoolWinners",{
            declarer_id:localStorage.getItem("id"),
            pool_id:this.props.location.obj._id,
            winners:this.state.prize,
            secret:"Pay@Acadio@Pool",
        }, {
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          }).then(res=>{
            alert(res.data.message);
        }).catch(error=>{
            alert(error.response.data.message);
        })

    
    }


    render(){
        return <>
            <div>
                <h1>POOL WINNERS</h1>
                <h2>{this.props.location.obj.name}</h2>
                <table>
                    <tr>
                        <td>Position</td>
                        <td>Amount</td>
                    </tr>

                    {Object.keys(this.state.prize).map(key=>{
                        return <tr>
                            <td>{key}</td>
                            <td>{this.state.prize[key].amt}</td>
                        </tr>
                })}
                </table>

                <button onClick={this.toPay}>Pay</button>
                
                <InfiniteScroll
                    dataLength={this.state.winners.length}
                    next={this.state.mid!=='1'?this.fetch:null}
                    loader={<h4>Loading...</h4>}
                    hasMore={this.state.hasMore}
                >
                  <div  style={{display:"flex",flexWrap:'wrap'}}>  
                    {this.state.winners.map(winner=>{
                        return <div style={{flexBasis:"30%",margin:"20px",border:"2px solid black"}}>
                                <WinnerPost winner={winner} style={{flexBasis:"30%",}}/>
                                <input onChange={(event)=>{
                                    this.recordAmount(event,winner.rank);
                                }} type="number" class="amount" placeholder="Amount"></input>
                                <button className="amount_button" onClick={()=>{
                                    this.addAmountToObject(winner.rank,winner._id,winner.uid);
                                }} type="button">OK</button>
                        </div>
                        
                        
                    })}

                 </div>
                </InfiniteScroll>
            </div>
        </>
    }
}

export default PoolWinnerPosts;