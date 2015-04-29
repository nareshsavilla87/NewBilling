(function(module) {
  mifosX.controllers = _.extend(module, {
	  AddressManageController: function(scope, resourceFactory,location,paginatorService,$modal,routeParams,route,PermissionService) {

      scope.addressManages = [];
      scope.PermissionService = PermissionService;
        
      scope.addressManagesFetchFunction = function(offset, limit, callback) {
          resourceFactory.addressResource.getAllAddresses({offset: offset, limit: limit} , callback);
      };      
      scope.addressManages = paginatorService.paginate(scope.addressManagesFetchFunction, 14);

    
     }
  });
  mifosX.ng.application.controller('AddressManageController', ['$scope', 'ResourceFactory','$location','PaginatorService','$modal','$routeParams','$route','PermissionService', mifosX.controllers.AddressManageController]).run(function($log) {
    $log.info("AddressManageController initialized");
  });
}(mifosX.controllers || {}));
