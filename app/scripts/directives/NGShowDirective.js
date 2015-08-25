(function(module) {
    mifosX.directives = _.extend(module, {
    	NGShowDirective: function () {
           return {
                restrict: 'A',
                scope  : '@', 
      //compile: function compile(tElement, tAttrs, transclude)
                controller: ['$scope', '$http', function($scope, $http) {
                	$scope.editSchedularJob =true;
                  }],
                  link: function(scope, iElement, iAttrs, ctrl) {
                      console.log(iAttrs.ngShow);                      
                    }
    };
  }
 });
}(mifosX.directives || {}));
	mifosX.ng.application.directive("ngshowdir", ['$parse', mifosX.directives.NGShowDirective]).run(function($log) {
		$log.info("NGShowDirective initialized");
});
