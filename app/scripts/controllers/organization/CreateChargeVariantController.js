(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateChargeVariantController : function(scope, resourceFactory, location,	$rootScope) {
			scope.types = [];
			scope.status = [];
			scope.clientCategory = [];
			resourceFactory.chargevarianttemplateResource.get(function(data) {
				scope.types = data.typeData;
				scope.status = data.statusData;
				scope.clientCategory = data.statusData;
				scope.formData = {
					taxInclusive : false,	/** Do not remove this one */
				};
			});
			scope.formData={};scope.chargeVariants = [];
			  scope.addAmount = function () {
		           if (scope.formData.noofConnections && scope.formData.type && scopeformData.amount) {
		        	   
		                scope.chargeVariants.push({noofConnections:scope.formData.noofConnections, 
		                	type:scope.formData.type, amount:scope.formData.amount
		                });
		              
		                scope.formData.noofConnections = undefined;
		                scope.formData.type = undefined;
		                scope.formData.amount = undefined;
		          	}
		       };
	        scope.removeChargeVariants = function (index) {
	            scope.chargeVariants.splice(index,1);
	          };
			scope.submit = function() {
				this.formData.locale = $rootScope.locale.code;
				resourceFactory.chargevariantResource.save(this.formData,function(data) {
					location.path('/chargevariant');
				});
			};
		}
	});
	mifosX.ng.application.controller('CreateChargeVariantController',[
	     '$scope',
	     'ResourceFactory', 
	     '$location',
	     '$rootScope',
	     mifosX.controllers.CreateChargeVariantController 
	     ]).run(function($log) {
	    	 $log.info("CreateChargeVariantController initialized");
	     });
}(mifosX.controllers || {}));
