/* eslint-disable react/require-render-return */
import axios from 'axios';
import React,{Component} from 'react';
import {Button} from 'react-bootstrap';
import status from '../status'
class Comment extends Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super();
       
        this.state={
            comment:"",
            current_id:""
        }
        this.recordComment=this.recordComment.bind(this);
        this.comment =this.comment.bind(this);
    }
   
    recordComment(event){
      
        this.setState({
            comment:event.target.value,
            current_id:this.props.id
        })
    }

    comment(){
        
        console.log(this.state.current_id)
        if(this.state.comment===''){
            alert('Write Comment');
            return;
        }
        axios.patch(status.baseUrl+'/challengePost/addComment',{
            declarer_id:localStorage.getItem("id"),
            id:this.state.current_id,
            comment:this.state.comment
        },
        {
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          }).then(response=>{
            alert(response.data.message);
        }).catch(err=>{
            alert(err);
            console.log(err.response.data.message)
        })
    }
    render(){
        return(
            <>
                <div className="flex-justify-center">
                    <input placeholder="Comment" onChange={this.recordComment}></input>
                    <Button variant="outline-primary" size="sm" onClick={this.comment}>Comment</Button>
                </div>
            </>
        )
    }
}

export default Comment;