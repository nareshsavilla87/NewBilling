(function(module) {
  mifosX.controllers = _.extend(module, {
	  DalpayButtonController: function(scope, resourceFactory , paginatorService,location,http) {

		  scope.countryNames = [{id:"IN",name:"India"}];
		  
    }
  });
  mifosX.ng.application.controller('DalpayButtonController', ['$scope', 'ResourceFactory', 'PaginatorService','$location','$http',mifosX.controllers.DalpayButtonController]).run(function($log) {
    $log.info("DalpayButtonController initialized");
  });
}(mifosX.controllers || {}));
