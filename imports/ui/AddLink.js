import React from 'react';
import Modal from 'react-modal';
import {Meteor} from 'meteor/meteor';



export default class AddLink extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      url:'',
      isOpen:false,
      error:''
    }
  }
  onSubmit(e){
    //const url = this.refs.url.value.trim();
    //const url = this.state.url;
    const {url} = this.state;  //destructuring [a,b] = [1,2]  a=1 b =2
    e.preventDefault();

    Meteor.call('links.insert',url,(err,res)=>{
      if(!err){
        this.handleModelClose();
      }else{
        this.setState({error:err.reason})
      }
    });
  }
  onChange(e){
    this.setState({
      url:e.target.value.trim()
    });
  }
  handleModelClose(){
    this.setState({
      isOpen:false,
      url:"",
      error:''
    });
  }

  render(){
    return (
      <div>
        <button className = "button" onClick={()=>this.setState({isOpen:true})}>+Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen = {() =>this.refs.url.focus()}
          onRequestClose = {this.handleModelClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
          >
          <h1>Add Link</h1>
          {this.state.error ? <p> {this.state.error} </p> : undefined}
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input
              type='text'
              placeholder="URL"
              ref="url"
              onChange = {this.onChange.bind(this)}
              value={this.state.url}/>
            <button className="button" >Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.handleModelClose.bind(this)}>Cancel</button>

          </form>
        </Modal>
      </div>
    );
  }
}
