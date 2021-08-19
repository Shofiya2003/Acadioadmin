import React,{Component} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios"

class Display extends Component{
    constructor(){
        super();
        this.fetch=this.fetch.bind(this);
        this.state={
            mid:"0",
            entries:[]
        }

    }

    componentDidMount(){
        console.log(this.state.mid);
        console.log(this.state.entries);
        
    }

    
        
       
    

    fetch(){


        axios.post("http://contest-test-2.herokuapp.com/contest/getAllMainMid",
        {
            "uid":"6013bdbe824c8263693f8111",
            "mid":this.state.mid
        }
        ).then(response=>{
        console.log(response);
        this.setState({
            entries:[...this.state.entries,response.data.message],
            mid:this.response.data.message[response.data.message-1]._id
        })
        }).catch(err=>{
        console.log(err);
    })

       
    }

    render(){
        return(
            <div>
                <InfiniteScroll
                    dataLength={this.state.entries.length}
                    next={this.fetch()}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}

                >

                    {this.state.entries.map(obj=>{
                        const {academy}=obj;
                         return <h1>Hello</h1>
                    })}
                    
                </InfiniteScroll>
            </div>
        )
    }
}

export default Display;