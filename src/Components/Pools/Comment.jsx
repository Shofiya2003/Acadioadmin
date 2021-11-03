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
        console.log(this.props.comment);
    }
   
    recordComment(event){
      
        this.setState({
            comment:event.target.value,
            current_id:this.props.id
        })
    }

    comment(){
        
        console.log(this.props.id);
        console.log(this.state.comment);
        if(this.state.comment===''){
            alert('Write Comment');
            return;
        }
        // status.baseUrl+'/poolPost/addComment'
        axios.patch(status.baseUrl+'/poolPost/addComment',{
            declarer_id:localStorage.getItem("id"),
            id:this.props.id,
            comment:this.state.comment
        },
        {
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          }).then(response=>{
            alert(response.data.message);
        }).catch(err=>{
            console.log(err.response);
        })
    }
    render(){
        return(
            <>
                <div className="flex-justify-center">
                    <textarea placeholder="Comment" style={{height:"100px"}} onChange={this.recordComment} value={this.state.comment}></textarea>
                    <Button variant="outline-primary" size="sm" onClick={this.comment}>Comment</Button>
                </div>
            </>
        )
    }
}

export default Comment;