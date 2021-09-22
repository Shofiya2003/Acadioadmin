import React,{Component} from "react";
import {Card} from "react-bootstrap"
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PostIndi from "../PostIndi";
import status from '../status';
import {Button, Modal, Alert, Spinner, ProgressBar} from 'react-bootstrap';
import Nav from "../../nav"

class PoolPage extends Component{

    constructor(props){
        super(props);
        
        this.state={
            posts:[],
            hasMore:true,
            mid:"0",
            currentPos:1,
            position:[""],
            selected:[], 
            winners:{},
            currentWinneruid:"",

            showModal: false,
            coverUrl: "",
            error: false,
            completePercent: 0,
            imageHash: Date.now()
        }

        this.fetch=this.fetch.bind(this);
        this.addPosition=this.addPosition.bind(this);
        this.removePosition=this.removePosition.bind(this);
        this.onTick=this.onTick.bind(this);
        this.submit=this.submit.bind(this);

        this.editCoverPic = this.editCoverPic.bind(this);

        //modal methods for edit cover_pic
        this.editProfile = this.editProfile.bind(this)
        this.handleCoverClose = this.handleCoverClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCoverShow = this.handleCoverShow.bind(this)
        this.handleUpload = this.handleUpload.bind(this)

    }

    handleChange = (ev) => {
        this.setState({error: false, coverUrl: ""}); 
    } 

    handleCoverShow() {
        console.log("Edit : "+this.state.showModal);
        this.setState({showModal: true});
    }

    handleCoverClose() {
        this.setState({showModal: false})
    }

