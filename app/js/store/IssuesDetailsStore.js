var $ = require('jquery');

function IssuesDetailsStore() {
   var issuesDetailsStoreObj = {
      getDetails: getDetails
   };
   return issuesDetailsStoreObj;

   function getDetails(issueNo, callback) {
      var url = 'https://api.github.com/repos/npm/npm/issues/' + issueNo;
      $.ajax({
         type: 'GET',
         url: url,
         success: function(data) {
            callback(data);
         }
      });
   }
}
module.exports = IssuesDetailsStore;
