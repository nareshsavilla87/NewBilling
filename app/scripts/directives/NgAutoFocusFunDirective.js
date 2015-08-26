(function (module) {
    mifosX.directives = _.extend(module, {
    	NgAutoFocusFunDirective: function ($timeout, $parse) {
            return {
                link: function (scope, element, attrs) {
                	 var fn = $parse(attrs['ngFocus']);
                	 element.bind('focus', function(event) {
                	     scope.$apply(function() {
                	      fn(scope, {$event:event});
                	   });
                	 });
                }
            };

        }
    });
}(mifosX.directives || {}));

mifosX.ng.application.directive("ngFocus", ['$timeout', '$parse', mifosX.directives.NgAutoFocusFunDirective]).run(function ($log) {
    $log.info("NgAutoFocusFunDirective initialized");
});