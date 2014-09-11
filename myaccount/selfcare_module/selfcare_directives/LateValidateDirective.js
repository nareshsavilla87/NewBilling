(function(selfcare_module) {
	selfcare.directives = _.extend(selfcare_module, {
        LateValidateDirective: function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elm, attr, ctrl) {
                    if (attr.type === 'radio' || attr.type === 'checkbox') return;
                    elm.bind('blur', function() {
                        scope.$apply(function() {
                            if (elm.val() == "") {
                                ctrl.$setValidity('req', false);
                            } else {
                                ctrl.$setValidity('req', true);
                            }
                        });
                    });
                }
            };
        }
    });
}(selfcare.directives || {}));

selfcare.ng.application.directive("lateValidate", [selfcare.directives.LateValidateDirective]);