    // Perform the upload
    handleUpload = (ev) => {    
        this.setState({completePercent: 10})
        let file = this.uploadInput.files[0];
        // Split the filename to get the name and type
        let fileParts = this.uploadInput.files[0].name.split('.');
        console.log("HERE 1");
        var pool_name = this.props.location.obj.pool.pool_name.replace(/ +/g, "");
        // var academy = status.website.replace(/ +/g, "");
        var uid = localStorage.getItem("id");
        let fileName = "pools_cover_pic/" + pool_name + "_" + this.props.location.obj.pool._id.substring(15, 21) + "_" + Math.floor(Math.random() * 101);
        let fileType = fileParts[fileParts.length-1];   
        //console.log("Preparing the upload : "+fileName+"   "+file);
        axios.post(status.baseUrl+"/sign_s3",{
        fileName : fileName,
        fileType : fileType,
        uid : localStorage.getItem("id")
        }, {
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          })
        .then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        this.setState({coverUrl: fileName})
        //console.log("Recieved a signed request " + signedRequest);
            // Put the fileType in the headers for the upload
        var options = {
            headers: {
            'Content-Type': fileType
            }
        };
        axios.put(signedRequest,file,options)
        .then(result => {
            //console.log("Response from s3")
            this.setState({completePercent: 50})
            this.editProfile()
        })
        .catch(error => {
            //alert("ERROR " + JSON.stringify(error));
        })
        })
        .catch(error => {
        //alert(JSON.stringify(error));
        })
    }

    editProfile() {
        this.setState({completePercent: 60})

        //console.log(this.props.location.state._id + " is cid")
        console.log("NEW COVER : "+this.state.coverUrl);
        console.log("OID : "+localStorage.getItem("id"));
        axios.put(status.baseUrl+'/pool/editCoverPic', {
            pool_id : this.props.location.obj.pool._id,
            cover_pic: this.state.coverUrl,
            oid: localStorage.getItem("id")
        },{
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          })
        .then(response => {
            console.log("Cover Pic updated");
            if(response.data.message === "UPDATED") {
              this.setState({data: {...this.state.posts, cover_pic: this.state.coverUrl}, imageHash: Date.now(), error: false, completePercent: 100})
              this.handleCoverClose()
              //console.log(this.state.coverUrl + " is cover url")
            }  
            else {
                this.setState({error: true, completePercent: 0})
            }
      })
        .catch(error => {
            console.log(JSON.stringify(error));
            this.setState({error: true, completePercent: 0})
            
        })
    }



    componentDidUpdate(){
    //    console.log(this.state.selected);
       console.log("POOL : "+JSON.stringify(this.props.location.obj.pool));
    }

    

    fetch(){
        
        axios.post("http://contest-test-2.herokuapp.com/poolPost/getAllPost_ofPool",{
        
            "pool_id":this.props.location.obj.pool._id,
            "uid":localStorage.getItem("id"), 
            "mid":this.state.mid
        }).then(response=>{
            if(response.data.message.length!==0){
                console.log("RES : " + JSON.stringify(response.data.message));
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


    editCoverPic()
    {
        console.log("EDIT");
    }


    render(){

        const ErrorMessage = () => (
            <div style={{padding:50}}>
              <h6 style={{color: 'red'}}>Something went Wrong, Please Try Again!</h6>
              <br/>
            </div>
          )

        return(
            <>

            {/* modal for edit cover pic  */}
                   
            <Modal animation={false} show={this.state.showModal} onHide={this.handleCoverClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Cover Photo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br/>
                        <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
                        <br/><br/>
                        <div>
                            <ProgressBar striped variant="success" now={this.state.completePercent}  label={`${this.state.completePercent}%`}/>
                        </div>
                    {this.state.error ? <ErrorMessage /> : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCoverClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={this.handleUpload}>
                        Update
                        </Button>
                    </Modal.Footer>
                    </Modal>
                    
                 <Card>
                     
                    <Card.Body>
                        
                    
                       
                
                <Nav/>
                
                {/* <img height="30" width="30" scr={(this.props.location.obj.pool.coverPic===null || this.props.location.obj.pool.coverPic===undefined || this.props.location.obj.pool.coverPic==="") ? status.s3_url + this.props.location.obj.pool.coverPic : status.s3_url + "images/profile_bg.jpeg"} alt="cover pic"/>                   */}
                <div className="section no-padding">
                    <div className="container-fluid no-padding bg-grey-lighter">
                        <div className="row align-items-center no-margin">
                            <div className="col-12 col-lg-5 mt-2 no-padding">
                            
                            <img
                                style={{width : "100%", height : "auto"}}
                                class="card-img-top card_img bg-white shadow rounded overflow-hidden"
                                alt=""
                                src={(this.props.location.obj.pool.cover_pic===null || this.props.location.obj.pool.cover_pic===undefined || this.props.location.obj.pool.cover_pic==="") ? status.s3_url + "images/profile_bg.jpeg" : `${status.s3_url + this.props.location.obj.pool.cover_pic}?${this.state.imageHash}`}
                            />
                   
                            </div>

                            <div className="col-12 col-lg-6 mt-3 no-margin no-padding text-center">
                                <div className="padding-50">
                                    <div className="bg-white shadow rounded overflow-hidden pb-3">
                                        <h4 className="font-weight-normal text-color cname">{this.props.location.obj.pool.pool_name}</h4>
                                        <br/>
                                        <br/>
                                        <div className="drop-shadow2 card-zoom ml-4 mr-4 pb-2 pt-2">
                                        <h5 className="card-title text-dark">
                                            <span className="ml-2 post_name"></span>
                                            <img src={this.state.profile_pic} style={{height:"30px", float:"left" ,marginRight:"20px"}}/>
                                        </h5>
                                        </div>
                                        <div className="font-weight-light mt-4 mr-2 desc desc-wrap">
                                        <p>End-Date: {this.props.location.obj.pool.end_date}</p>
                                        <p>Fees: {this.props.location.obj.pool.fees}</p>
                                        <p>Curr: {this.props.location.obj.pool.curr}</p>
                                        <p>Prize-Pool:{this.props.location.obj.pool.prize_pool}</p>
                                        <p>Slots:{this.props.location.obj.pool.total_slots}</p>
                                        <p>Max Entries:{this.props.location.obj.pool.max_entries}</p>
                                        <p>No of Winners:{this.props.location.obj.pool.no_of_winners}</p>
                                        <p>Win Percent:{this.props.location.obj.pool.win_percent}</p>
                                        <p>Rules:{this.props.location.obj.pool.rules}</p>
                                        <p>Slots Filled:{this.props.location.obj.pool.slots_filled}</p>
                                        <p>End:{this.props.location.obj.pool.end}</p>
                                        <p>Talent: {this.props.location.obj.pool.talent}</p>
                                        <p>Your Entries:{this.props.location.obj.pool.your_entries}</p>
                                        </div>
                                        <hr/>
                                        <Button onClick={this.handleCoverShow}>Edit Cover Pic</Button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                
              
               


               


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
                    <Button onClick={this.addPosition} variant="primary" style={{marginRight:"15px",marginLeft:"15px"}}>Add</Button>
                    <Button variant="outline-danger" onClick={this.removePosition} disabled={this.state.currentPos===1}>Remove</Button>
                </div>

                <Button onClick={this.submit} variant="outline-primary" size="lg" type="button" style={{margin:"50px"}}>Submit</Button>
                
                <div className="row ml-3 mr-3">
                         
                    <InfiniteScroll
                        dataLength={this.state.posts.length}
                        next={this.fetch}
                        hasMore={this.state.hasMore}
                        loader={<h4>Loading...</h4>}
                    >
                         
                            
                            {this.state.posts.map((post,index)=>{
                        
                            const key=post._id.concat(this.state.position[this.state.currentPos-1]===post._id).concat(this.state.selected[this.state.currentPos-2]===post._id);

                            return <div className="col-sm-6 col-lg-4 mt-3 mb-3">
                            <div className='card bg-white shadow rounded overflow-hidden'>
                            <PostIndi key={key} post={post} onTick={this.onTick} s={this.state.position} selected={this.state.position[this.state.currentPos-1]===post._id} disabled={this.state.selected}></PostIndi>
                            </div>
                            </div>   
                               
                                
                        })}


                        

                
                    
                    </InfiniteScroll>
                </div>
            </>
        )
    }
}

export default PoolPage;