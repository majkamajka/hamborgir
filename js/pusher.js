var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '444498',
  key: '5e3039268d124c94ac75',
  secret: '94d3412f3ac2954c0cf8',
  cluster: 'eu',
  encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});