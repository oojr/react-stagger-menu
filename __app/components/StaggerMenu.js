/** @jsx React.DOM */
'use strict';

var React = require('react/addons');

var Velocity = require('velocity-animate/velocity');
require('velocity-animate/velocity.ui');

var MenuItem = React.createClass({
  render: function() {
    return (
      <li className="menu-item">
       <a href={this.props.url}>{this.props.name}</a>
      </li>
    );
  }

});

var StaggerMenu = React.createClass({
  getDefaultProps: function() {
    return {
      items: [
        {
          name: 'View on Github',
          url: 'https://github.com/oojr/react-stagger-menu'
        },
        {
          name: 'React',
          url: 'http://facebook.github.io/react'
        },
        {
          name: 'Gulp',
          url: 'http://gulpjs.com/'
        },
        {
          name: 'Velocity',
          url: 'http://julian.com/research/velocity/'
        }

      ]
    }
  },
  componentDidMount: function() {
    var component = this.getDOMNode();
    var menuItems = component.querySelectorAll('li');
    Velocity(menuItems,'transition.bounceLeftIn', {stagger: 500});
  },

  render: function() {
    var items = this.props.items.map(function(item, i) {
      return (<MenuItem name={item.name} url={item.url} key={i} />)
    }.bind(this))
    return (
      <ul className="stagger-menu">
        {items}
      </ul>
    );
  }
});
module.exports = StaggerMenu;