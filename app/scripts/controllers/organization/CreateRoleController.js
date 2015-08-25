(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateRoleController: function(scope, location, resourceFactory,PermissionService) {
      scope.submit = function() {
        resourceFactory.roleResource.save(this.formData, function(data) {
        if(PermissionService.showMenu("read_role"))
          location.path("/admin/viewrole/"+data.resourceId);
        else
        	 location.path("/admin/roles");
        });
      };
    }
  });
  mifosX.ng.application.controller('CreateRoleController', ['$scope', '$location', 'ResourceFactory','PermissionService', mifosX.controllers.CreateRoleController]).run(function($log) {
    $log.info("CreateRoleController initialized"); 
  });
}(mifosX.controllers || {}));