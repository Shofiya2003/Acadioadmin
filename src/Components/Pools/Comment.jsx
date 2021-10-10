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
        
        console.log(this.props.id);
        console.log(this.state.comment);
        if(this.state.comment===''){
            alert('Write Comment');
            return;
        }
        
        axios.patch(status.baseUrl+'/poolPost/addComment',{
            id:this.props.id,
            comment:this.state.comment
        }).then(response=>{
            this.props.getComment(this.state.comment);
            this.setState({
                comment:""
            })
        }).catch(err=>{
            console.log(err.response);
        })
    }
    render(){
        return(
            <>
                <div className="flex-justify-center">
                    <input placeholder="Comment" onChange={this.recordComment}></input>
                    <Button variant="outline-primary" size="sm" onClick={this.comment} value={this.state.comment}>Comment</Button>
                </div>
            </>
        )
    }
}

export default Comment;