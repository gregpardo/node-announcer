Announcer
=================

Periodically announces JSON content to a remote server. Can be useful for health checking apps


## Using the auto instance 

The auto instance provides a quick method of using node annoucer to
check in with a monitoring server. Set the appropriate ENV variables and 
start it.

### ENV Variables

The announcement URL to make PUT request to

    ANNOUNCE_URL=http://localhost:5000/api/Instances

The ID of the instance to post to

    ANNOUNCE_ID=5

The interval in seconds to check in

    ANNOUNCE_INTERVAL=10

Then require the auto instance and start it

    var announce = require('announcer').autoInstance();
    announce.start();
 
## Example

    var Announcer = require('announcer');
    
    var opts = {
	  when: 'every 5 seconds',
	  url: 'http://localhost/api/announce',
	  body: {
	    alive: true,
	    message: "Hey I'm still running!"
	  }
    };
    
     var announce = new Announcer(opts, function(err, response) {
      if (err) {
        console.log('Announce Error: ', err);
        return;
      }
      console.log('Response status ', response.status);
    });

    announce.start();


Essentially what this is doing is making a simple JSON post to the url every 5 seconds with the object in the body key. 

