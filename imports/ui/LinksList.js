import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Links} from '../api/links';
import {Tracker} from 'meteor/tracker';
import LinksListItem from './LinksListItem';
import {Session} from 'meteor/session';
import Flipmove from 'react-flip-move';


export default class LinksList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      links:[]
    };
  }
  //component did mount
  componentDidMount(){
    //called just after the component is shown on screem
    console.log("Component did mount - links list");
    //run tracker.autorun here...
    this.linksTracker = Tracker.autorun(() => {  //this.linksTracker - just a variable
      Meteor.subscribe('links');
      const links = Links.find({
        visible:!Session.get('showHiddenLinks')
      }).fetch();
      // for (link of links) {
      //   console.log(link.url)
      // }
      this.setState({links});
    });
  }

  //called before component goes away
  componentWillUnmount(){
    this.linksTracker.stop();
    //saves resources.
  }

  renderLinksListItems(){
    //map through the links and return some JSX
    //<p>add URL</p> dont forget the key!
    if(this.state.links.length === 0){
      return (<div className="item"><p className='item__status_message'>No links found</p></div>);
    }else{
      return this.state.links.map((link)=>{
        const shortUrl = Meteor.absoluteUrl(link._id);
        return <LinksListItem key={link._id} shortUrl = {shortUrl} {...link}/>
      });
    }

  }

  render(){
    return (
      <div>
        <Flipmove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </Flipmove>
      </div>
    )
  }
}
