define(['underscore'], function() {
  var selfcare_styles = {
    css: [
          'bootstrap-combined.min',
          'bootswatch',
          'font-awesome.min',
          'app',
          'nv.d3',
          'style',
          'bootstrap-timepicker',
          'jquery-ui',
          'animate'
          //'demo',
         // 'style1',
          //'animate-custom'
    ]
  };

  require(_.reduce(_.keys(selfcare_styles), function(list, pluginName) {
    return list.concat(_.map(selfcare_styles[pluginName], function(stylename) { return pluginName + "!selfcare_styles/" + stylename; }));
  }, []));
});
