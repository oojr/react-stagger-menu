/** @jsx React.DOM */
var StaggerMenu = require('./components/StaggerMenu');
var react = require('react');
var el = document.getElementById('stagger-menu');
react.renderComponent(<StaggerMenu />, el);
