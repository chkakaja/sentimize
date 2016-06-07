require('./testdom');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const expect = require('chai').expect;

const HomeView = require('./../../client/components/home-view/HomeView.jsx').default;

describe('React Components', () => {
  describe('HomeView Component', () => {
    // before('Render and locate component', () => {
    // });

    xit('renders a div the attribute class="view home-view"', () => {
      var component = TestUtils.renderIntoDocument(<HomeView />);
      var componentDiv = TestUtils.findRenderedDOMComponentWithTag(component, 'div');
      expect(componentDiv.getAttribute('class')).to.equal('view home-view');
    });

    it('should display welcome text: "Welcome to Sentimize"', () => {
      var component = TestUtils.renderIntoDocument(<HomeView />);
      var componentWelcome = TestUtils.findRenderedDOMComponentWithTag(component, 'h4');
      expect(componentWelcome.textContent).to.equal('Welcome to sentimize.');
    });

  });
});