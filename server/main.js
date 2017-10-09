import { Meteor } from 'meteor/meteor';
import '../imports/api/users';
import {Links} from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';
import {WebApp} from 'meteor/webapp';
import moment from 'moment';


Meteor.startup(() => {
  let now = new Date().getTime();
  console.log(now);

  //let momentNow = moment(0);
  //console.log(momentNow.fromNow());
  // WebApp.connectHandlers.use((req,res,next) => {
  //   res.statusCode = 302;
  //   res.setHeader('Location','http://www.google.co.uk');
  //   res.end();
  // });

  WebApp.connectHandlers.use((req,res,next) => {
    //console.log(req.url);
    //res.statusCode = 302;
    const _id = req.url.slice(1);
    const link = Links.findOne({_id});
    if(!link){
      next();
    }else{
      res.statusCode = 302;
      res.setHeader('Location',link.url);
      res.end();
      Meteor.call('links.trackVisit',_id);
    }

    //res.setHeader('Location','http://www.google.co.uk');
    // res.end();
  });

  // WebApp.connectHandlers.use((req,res,next)=> {
  //   console.log(req.url,req.method,req.headers,req.query)
  //   //set HTTP status code
  //   res.statusCode = 404;
  //   //Set HTTP headers
  //   res.setHeader('my-custom-header','andrew was here!');
  //
  //   //res.write('hacked');
  //   //Set HTTP body
  //   //End HTTP request
  //
  //   //res.end();
  //
  //   next();
  //
  // });
});
