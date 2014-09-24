(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditPromotioncodeController: function(scope, resourceFactory, location, routeParams,dateFilter) {
		  scope.promotiondatas=[];
		  scope.durationTypes=[];
		  scope.promotiondata = [];
		  scope.start={};
		  scope.start.date = new Date();
		  
	        resourceFactory.promotionResource.getPrmotioncodeDetails({promotioncodeId: routeParams.id} , function(data) {
	            scope.promotiondata = data;  
	            scope.promotiondatas = data.discounTypeData;
	            scope.durationTypes=data.contractTypedata;
	           	scope.formData = {
	           			promotionCode : data.promotionCode,
	           			description  : data.promotionDescription,
	           			discountRate : data.discountRate,
	           			duration  :  data.duration,
	           			discountType : data.discountType,
	           			durationType : data.durationType
	           	};
	        });
	        
	        scope.submit = function() {
	        	this.formData.locale = "en";
	             this.formData.dateFormat = "dd MMMM yyyy";
	             var startdate = dateFilter(scope.start.date,'dd MMMM yyyy');
	        
	             this.formData.startDate=startdate;
	             
	           resourceFactory.promotionResource.update({promotioncodeId: routeParams.id}, this.formData,function(data){
	            location.path('/viewpromotioncode/'+data.resourceId);
	          });
	        };
	        
    }
  });
  mifosX.ng.application.controller('EditPromotioncodeController', ['$scope', 'ResourceFactory', '$location', '$routeParams','dateFilter', mifosX.controllers.EditPromotioncodeController]).run(function($log) {
    $log.info("EditPromotioncodeController initialized");
  });
}(mifosX.controllers || {}));
