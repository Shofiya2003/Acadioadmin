import React,{Component} from "react";
import ReactPlayer from "react-player";
import ReadMoreAndLess from "react-read-more-less";
import status from "../status";
class WinnerPost extends Component{


    constructor(props){
        super();
        this.winner=props.winner
        this.state={
            profile_pic:""
        }
    }


    componentDidMount(){
        if(this.winner.profile_pic===null || this.winner.profile_pic==="" || this.winner.profile_pic===undefined){
            this.setState({
                profile_pic:status.s3_url+"images/profile_pic2.png"
            })   
        }else{
            this.setState({
                profile_pic:status.s3_url+this.winner.profile_pic
            })
        }
    }
    render(){
        
            return <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
            <div className="card bg-white">
                <div className="card-body">
                    <div>
                        <h5 class="card-title">
                            <img className="profilePic" src={this.state.profile_pic} alt="profile_pic"/>
                            <span className="name">{this.winner.name}</span>
                        </h5>
                    </div>
                </div>

                {this.winner.post_type==='I' ?
                    <img
                    
                    class="card-img-top card_img"
                    src={this.winner.path}
                    alt=""
                />
                    :

                    null

                   
            }

{this.winner.post_type==='V' ?
                   <ReactPlayer
                    className="videoPlayer"
                    controls
                    url={this.winner.path}
                   ></ReactPlayer>
                    :

                    null

                   
            }

            <div className="card-body caption">

            
                {this.winner.caption===undefined ?
                    <> </>
                    :
                    <ReadMoreAndLess 
                        res={this.ReadMore}
                        className="read-more-content"
                        charLimit={150}
                        readMoreText="Read more"
                        readLessText="Read less"
                        
                    >
                        {this.winner.caption}
                    </ReadMoreAndLess>
                
                
                
                }
            </div>
            </div>
        </div>
    }
}

export default WinnerPost;