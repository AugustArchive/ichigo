const { Client: Ichigo } = require('../build');
const rpc = new Ichigo('519521041966563338');

rpc.on('open', () => console.log('Opened a connection'));
rpc.on('error', console.error);
rpc.on('ready', () => {
  console.log('Ready!');
  rpc.setActivity({
    instance: false,
    state: 'State',
    details: 'Details',
    timestamps: {
      start: new Date().getTime()
    }
  });
});

rpc.connect();