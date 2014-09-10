(function (selfcare_module) {
	selfcare.directives = _.extend(selfcare_module, {
    	NgAutoFocusFunDirective: function ($timeout, $parse) {
    		return {
                link: function (scope, element, attrs) {
                    var focus = $parse(attrs.ngAutofocus);
                    scope.$watch(focus, function (value) {
                        if (value === true) {
                            $timeout(function () {
                                element[0].focus();
                            });
                        }
                    });
                }
            };

        }
    });
}(selfcare.directives || {}));

selfcare.ng.application.directive("ngAutofocus", ['$timeout', '$parse', selfcare.directives.NgAutoFocusFunDirective]);