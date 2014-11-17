(function(module) {
	mifosX.controllers = _.extend(module, {		
		CodeController : function(scope, resourceFactory, paginatorService, location, PermissionService, $modal, route) {			
			scope.codes = [];
			scope.PermissionService = PermissionService;

			scope.codesFetchFunction = function(offset, limit, callback) {
				resourceFactory.codeResources.getData({ offset : offset, limit : limit }, callback);
			};

			if (PermissionService.showMenu('READ_CODE')) {
				resourceFactory.codeResources.getAllCodes(function(data) {
					scope.codes = data.pageItems;
				});
			}
			
			scope.delCode = function (id){
				scope.codeId = id;
                $modal.open({
                    templateUrl: 'deletecode.html',
                    controller: CodeDeleteCtrl
                });
            };
            
            var CodeDeleteCtrl = function ($scope, $modalInstance) {
            	
                $scope.deleteCode = function () {
                    resourceFactory.codeResources.remove({codeId: scope.codeId},{},function(data){
                    	route.reload();
                    });
                    $modalInstance.close('delete');
                };
                
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

			scope.routeTo = function(id) {
				if (PermissionService.showMenu('READ_CODEVALUE'))
					location.path('/viewcode/' + id);
			};
		}
	});
	
	mifosX.ng.application.controller('CodeController', [ 
	'$scope', 
	'ResourceFactory', 
	'PaginatorService', 
	'$location',
	'PermissionService', 
	'$modal',
	'$route',
	mifosX.controllers.CodeController 
	]).run(function($log) {
		$log.info("CodeController initialized");		
	});
}(mifosX.controllers || {}));
