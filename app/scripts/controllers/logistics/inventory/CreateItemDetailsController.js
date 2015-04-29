(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateItemDetailsController: function(scope,webStorage, resourceFactory, routeParams, location,$rootScope) {
    	 scope.formData = [];
    	 scope.grnIds = [];
    	 scope.itemDetailsData=[];
    	 scope.inventoryGrnDatas=[];
    	 scope.qualityDatas=[];
    	 scope.statusDatas=[];
        resourceFactory.itemDetailTemplateResource.get({grnId: routeParams.id === undefined ? "":routeParams.id} ,function(data) {
        	scope.formData = data;
            scope.inventoryGrnDatas = data.inventoryGrnDatas;
            scope.qualityDatas=data.qualityDatas;
            scope.statusDatas=data.statusDatas;

        });
       
        scope.changeGrn = function(testId) {
        	
            resourceFactory.grnResource.get({grnId: testId}, function(data) {
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
        	this.formData.quality = scope.itemDetailsData.quality === undefined?'Good':scope.itemDetailsData.quality;
        	this.formData.provisioningSerialNumber = scope.itemDetailsData.provisioningSerialNumber;
        	this.formData.status = scope.itemDetailsData.status === undefined?'New':scope.itemDetailsData.status;
        	this.formData.remarks = scope.itemDetailsData.remarks;
        	this.formData.itemMasterId = scope.itemDetailsData.itemMasterId;
            delete this.formData.purchaseDate;
            delete this.formData.inventoryGrnDatas;
            delete this.formData.qualityDatas;
            delete this.formData.statusDatas;
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
