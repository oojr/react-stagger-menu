/** @jsx React.DOM */
'use strict';
jest.dontMock('./../../__app/components/StaggerMenu');
describe('StaggerMenu', function() {
  it('renders the menu', function() {
    var React = require('react/addons');
    var $ = require('jquery/dist/jquery')
    var StaggerMenu = require('./../../__app/components/StaggerMenu');
    var TestUtils = React.addons.TestUtils;

    // Render a checkbox with label in the document
    var menu = TestUtils.renderIntoDocument(
      <StaggerMenu />
    );

    // Verify that we have our 4 menu items and velocity interacting with them
    var menuItems = TestUtils.scryRenderedDOMComponentsWithTag(menu, 'li');
    expect(menuItems.length).toBe(4);
    var firstItem = menuItems[0].getDOMNode();
    expect(firstItem.className).toContain('velocity-animating')
    expect(firstItem.textContent).toBe('View on Github');
  });
});
