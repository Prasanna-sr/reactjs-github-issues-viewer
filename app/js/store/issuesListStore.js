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

   function getList(page, callback) {
       var url = 'https://api.github.com/repos/npm/npm/issues';
       if(page) {
           url = url + '?page=' + page;
       }
       $.get(url).done(function(data, status, jxhr) {
           var link = jxhr.getResponseHeader('Link');
           var links = link.split(',');
           var paging = {};
           links.forEach(function(link) {
               var url = link.split(';')[0].replace(/<|>/g, '');
               var params = url.split('?')[1].split('&');
               var pageNo;
               for (var i = 0; i < params.length; i ++) {
                   if (params[i].indexOf('page') !== -1) {
                       pageNo = params[i].split("=")[1];
                   }
               }
               if ((link.split(';')[1]).indexOf("first") !== -1) {
                  paging.first = pageNo;
               }
               if ((link.split(';')[1]).indexOf("last") !== -1) {
                  paging.last = pageNo;
               }
               if ((link.split(';')[1]).indexOf("next") !== -1) {
                  paging.next = pageNo;
               }
               if ((link.split(';')[1]).indexOf("prev") !== -1) {
                  paging.prev = pageNo;
               }
           });
          data.paging = paging;
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
