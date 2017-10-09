import React from 'react';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';

//visitedCount
//last visited null

export default class LinksListFilters extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showHiddenLinks:false
    }
  }
  componentDidMount(){
    this.filterTracker = Tracker.autorun(()=>{
       const showHiddenLinks = Session.get('showHiddenLinks');
       this.setState({showHiddenLinks});

     })

  }

  componentWillUnmount(){
    this.filterTracker.stop();
  }

  onChange(e){
    Session.set('showHiddenLinks',e.target.checked)
    //this.setState({showVisibleLinks:e.target.checked});
    //Session.set({showVisibleLinks:!this.state.showVisibleLinks });

  }
  render(){
    return (
      <div>
        <label className="checkbox">
          <input
            type="checkbox"
            onChange={this.onChange.bind(this)}
            checked = {this.state.showHiddenLinks}
            className = "checkbox__box"
          />
          Show hidden links
        </label>
      </div>
    );
  }
}
