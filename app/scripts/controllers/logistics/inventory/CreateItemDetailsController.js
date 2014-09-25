(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateItemDetailsController: function(scope,webStorage, resourceFactory, routeParams, location,$rootScope) {
    	 scope.formData = [];
    	 scope.grnIds = [];
    	 scope.itemDetailsData=[];
        resourceFactory.grnSingleTemplateResource.get({grnId: routeParams.id == undefined ? "":routeParams.id} ,function(data) {
        	scope.formData = data;
        });
        resourceFactory.grnIdResource.get(function(data) {
        	scope.grnIds = data;      	
        });
        resourceFactory.itemQualityResource.get(function(data) {
            scope.quality = data.quality;
        });
        scope.changeGrn = function(testId) {
        	
            resourceFactory.grnSingleTemplateResource.get({grnId: testId}, function(data) {
              scope.itemDetailsData = data;
            });
          };
          
          scope.getBoth =function(mrnId,description){
	        	return mrnId+"--"+description;
	       };
            
	       scope.reset123 = function(){
	    	   webStorage.add("callingTab", {someString: "itemDetails" });
	       };
	       
        scope.submit = function() {
        	this.formData.locale = $rootScope.locale.code;
        	this.formData.grnId = scope.itemDetailsData.id;//scope.grnIds.id;
        	this.formData.serialNumber = scope.itemDetailsData.serialNumber;
        	this.formData.quality = scope.itemDetailsData.quality==undefined?'Good':scope.itemDetailsData.quality;
        	this.formData.provisioningSerialNumber = scope.itemDetailsData.provisioningSerialNumber;
        	this.formData.status = scope.itemDetailsData.status==undefined?'New':scope.itemDetailsData.status;
        	this.formData.remarks = scope.itemDetailsData.remarks;
        	this.formData.itemMasterId = scope.itemDetailsData.itemMasterId;
            delete this.formData.purchaseDate;
        	resourceFactory.itemDetailsResource.save(this.formData,function(data){
        		location.path("/inventory");
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateItemDetailsController', ['$scope','webStorage', 'ResourceFactory','$routeParams','$location','$rootScope', mifosX.controllers.CreateItemDetailsController]).run(function($log) {
    $log.info("CreateItemDetailsController initialized");
  });
}(mifosX.controllers || {}));
