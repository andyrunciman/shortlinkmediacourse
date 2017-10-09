import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';

//on piece of state
//create a boolean state
//default to false
//manupulate inside of success - Wait a second and then switch back to false
//Dynamically render the button text. true - copied

export default class LinksListItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      copied:false
    }
  }
  componentDidMount(){
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success',()=>{
      if(!this.state.copied){
        //this.refs.copy.innerHTML = "Copied";
        this.setState({copied:true});
        setTimeout(()=>{
          //this.refs.copy.innerHTML = "Copy";
          this.setState({copied:false});
        },1000);
      }
    }).on('error',()=>{
      alert('Unable to copy, please manually copy');
    });
  }
  componentWillUnmount(){
    this.clipboard.destroy();
  }

  renderStats(){
    const visitMessage = this.props.visitedCount === 1 ? 'visit':'visits';
    let visitedMessage = null;
    if(typeof this.props.lastVisitedAt === 'number'){
      let time = moment(this.props.lastVisitedAt).fromNow();
      visitedMessage = `(visited ${time})`;
    }
    return <p className="item__message">{this.props.visitedCount} {visitMessage} - {visitedMessage}</p>;

  }

  render(){
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message" >{this.props.shortUrl}</p>
        {this.renderStats()}
        <a className = "button button--pill button--link" href={this.props.shortUrl} target="_blank">
          Visit
        </a>
        <button className = "button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.copied ? 'Copied' : 'Copy'}
        </button>
        <button className = "button button--pill" onClick = {() => {
          Meteor.call('links.setVisibility',this.props._id,!this.props.visible);
        }}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  };
}

LinksListItem.propTypes = {
  _id:PropTypes.string.isRequired,
  shortUrl:PropTypes.string.isRequired,
  url:PropTypes.string.isRequired,
  userId:PropTypes.string.isRequired,
  visible:PropTypes.bool.isRequired,
  visitedCount:PropTypes.number.isRequired,
  lastVisitedAt:PropTypes.number
}
