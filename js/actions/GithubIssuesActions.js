var AppDispatcher = require('../dispatcher/AppDispatcher');
var GithubIssuesActions = {
   loadList: loadList,
   getDetails: getDetails
};

function loadList() {
   AppDispatcher.handleAction({
      actionType: "LOAD_LIST"
   })
}

function getDetails(data) {
   AppDispatcher.handleAction({
      actionType: "LOAD_DETAILS",
      data: data
   })
}
module.exports = GithubIssuesActions;
