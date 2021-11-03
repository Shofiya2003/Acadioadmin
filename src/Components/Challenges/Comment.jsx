/* eslint-disable react/require-render-return */
import axios from 'axios';
import React,{Component} from 'react';
import {Button} from 'react-bootstrap';
import status from '../status'
class Comment extends Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
       
        this.state={
            comment:this.props.comment,
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
        
        console.log(localStorage.getItem("id"));
        console.log(this.state.current_id);
        console.log(localStorage.getItem("token"));
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
            this.props.getComment(this.state.comment);
            this.setState({
                comment:""
            })
        }).catch(err=>{
            alert(err);
            console.log(err.response.data.message)
        })
    }
    render(){
        return(
            <>
                <div className="flex-justify-center">
                    <textarea placeholder="Comment" style={{height: "100px"}} value={this.state.comment} onChange={this.recordComment}></textarea>
                    <Button variant="outline-primary" size="sm" onClick={this.comment}>Comment</Button>
                </div>
            </>
        )
    }
}

export default Comment;