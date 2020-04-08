const { Client: Ichigo } = require('../build');
const rpc = new Ichigo('519521041966563338');

rpc.setActivity({
  instance: false,
  state: 'State',
  details: 'Details',
  timestamps: {
    start: new Date().getTime()
  }
});