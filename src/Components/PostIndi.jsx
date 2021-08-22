import React,{Component} from "react";
import ReactPlayer from "react-player";
import {Card} from "react-bootstrap";
import "../styles.css"


import ReadMoreAndLess from 'react-read-more-less';

class PostIndi extends Component{
    constructor(){
        super();
        this.state={
            profile_pic:""
        }
    }

componentWillMount(){
    if(this.props.post.profile_pic===null || this.props.post.profile_pic==="" || this.props.post.profile_pic===undefined){
        this.setState({
            profile_pic:"https://zsquare-contest.s3.ap-south-1.amazonaws.com/images/profile_pic2.png"
        })   
    }else{
        this.setState({
            profile_pic:this.props.post.profile_pic
        })
    }
}

    render(){
        return(
            <div className="col-sm-6 col-lg-4 mt-3 mb-3">
            <div className="card bg-white">
                <div className="card-body">
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

            </div>
        



           
            </div>
        </div>
        )
    }
}

export default PostIndi;