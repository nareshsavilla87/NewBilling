(function(module) {
  mifosX.controllers = _.extend(module, {
	  DisbursementsController: function(scope, resourceFactory,location,paginatorService,$modal,routeParams,route,PermissionService) {

      scope.patnerDisbursementData = [];
        
      scope.disbursementsFetchFunction = function(offset, limit, callback) {
          resourceFactory.patnerDisbursementResource.get({offset: offset, limit: limit} , callback);
      };      
      scope.patnerDisbursementData = paginatorService.paginate(scope.disbursementsFetchFunction, 14);

    
     }
  });
  mifosX.ng.application.controller('DisbursementsController', ['$scope', 'ResourceFactory','$location','PaginatorService','$modal','$routeParams','$route','PermissionService', mifosX.controllers.DisbursementsController]).run(function($log) {
    $log.info("DisbursementsController initialized");
  });
}(mifosX.controllers || {}));
