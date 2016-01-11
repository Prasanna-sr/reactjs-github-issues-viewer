jest.dontMock('../CommentsStore');

describe('CommentsStore', function() {
   var commentsStoreObj = require('../CommentsStore')();
   var callback = jest.genMockFunction();
   var url = 'http://commentsUrl';
   commentsStoreObj.getList(url, callback);
   var $ = require('jquery');

   it('getList makes ajax call when called', function() {
      expect($.ajax).toBeCalledWith({
         type: 'GET',
         url: url,
         success: jasmine.any(Function)
      });
   });

   it('getList calls callback with data when ajax is complete', function() {
      $.ajax.mock.calls[0][0].success({
         name: 'Test'
      });
      expect(callback.mock.calls[0][0]).toEqual({
      name: 'Test'
    });
   });
});
