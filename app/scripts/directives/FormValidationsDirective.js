(function(module) {
    mifosX.directives = _.extend(module, {
    	FormValidationsDirective: function($compile) {
            return {
                restrict: 'E',
                require: '?ngmodel',
                scope: "@",
                
               link: function (scope, elm, attr, ctrl) {
                	
                	var formName = attr.formname;
                	var inputName = attr.fieldname;
                	var maxLenMsg = attr.maxlenmsg;
                	var patternMsg = attr.patternmsg;
                	
                	  var template = '<span  ng-show="'+formName+'.'+inputName+'.$invalid">'+
                	  		'<small class="error" ng-show="'+formName+'.'+inputName+'.$error.req">'+
                	  			'Required !'+                                                                                             
                	  		'</small>'+
                            '<small  class="error" ng-show ="'+formName+'.'+inputName+'.$error.maxlength">'+ 
                            'Not Exceed '+maxLenMsg+'</small>'+
                	       '<small class="error" ng-show="'+formName+'.'+inputName+'.$error.pattern">'+
                            patternMsg+                                                                                             
                            '</small>'+
                            '</span>';
                    elm.html('').append($compile(template)(scope));
                	
                 }
           };
        }
    });
}(mifosX.directives || {}));

mifosX.ng.application.directive("formValidate", ['$compile', mifosX.directives.FormValidationsDirective]).run(function($log) {
    $log.info("FormValidationsDirective initialized");
});