Announcer
=================

Periodically announces JSON content to a remote server. Can be useful for health checking apps


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

