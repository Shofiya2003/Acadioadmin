import React,{Component} from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../styles.css"


class Pool extends Component{
  
  constructor(){
    super();
    
    this.handleClick=this.handleClick.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleChangeAll=this.handleChangeAll.bind(this);
    this.remove=this.remove.bind(this);
    this.toCloseModal=this.toCloseModal.bind(this);
    this.toOpenModal=this.toOpenModal.bind(this);
    this.updateEditedWinningNumber=this.updateEditedWinningNumber.bind(this);
    this.isCalled=true;
   
    this.finalDetails={};
    this.state={
      
     count:1,
     winningNumber:0,
     winnings:{},
     details:{oid:localStorage.getItem("id")},
     modalIsOpen:false,
     keyOfEditObject:0,
     editedWinningNumber:0,
     disabled:false
    }

   
  }
 
 
//TO keep Track of component
  componentDidUpdate() {
    if(this.isCalled){
      if(this.state.details.hasOwnProperty("winnings")){
        axios.post("https://contest-test-2.herokuapp.com/pool/create",this.state.details).then(response=>{
          this.isCalled=false;
          this.setState((prevState)=>({
            ...prevState,
          }))
          
          console.log(response);
          alert(response.data.message);
          this.isCalled=false;
          this.setState(prevState=>({
            disabled:false
          }))
          this.onSuccess(response.status);
          
        }).catch(err=>{
            this.isCalled=false;
          this.setState(prevState=>({
            disabled:false
          }))
          
          console.log(err.response)
          alert(err.response.data.message)
          this.isCalled=true;
        })

        
       
      }
    }
   
  }



  //OnSuccess
  onSuccess(status){
      if(status===200){
          console.log("Success");
          window.location.assign("/home")
      }
  }






//Handle Chnage for all inputs  
  handleChangeAll(event){
    let value=event.target.value;
   
    const id=event.target.id;
    console.log(value);
    console.log(id);
    if(!isNaN(value)) {
      value=parseInt(value)
    }
    this.setState(prevState=>({
      ...prevState,
      details:{...this.state.details,[id]:value}
    }))

    
  }
    
  
 
//Handle change on winnings input
  handleChange(event){
    const newValue=event.target.value;
    this.setState(prevState=>({
         ...prevState,
         winningNumber:newValue
    }))

    
    
  }

  //Click on Add button
  handleClick(){
    this.setState(prevState=>({
      ...prevState,
      count:this.state.count+1,
      winnings:{...this.state.winnings,[this.state.count]:this.state.winningNumber}
    }))

  }

  //Click on remove button
    remove(){
      delete this.state.winnings[this.state.count-1];
      this.setState(prevState=>({
        ...prevState,
        count:this.state.count-1,
        winnings:this.state.winnings
      }))
    }

  //MODAL FUNCTIONS

    //on clicking Edit function

    toOpenModal(key){
      this.setState(prevState=>({
        ...prevState,
        keyOfEditObject:key,
        modalIsOpen:true
      }))
    }

    //Take edited value from input
    updateEditedWinningNumber(event){
      this.setState(prevState=>({
        ...prevState,
        editedWinningNumber:event.target.value
      }))
    }

    //On clicking ok button
    toCloseModal(){

      this.setState(prevState=>({
        ...prevState,
        winnings:{...this.state.winnings,[this.state.keyOfEditObject]:this.state.editedWinningNumber},
        modalIsOpen:false
      }))

    }

    

  render(){
    return(
      <div>
        <h1>CREATE POOL</h1>
        <form onSubmit={(event=>{
          event.preventDefault();
          this.setState(prevState=>({
            ...prevState,
            details:{...this.state.details,winnings:this.state.winnings},
            disabled:true
          }))

        })}>
        <input onChange={this.handleChangeAll} id="oid" type="text" placeholder="OID" value="60f95c29e118ea0004a50b96" /><br />
        <input onChange={this.handleChangeAll} id="pool_name" type="text" placeholder="pool-name" required /><br />
        <select onChange={this.handleChangeAll} id="talent">
        <option disabled selected value> -- select talent-- </option>
          <option id="talent" value="Dance">Dance</option>
          <option id="talent" value="Writing">Writing</option>
          <option id="talent" value="Singing">Singing</option>
          <option id="talent" value="Art">Art</option>
        </select><br />
       
        <input onChange={this.handleChangeAll} id="end_dt" type="date" placeholder="End-Date" /><br />

        <input onChange={this.handleChangeAll} id="fees"  type="number" placeholder="Fees" required /><br />
        <input onChange={this.handleChangeAll} id="prize_pool" type="number" placeholder="Price-Pool" /><br />
        <input onChange={this.handleChangeAll} id="total_slots" type="number" placeholder="Total-slots" required /><br />
        <input onChange={this.handleChangeAll} id="max_entries" type="number" placeholder="Max-Entries" /><br />
        <input onChange={this.handleChangeAll} id="no_of_winners" type="number" placeholder="No. of Winners" /><br />
        <input onChange={this.handleChangeAll} id="win_percent" type="number" placeholder="Win Percent" /><br />
        <input id="winnings" type="number" onChange={this.handleChange} placeholder="Enter Winnings" />
        <button type="button" onClick={this.handleClick}>Add</button><br />
        <textarea id="rules" onChange={this.handleChangeAll} placeholder="Rules"/><br />
        <button type="submit" className="submit" disabled={this.state.disabled}>Submit</button>
        </form>
        
        <table>
          <th>WINNINGS TABLE</th>
          <tr>
            <td>Position</td>
            <td>Winnings</td>
            <td>Edit Button</td>
            </tr>
            {Object.keys(this.state.winnings).map(key=>{
              
          return <tr>
            <td>{key}</td>
            <td>{this.state.winnings[key]}</td>
            <td><button type="button" onClick={()=>{
              console.log(key);
              this.toOpenModal(key);
            }} >Edit</button></td>
          </tr>
        })}

        
          
        </table>

        {/* Modal code */}

        <Modal isOpen={this.state.modalIsOpen}>
          <input type="number" onChange={this.updateEditedWinningNumber}></input>
          <button type="button" onClick={this.toCloseModal}>OK</button>
        </Modal>

        <button className="remove_button" type="button" onClick={this.remove}>Remove</button>
       
       
       
      </div>
    );
  }
 
}

export default Pool;

