'use strict';

describe('MlApp', function () {
  var React = require('react/addons');
  var MlApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    MlApp = require('components/MlApp.js');
    component = React.createElement(MlApp);
  });

  it('should create a new instance of MlApp', function () {
    expect(component).toBeDefined();
  });
});
