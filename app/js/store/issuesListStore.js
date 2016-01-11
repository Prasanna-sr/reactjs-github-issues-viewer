function IssuesListStore() {
   var IssuesListStoreObj = {
      getList: getList
   };
   return IssuesListStoreObj;

   function getList(page, callback) {
      var url = 'https://api.github.com/repos/npm/npm/issues?per_page=25';
      if (page) {
         url = url + '&page=' + page;
      }
      $.get(url).done(function(data, status, jxhr) {
         var link = jxhr.getResponseHeader('Link');
         var links = link.split(',');
         var paging = {};
         links.forEach(function(link) {
            var url = link.split(';')[0].replace(/<|>/g, '');
            var params = url.split('?')[1].split('&');
            var pageNo;
            for (var i = 0; i < params.length; i++) {
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
}
module.exports = IssuesListStore;
