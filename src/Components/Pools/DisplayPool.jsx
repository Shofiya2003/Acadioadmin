import axios from "axios";
import React,{Component} from "react";
import PoolBox from "../Pools/PoolBox";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../styles.css"
class DisplayPool extends Component{
    constructor(){

        super();
        this.fetch=this.fetch.bind(this);
        this.state={
            mid:"0",
            entries:[],
            hasMore:true
        }
    }


    componentDidMount(){
        this.fetch();
    }

    

    componentDidUpdate(){
        console.log(this.state.entries);
        console.log(this.state.mid);
    }

    


    fetch(){
        console.log("mid"+this.state.mid);
        axios.post("http://contest-test-2.herokuapp.com/pool/getAllMid_filter",{
            "talent":"",
            "mid":this.state.mid,
            "uid":"6080867f28ee66187a2d4cc5"
        }).then(res=>{
           
            if(res.data.message.length!==0){
                this.setState({
                    entries:[...this.state.entries,...res.data.message],
                    mid:res.data.message[res.data.message.length-1]._id
                });
                
            }else{
                this.setState({
                    hasMore:false
                })
                console.log("FALSE")
               
            }
        }).catch(err=>{
            this.setState({hasMore:false})
            console.log(err);
            
        })

    }



    render(){
        return(
            <div >
                <h1>Display Pool</h1>
                
                <InfiniteScroll 
                    dataLength={this.state.entries.length}
                    next={this.state.mid!=="0" ? this.fetch:null}
                    
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                >
                
                <div className="poolContainer">
               
                {this.state.entries.map(obj=>{
                    return <PoolBox 
                        obj={obj}
                        poolName={obj["pool_name"]}
                        coverPic={obj["cover_pic"]}
                        talent={obj["talent"]}
                        endDate={obj["end_dt"]}
                        fees={obj["fees"]}
                        curr={obj["curr"]}
                        prizePool={obj["prize_pool"]}
                        totalSlots={obj["total_slots"]}
                        maxEntries={obj["max_entries"]}
                        noOfWinners={obj["no_of_winners"]}
                        winPercent={obj["win_percent"]}
                        winnings={obj["winnings"]}
                        rules={obj["rules"]}
                        slotsFilled={obj["slots_filled"]}
                        end={obj["end"]}
                        v={obj["__v"]}
                        yourEntries={obj[ "your_entries"]}
                    
                    
                    />

                   
                })}
                
                </div>
                </InfiniteScroll>
               
            </div>
        )
    }
}

export default DisplayPool;