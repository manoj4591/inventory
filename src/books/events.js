const EventEmitter = {
    events: {},
    dispatch: function(event, data){
      console.log("data->>", data)
      if(!this.events[event]) return
      this.events[event].forEach(callback => callback(data))
    },
    suscribe: function(event, callback){
      console.log("event->>>>>>", event)
      if(!this.events[event]) this.events[event] = []
      this.events[event].push(callback);
    }
  };

  module.exports = {EventEmitter}
  