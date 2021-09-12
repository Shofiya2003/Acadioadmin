import axios from "axios";
import React,{Component} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChallengeBox from "../../Components/Challenges/ChallengeBox";
import "../../styles.css";


 class DisplayChallenges extends Component{

    constructor(){
        super();
        this.fetch=this.fetch.bind(this)
        this.state={
            hasMore:true,
            mid:"0",
            entries:[]
        }
    }

    componentDidMount(){
        console.log("ENTER");
        this.fetch();
    }


    fetch(){
        axios.post("http://contest-test-2.herokuapp.com/challenge/getAllMid_filter",{
            "talent":"",
            "mid":this.state.mid,
            "uid":"6080867f28ee66187a2d4cc5"
        }).then(res=>{
            if(res.data.message.length!==0){
                this.setState({
                    entries:[...this.state.entries,...res.data.message],
                    mid:res.data.message[res.data.message.length-1]._id
                })
            }else{
                this.setState({hasMore:false})
            }
        }).catch(err=>{
            this.setState({hasMore:false})
            console.log(err);
        })
    }



    render(){
        return(
            <div>
                <h1>Display Challenges</h1>
                <select>
                    
                    <option id="talent" value="">ALL</option>
                    <option id="talent" value="FULL">FULL</option>
                    <option id="talent" value="OPEN">OPEN</option>
                   
               </select>
                <InfiniteScroll 
                    dataLength={this.state.entries.length}
                    next={this.state.mid!=="0" ? this.fetch:null}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                >
                
                    <div className="challengeContainer row ml-3 mr-3">
                    {this.state.entries.map(obj=>{
                        return <ChallengeBox
                            obj={obj}
                            

                        >

                        </ChallengeBox>
                    })}

                </div>

                </InfiniteScroll>
            </div>
        )
    }
}

export default DisplayChallenges;