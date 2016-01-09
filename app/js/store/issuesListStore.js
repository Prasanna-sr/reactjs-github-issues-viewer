var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

function IssuesListStore() {
   var list;
   var IssuesListStoreObj = {
      getList: getList,
      emitChange: emitChange,
      addChangeListener: addChangeListener,
      removeChangeListener: removeChangeListener
  };

   IssuesListStoreObj.prototype = Object.create(EventEmitter.prototype);
   registerAppDispatcher();

   return IssuesListStoreObj;

   function registerAppDispatcher() {
      AppDispatcher.register(function(payload) {
         var action = payload.action;
         var text;
         switch (action.actionType) {
            // Respond to RECEIVE_DATA action
            case "LOAD_LIST":
               loadData(action.data);
               break;

            default:
               return true;
         }
         // If action was responded to, emit change event
         // IssuesListStore.emitChange();
         console.log('app dispatcher');
         loadData();
         return true;

      });
   }

   function loadData(callback) {
       console.log('loadData')
      $.get('https://api.github.com/repos/npm/npm/issues').done(function(data) {
         list = data;
         callback(data);
      });
   }

   function getList(callback) {
       $.get('https://api.github.com/repos/npm/npm/issues').done(function(data) {
          list = data;
          callback(data);
       });
   }

   function emitChange() {
      this.emit('change');
   }

   function addChangeListener(callback) {
      this.on('change', callback);
   }

   function removeChangeListener(callback) {
      this.removeListener('change', callback);
   }
}
module.exports = IssuesListStore;
