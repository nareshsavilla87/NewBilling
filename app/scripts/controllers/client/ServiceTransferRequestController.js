(function(module) {
  mifosX.controllers = _.extend(module, {
	  ServiceTransferRequestController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,$rootScope) {

       scope.formData = {};
       scope.shiftingCheckbox = "Yes";
       scope.clientId = routeParams.clientId;
       scope.serviceTransferRequestData = {};
       scope.propertyCodesData = [];
       resourceFactory.serviceTransferRequestResource.get({clientId:routeParams.clientId},function(data){
    	  scope.serviceTransferRequestData = data;
    	  scope.propertyCodesData = data.propertyCodesData;
       });
       
       scope.selectPropertyCodesDataFun = function(propertyCode){
    	   for(var i in scope.propertyCodesData){
    		   if(propertyCode == scope.propertyCodesData[i].propertyCode){
    			   scope.propertyName = scope.propertyCodesData[i].precinct;
    			   scope.unitCode = scope.propertyCodesData[i].unitCode;
    			   scope.unitStatus = scope.propertyCodesData[i].status;
    			   break;
    		   }
    	   }
       };
       
       scope.submit = function(){
    	   scope.formData = {};
    	   scope.formData.oldPropertyCode = scope.serviceTransferRequestData.propertyCode; 
    	   scope.formData.shiftChargeAmount = scope.shiftChargeAmount; 
    	   scope.formData.locale = "en"; 
    	   if(scope.shiftingCheckbox == "Yes"){
    		   scope.formData.newPropertyCode = scope.serviceTransferRequestData.propertyCode; 
    	   }else if(scope.shiftingCheckbox == "No"){
    		   scope.formData.newPropertyCode = scope.propertyCode; 
    	   }
	       resourceFactory.serviceTransferRequestResource.save({clientId:routeParams.clientId},scope.formData,function(data){
	     	  location.path("/viewclient/"+scope.clientId);
	       });
       };
    }
  });
  mifosX.ng.application.controller('ServiceTransferRequestController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter','$rootScope', mifosX.controllers.ServiceTransferRequestController]).run(function($log) {
    $log.info("ServiceTransferRequestController initialized");
  });
}(mifosX.controllers || {}));
