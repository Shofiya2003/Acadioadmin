import React,{Component} from "react";
import ReactPlayer from "react-player";
import {Card} from "react-bootstrap";
import "../styles.css"


import ReadMoreAndLess from 'react-read-more-less';

import axios from "axios";
import status from "./status";

class PostIndi extends Component{
    constructor(){
        super();
       
        this.state={
            profile_pic:"",
            
            
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


        
    





    render(){
        
        return(


            




            <Card className="card-body pt-2 pl-2 pb-0 bg-light">     
            <div>
                <div>
                    <div>
                        <h5 class="card-title">
                            <img className="profilePic" src={this.state.profile_pic} alt="profile_pic"/>
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

              



            </div>
        
                
           
            </div>
           
                
        </Card>
        )
    }
}

export default PostIndi;