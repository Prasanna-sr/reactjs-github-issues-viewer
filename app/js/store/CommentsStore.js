function CommentsStore() {
   var commentsStoreObj = {
      getList: getList
   };
   return commentsStoreObj;

   function getList(commentsUrl, callback) {
      $.get(commentsUrl).done(function(data) {
         callback(data);
      });
   }
}
module.exports = CommentsStore;
