import React,{Component} from "react";
import {Card} from "react-bootstrap"
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PostIndi from "../PostIndi";

class PoolPage extends Component{

    constructor(){
        super();
        this.fetch=this.fetch.bind(this);
        this.addPosition=this.addPosition.bind(this);
        this.removePosition=this.removePosition.bind(this);
        this.onTick=this.onTick.bind(this);
        this.submit=this.submit.bind(this);
        this.state={
            posts:[],
            hasMore:true,
            mid:"0",
            currentPos:1,
            position:[""],
            selected:[], 
            winners:{},
            currentWinneruid:""

        }
    }



    componentWillMount()
    {
        console.log("ENTER");
        
    }

    componentDidUpdate(){
       console.log(this.state.selected);
    }

    

    fetch(){
        
        axios.post("http://contest-test-2.herokuapp.com/poolPost/getAllPost_ofPool",{
        
            "pool_id":this.props.location.obj.pool._id,
            "uid":localStorage.getItem("id"), 
            "mid":this.state.mid
        }).then(response=>{
            if(response.data.message.length!==0){
            
                this.setState({
                    posts:[...this.state.posts,...response.data.message],
                    mid:response.data.message[response.data.message.length-1]._id
                }) 
            }else{
                this.setState({hasMore:false});
                console.log("FALSE");
               
            }
             
           

        }).catch(err=>{
            this.setState({hasMore:false});
            console.log(err);
            
        })
    }



    //Add position

    addPosition(){


        if(this.state.position[this.state.currentPos-1].length===0){
            alert("Select rank "+this.state.currentPos);
            return;
        }else{
            this.state.selected[this.state.currentPos-1]=this.state.position[this.state.currentPos-1];
            this.setState({
                currentPos:this.state.currentPos+1,
                position:[...this.state.position,""],
                
                winners:{...this.state.winners,[this.state.currentPos.toString()]:{
                    pid:this.state.position[this.state.currentPos-1],
                    uid:this.state.currentWinneruid
                }},
                currentWinneruid:""
            });
        }
        

    
    }


    //Remove Position

    removePosition(){
       
        this.state.position[this.state.currentPos-2]="";
        delete this.state.winners[this.state.currentPos-1];
        this.setState({
            currentPos:this.state.currentPos-1,
            position:this.state.position.slice(0,this.state.position.length-1),
            selected:this.state.selected.splice(0,this.state.selected.length-1),
            winners:this.state.winners
        });
    }


    //Handle Tick

    onTick(pid,uid){
        if(this.state.position[this.state.currentPos-1]===pid){
            this.state.position[this.state.currentPos-1]="";
        }else{
            this.state.position[this.state.currentPos-1]=pid;
        }
        

        this.setState({
            position:this.state.position,
            currentWinneruid:uid
        });

        return this.state.position[this.state.currentPos-1];

    }


    //On Submit post request

    submit(){
        if(Object.keys(this.state.winners).length===0){
            alert("Select Winners");
            return;
        }

        axios.post("http://contest-test-2.herokuapp.com/poolwinner/create",{
            pool_id:this.props.location.obj.pool._id,
            oid:localStorage.getItem("id"),
            winners:this.state.winners
        }).then(res=>{
            window.location.assign("/home");
        }).catch(err=>{
            alert(err.response.data.message)
            console.log(err.response.data.message)
        })
        const obj={
            pool_id:this.props.location.obj.pool._id,
            oid:localStorage.getItem("id"),
            winners:this.state.winners
        }
        
        console.log(obj);
    }



    render(){
        return(
            <div>
                 <Card style={{ width: '18rem' }} >
                    
                    <Card.Body>
                       
                    <p>Pool Name: {this.props.location.obj.pool.pool_name}</p>
                  
                <img scr={this.props.location.obj.pool.coverPic} alt="cover pic"/>                  
            
                <p>Talent: {this.props.location.obj.pool.talent}</p>
                <p>End-Date: {this.props.location.obj.pool.end_date}</p>
                <p>Fees: {this.props.location.obj.pool.fees}</p>
                <p>Curr: {this.props.location.obj.pool.curr}</p>
                <p>Prize-Pool:{this.props.location.obj.pool.prize_pool}</p>
                <p>Slots:{this.props.location.obj.pool.total_slots}</p>
                <p>Max Entries:{this.props.location.obj.pool.max_entries}</p>
                <p>No of Winners:{this.props.location.obj.pool.no_of_winners}</p>
                <p>Win Percent:{this.props.location.obj.pool.win_percent}</p>


                <table>
                <th>WINNINGS TABLE</th>
                <tr>
                    <td>Position</td>
                    <td>Winnings</td>
                    
                    </tr>
                    {Object.keys(this.props.location.obj.pool.winnings).map(key=>{
                    
                    return <tr>
                    <td>{key}</td>
                    <td>{this.props.location.obj.pool.winnings[key]}</td>
                </tr>
                })}
                </table>

                <p>Rules:{this.props.location.obj.pool.rules}</p>
                <p>Slots Filled:{this.props.location.obj.pool.slots_filled}</p>
                <p>End:{this.props.location.obj.pool.end}</p>
                <p>--v:{this.props.location.obj.pool.__v}</p>
                <p>Your Entries:{this.props.location.obj.pool.your_entries}</p>
                  
                 
                    </Card.Body>
    
                    
                    </Card>

                    <div>
                    <table>
                        <td>
                            {this.state.position.map((position,index)=>{
                                return <tr>
                                    { (this.state.selected.includes(position)) ? <p>Rank {index+1}</p>:<p>Select Rank {index+1}</p>}
                                    
                                    {this.state.posts.map(post=>{
                                        if(post._id===position){

                                            return <div key={post._id}>
                                                <p style={{fontSize:"16px"}}>{post.name}
                                                
                                                <img style={{height:"100px"}} src={post.profile_pic===null || post.profile_pic==="" || post.profile_pic===undefined ? 
                                                "https://zsquare-contest.s3.ap-south-1.amazonaws.com/images/profile_pic2.png"
                                                :
                                                post.profile_pic
                                            }
                                                
                                                alt="_pic"></img>

                                                </p>
                                            </div>
                                        }
                                        return null;
                                    })}
                                    </tr>

                            })}

                           
                          
                        </td>
                        
                    </table>
                    <button onClick={this.addPosition} className="add_button">Add</button>
                    <button className="add_button" onClick={this.removePosition} disabled={this.state.currentPos===1}>Remove</button>
                </div>

                <button onClick={this.submit} type="button" style={{margin:"50px"}}>Submit</button>
                    <h1>Posts</h1>

                    <InfiniteScroll
                        dataLength={this.state.posts.length}
                        next={this.fetch}
                        hasMore={this.state.hasMore}
                        loader={<h4>Loading...</h4>}
                    >
                         <div className="row ml-3 mr-3">
                            
                            {this.state.posts.map((post,index)=>{
                        
                            const key=post._id.concat(this.state.position[this.state.currentPos-1]===post._id).concat(this.state.selected[this.state.currentPos-2]===post._id);

                            return <PostIndi key={key} post={post} onTick={this.onTick} s={this.state.position} selected={this.state.position[this.state.currentPos-1]===post._id} disabled={this.state.selected}></PostIndi>
                               
                               
                                
                        })}


                        

                    </div>
                    
                    </InfiniteScroll>

                    
            </div>
        )
    }
}

export default PoolPage;