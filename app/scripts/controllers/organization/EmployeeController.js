(function(module) {
  mifosX.controllers = _.extend(module, {
    EmployeeController: function(scope, resourceFactory,location,PermissionService) {
        scope.employees = [];
        scope.PermissionService = PermissionService;
        
        	resourceFactory.employeeResource.query(function(data) {
        		scope.employees = data;
        	});
        
           scope.routeTo = function(id){
                  location.path('/viewemployee/'+ id);
              };
          }
  });
  mifosX.ng.application.controller('EmployeeController', [
    '$scope', 
    'ResourceFactory',
    '$location',
    'PermissionService', 
    mifosX.controllers.EmployeeController]).run(function($log) {
    $log.info("EmployeeController initialized");
  });
}(mifosX.controllers || {}));
