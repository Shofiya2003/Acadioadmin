import React,{Component} from "react";
import ReactPlayer from "react-player";
import {Card} from "react-bootstrap";

import Modal from "react-modal";

import ReadMoreAndLess from 'react-read-more-less';
import {Button} from "react-bootstrap";
import status  from "../status";
import axios from "axios";

class PostIndi extends Component{
    constructor(){
        super();
       this.handleChange=this.handleChange.bind(this);
       this.handleCoverClose=this.handleCoverClose.bind(this);
        this.state={
            profile_pic:"",
            deleteModalIsOpen:false,
            password:"",
            _idToBeDeleted:"",
            uidOfDeletedPost:"",
            showErrorMessage:false,
        }

       
    }



componentWillMount(){
    
    if(this.props.post.profile_pic===null || this.props.post.profile_pic==="" || this.props.post.profile_pic===undefined){
        this.setState({
            profile_pic:status.s3_url+"images/profile_pic2.png"
        })   
    }else{
        this.setState({
            profile_pic:status.s3_url+this.props.post.profile_pic
        })
    }

    

}

toDelete(event,id,uid){
    console.log(id+" "+uid);
    this.setState({
        deleteModalIsOpen:true,
        _idToBeDeleted:id,
        uidOfDeletedPost:uid
    });
}

handleChange(event){
    this.setState({
        password:event.target.value,
    })
    if(event.target.value==="Acadio@123" || event.target.value===""){
        this.setState({
            showErrorMessage:false
        });
        return;
    }else{
        this.setState({
            showErrorMessage:true,
        });
    }
    
}


onClickSubmit(){
    if(this.state.password!=="Acadio@123"){
        this.setState({
            showErrorMessage:true
        });
        return;
    }else{
        this.setState({
            showErrorMessage:false,
        });
    }
    const url=status.baseUrl+"/post/deleteById/"+this.state._idToBeDeleted;
    axios.delete(url,{
        uid:this.state.uidOfDeletedPost,
        id:this.state._idToBeDeleted
        
    }).then(response=>{
        alert(response.data.message);
        this.setState({
            deleteModalIsOpen:false,
        });
        window.location.assign('/home');
        
    }).catch(err=>{
        console.log(err);
    })
}

handleCoverClose(){
    this.setState({
        deleteModalIsOpen:false
    })
}



    render(){
        
        return(


            




            <Card className="card-body pt-2 pl-2 pb-0 bg-light">
                <Modal isOpen={this.state.deleteModalIsOpen} aria-labelledby="contained-modal-title-vcenter" centered>
                    
                        <h1>Enter the Password:</h1>
                   
                    
                        <br/>
                        <input onChange={this.handleChange} type="text"/>
                        <p style={!this.state.showErrorMessage?{display:"none"}:null}>Wrong Password</p>
                        <br/><br/>
    
                  
                  
                        <Button variant="secondary" onClick={this.handleCoverClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={()=>{
                            this.onClickSubmit()
                        }}>
                        Ok
                        </Button>
                  
                    </Modal>
            <div>
                <div>
                    <div>
                        <h5 class="card-title">
                            <img className="profilePic" src={this.state.profile_pic}/>
                            <span className="name">{this.props.post.name}</span>
                        </h5>
                    </div>
                </div>

                {this.props.post.post_type==='I' ?
                    <img
                    
                    class="card-img-top card_img"
                    src={this.props.post.path}
                    alt=""
                />
                    :

                    null

                   
            }

{this.props.post.post_type==='V' ?
                   <ReactPlayer
                    className="videoPlayer"
                    controls
                    url={this.props.post.path}
                   ></ReactPlayer>
                    :

                    null

                   
            }

            <div className="card-body caption">

            
                {this.props.post.caption===undefined ?
                    <> </>
                    :
                    <ReadMoreAndLess 
                        res={this.ReadMore}
                        className="read-more-content"
                        charLimit={150}
                        readMoreText="Read more"
                        readLessText="Read less"
                        
                    >
                        {this.props.post.caption}
                    </ReadMoreAndLess>
                
                
                
                }

                <input type="checkbox" id="winner" checked={this.props.s.includes(this.props.post._id)? true:null} disabled={this.props.disabled.includes(this.props.post._id)? true:null} onChange={()=>{
                    this.props.onTick(this.props.post._id,this.props.post.uid);

                }}></input>




            </div>
        
                
           
            </div>
            <Button variant="danger" onClick={(event)=>{
                this.toDelete(event,this.props.post._id,this.props.post.uid);
            }}>Delete</Button>
                
        </Card>
        )
    }
}

export default PostIndi;