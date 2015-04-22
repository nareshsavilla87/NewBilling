(function(module) {
  mifosX.controllers = _.extend(module, {
	  ServiceTransferRequestController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,$rootScope, http,API_VERSION,PermissionService,$upload,filter) {
		  
		  
		  scope.walletConfig = webStorage.get('is-wallet-enable');

	        var clientData = webStorage.get('clientData');
	        scope.displayName=clientData.displayName;
	        scope.statusActive=clientData.statusActive;
		    scope.hwSerialNumber=clientData.hwSerialNumber;
	        scope.accountNo=clientData.accountNo;
	        scope.officeName=clientData.officeName;
	        scope.balanceAmount=clientData.balanceAmount;
	        scope.currency=clientData.currency;
	        scope.imagePresent=clientData.imagePresent;
	        scope.categoryType=clientData.categoryType;
	        scope.email=clientData.email;
	        scope.phone=clientData.phone;
	        if(scope.imagePresent){
	         scope.image=clientData.image;
	        }

       scope.formData = {};
       scope.shiftingCheckbox = "Yes";
       scope.clientId = routeParams.clientId;
       scope.serviceTransferRequestData = {};
       scope.propertyCodesData = [];scope.feeMasterData = [];
       resourceFactory.serviceTransferRequestResource.get({clientId:routeParams.clientId},function(data){
    	  scope.serviceTransferRequestData = data;
    	  scope.feeMasterData  = data.feeMasterData;
    	  if(scope.feeMasterData){
    		  scope.formData.shiftChargeAmount = scope.feeMasterData.defaultFeeAmount;
    		  scope.formData.chargeCode = scope.feeMasterData.chargeCode;
    	  }
       });
       
       scope.getPropertyCode = function(query){
       	return http.get($rootScope.hostUrl+API_VERSION+'/property/propertycode/', {
       	      params: {
       	    	  		query: query
       	      		   }
       	    }).then(function(res){   
       	    	 scope.propertyCodesData=res.data;				 
       	      return scope.propertyCodesData;
       	    });
         };  
         
         scope.getPropertyDetails=function(propertyCode){
         	
         if(propertyCode !=undefined){
        	 for(var i in scope.propertyCodesData){
         		if(scope.propertyCodesData[i].propertyCode == propertyCode){
         			scope.propertyName = scope.propertyCodesData[i].precinct;
     			    scope.unitCode = scope.propertyCodesData[i].unitCode;
     			    scope.unitStatus = scope.propertyCodesData[i].status;
     			    break;
         		}
         	}
	     } else {
			delete scope.propertyName;
			delete scope.unitCode;
			delete scope.unitStatus;
	       }
         	
         };
       
       scope.submit = function(){
    	   scope.formData.oldPropertyCode = scope.serviceTransferRequestData.propertyCode; 
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
  mifosX.ng.application.controller('ServiceTransferRequestController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter','$rootScope',
                                                                        '$http','API_VERSION','PermissionService','$upload','$filter',
                                                                        mifosX.controllers.ServiceTransferRequestController]).run(function($log) {
    $log.info("ServiceTransferRequestController initialized");
  });
}(mifosX.controllers || {}));
