(function(selfcare_module) {
    selfcare.directives = _.extend(selfcare_module, {
        OnBlurDirective: function($parse) {
            return function(scope, elm, attrs){
                var onBlurFunction = $parse(attrs['ngOnblur']);
                elm.bind("blur", function(event) {
                    scope.$apply(function() {
                        onBlurFunction(scope, { $event: event });
                    })});
            };
        }
    });
}(selfcare.directives || {}));

selfcare.ng.application.directive("ngOnblur", ['$parse',selfcare.directives.OnBlurDirective]).run(function($log) {
    $log.info("OnBlurDirective initialized");
});