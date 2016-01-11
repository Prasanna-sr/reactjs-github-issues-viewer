var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

function CommentsStore() {
   var list;
   var commentsStoreObj = {
      getList: getList,
      emitChange: emitChange,
      addChangeListener: addChangeListener,
      removeChangeListener: removeChangeListener
  };

   commentsStoreObj.prototype = Object.create(EventEmitter.prototype);
   registerAppDispatcher();

   return commentsStoreObj;

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
   }

   function getList(commentsUrl, callback) {
       $.get(commentsUrl).done(function(data) {
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
module.exports = CommentsStore;
