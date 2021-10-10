import React,{Component} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostBox from "./PostBox";
import "./styles.css"
import axios from "axios"
import Nav from "./nav";

class Display extends Component{
    constructor(){
        super();
        this.fetch=this.fetch.bind(this);
        this.state={
            mid:"0",
            entries:[],
            hasMore:true
        }

    }

   


    componentWillMount(){
        console.log("ENTER");
        this.fetch();
    }

    
        
       
    

    fetch(){
       var that=this;

        axios.post("http://contest-test-2.herokuapp.com/contest/getAllMainMid",
        {
            "uid":"6013bdbe824c8263693f8111",
            "mid":this.state.mid
        }
        ).then(response=>{
        console.log(response.data.message);
        if(response.data.message.length!==0){
            
            this.setState({
                entries:[...this.state.entries,...response.data.message],
                mid:response.data.message[response.data.message.length-1]._id
            }) 
        }else{
            console.log("FALSE");
            this.setState({hasMore:false});
        }
        
        }).catch(err=>{
        console.log(err);
        this.setState({hasMore:false})
    })

       
    }

    render(){
        return(
            <div>
                <Nav/>
                <h1 className="mt-3 text-center text-color pagehead">Posts</h1>
                <hr/>
                <InfiniteScroll
                    dataLength={this.state.entries.length}
                    next={this.fetch}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}

                >

               <div className="row ml-3 mr-3">
                  
                       
                       
                    {this.state.entries.map(obj=>{
                    return <div className="col-sm-6 col-lg-4 mt-3 mb-3">
                     <div className='card bg-white shadow rounded overflow-hidden'>
                         <PostBox cname={obj["cname"]}
                                academy={obj["academy"]}
                                certiBool={obj["certi_bool"]}
                                coverPic={obj["cover_pic"]}
                                curr={obj["curr"]}
                                desc={obj["desc"]}
                                end={obj["end"]}
                                endDate={obj["end_dt"]}
                                fees={obj["fees"]}
                                name={obj["name"]}
                                prize1={obj["prize1"]}
                                prize2={obj["prize2"]}
                                prize3={obj["prize3"]}
                                profilePic={obj["profile_pic"]}
                                talent={obj["talent"]}
                    ></PostBox>
                        </div> 
                        </div>
                    })}

                
                      
                   
                </div> 


                
                    
                </InfiniteScroll>
              
            </div>
        )
    }
}

export default Display;