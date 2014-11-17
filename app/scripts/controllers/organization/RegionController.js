(function(module) {
	mifosX.controllers = _.extend(module, {
		RegionController : function(scope, resourceFactory, location,
				PermissionService, $modal, route) {
			scope.regions = [];
			scope.PermissionService = PermissionService;
			resourceFactory.regionResource.getRegion(function(data) {
				scope.regions = data;
			});

			scope.deleteRegion = function(id) {
				scope.regionId = id;
				$modal.open({
					templateUrl : 'deleteregion.html',
					controller : RegionDeleteCtrl
				});
			};

			var RegionDeleteCtrl = function($scope, $modalInstance) {

				$scope.regionDelete = function() {
					resourceFactory.regionResource.remove({ regionId : scope.regionId }, {}, function(data) {
						route.reload();
					});
					$modalInstance.close('delete');
				};

				$scope.cancel = function() {
					$modalInstance.dismiss('cancel');
				};
			};

			scope.routeTo = function(id) {
				location.path('/viewregions/' + id);
			};
		}
	});
	mifosX.ng.application.controller('RegionController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'PermissionService',
	'$modal', 
	'$route', 
	mifosX.controllers.RegionController ]).run(
		function($log) {
			$log.info("RegionController initialized");
		});
}(mifosX.controllers || {}));
