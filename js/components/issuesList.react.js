var React = require('react');
var Issues = React.createClass({
   render: function() {
      return (
         <li>
            <img/>
            <div className="heading">
               <label className="name">name
                  <span>label</span>
               </label>
               <label className="title">title
                  <span>no</span>
               </label>
            </div>
            <label className="summary">summary</label>
         </li>
      );
   }
});

var IssuesList = React.createClass({
   render: function() {
      var list = [0, 1, 2, 4].map(function() {
         return (<Issues/>);
      });
      return (
          <div>
              <ul>
                  {list}
              </ul>
          </div>
      )
   }
});
module.exports = IssuesList;
