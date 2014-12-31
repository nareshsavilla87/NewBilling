(function(module) {
	mifosX.controllers = _.extend(module, {
		OSDMessageController : function(scope, routeParams, resourceFactory, location) {
             scope.id=2;
             scope.orderId=routeParams.id;
			scope.submit = function() {			
				resourceFactory.osdResource.save({'id': scope.id ,'orderId': routeParams.id},this.formData,
						function(data) {
							location.path('/vieworder/'+routeParams.id);
						});
			};
		}
	});
	 mifosX.ng.application.controller('OSDMessageController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.OSDMessageController]).run(function($log) {
		    $log.info("OSDMessageController initialized");
		  });
}(mifosX.controllers || {}));
