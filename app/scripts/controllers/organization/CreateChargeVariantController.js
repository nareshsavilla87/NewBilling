(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateChargeVariantController : function(scope, resourceFactory, location,	$rootScope, dateFilter) {
			scope.types = [];
			scope.status = [];
			scope.clientCategory = [];
			scope.start = {};
			
			scope.start.date = new Date();
			scope.minDate= scope.start.date;
			scope.end = {};
			scope.end.date = new Date();
			scope.minDate= scope.end.date;
			
			resourceFactory.chargevarianttemplateResource.get(function(data) {
				scope.types = data.amountTypeData;
				scope.statuses = data.statusData;
				//scope.clientCategory = data.statusData;
				scope.noofConnectionses = data.chargeVariantTypeData;
			});
			scope.formData={};scope.chargeVariantDetails = [];
			  scope.addAmount = function () {
		           if (scope.formData.variantType && scope.formData.amountType && scope.formData.amount) {
		        	   
		                scope.chargeVariantDetails.push({variantType:scope.formData.variantType, 
		                	amountType:scope.formData.amountType, amount:scope.formData.amount, locale:$rootScope.locale.code
		                });
		              
		                scope.formData.variantType = undefined;
		                scope.formData.amountType = undefined;
		                scope.formData.amount = undefined;
		          	}
		       };
	        scope.removeChargeVariants = function (index) {
	            scope.chargeVariantDetails.splice(index,1);
	          };
			scope.submit = function() {
				this.formData.locale = $rootScope.locale.code;
				this.formData.dateFormat = 'dd MMMM yyyy';
				this.formData.startDate = dateFilter(scope.start.date,'dd MMMM yyyy');
				this.formData.endDate = dateFilter(scope.end.date,'dd MMMM yyyy');
				this.formData.chargeVariantDetails = scope.chargeVariantDetails;
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
	     'dateFilter',
	     mifosX.controllers.CreateChargeVariantController 
	     ]).run(function($log) {
	    	 $log.info("CreateChargeVariantController initialized");
	     });
}(mifosX.controllers || {}));
