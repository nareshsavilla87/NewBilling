(function(module) {
    mifosX.controllers = _.extend(module, {
    	KortaSuccessController: function(scope, resourceFactory, location,PermissionService) {
        	/*scope.formData={};
            scope.submit = function() {
                resourceFactory.codeResources.save(this.formData,function(data){
                	if(PermissionService.showMenu('READ_CODE')&&PermissionService.showMenu('READ_CODEVALUE'))
                		location.path('/viewcode/'+data.resourceId);
                	else
                		location.path('/codes');
                });
            };*/
        }
    });
    mifosX.ng.application.controller('KortaSuccessController', ['$scope', 'ResourceFactory', '$location','PermissionService', mifosX.controllers.KortaSuccessController]).run(function($log) {
        $log.info("KortaSuccessController initialized");
    });
}(mifosX.controllers || {}));

