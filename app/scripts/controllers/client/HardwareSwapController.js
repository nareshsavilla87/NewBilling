(function(module) {
	  mifosX.controllers = _.extend(module, {
		  HardwareSwapController: function(scope, webStorage,routeParams , location, resourceFactory,http,$rootScope,API_VERSION) {
			 scope.formData={};
			  scope.association=[];scope.enumValuesDatas = [];
			  scope.clientId=routeParams.clientId;
			  var clientData = webStorage.get('clientData');
	            scope.displayName=clientData.displayName;
	            scope.statusActive=clientData.statusActive;
	            scope.hwSerialNumber=clientData.hwSerialNumber;
	            scope.accountNo=clientData.accountNo;
	            scope.officeName=clientData.officeName;
	            scope.officeId=clientData.officeId;
	            scope.balanceAmount=clientData.balanceAmount;
	            scope.currency=clientData.currency;
	            scope.imagePresent=clientData.imagePresent;
	            scope.categoryType=clientData.categoryType;
	            scope.email=clientData.email;
	            scope.phone=clientData.phone;
	            scope.officeId = clientData.officeId;
	            scope.image=clientData.image;
	            var config = webStorage.get('client_configuration').deviceAgrementType;
	  		  scope.config=config;
	            resourceFactory.associationResource.getAssociation({clientId: routeParams.clientId,id:routeParams.orderId} , function(data) {
	                scope.association = data;   
	                scope.enumValuesDatas = data.enumValuesDatas;
	                if(scope.enumValuesDatas.length >=1){
	                	scope.reason = scope.enumValuesDatas[0].value
	                }
	            });
	            
	        scope.getData = function(query){
	        	 return http.get($rootScope.hostUrl+ API_VERSION+'/itemdetails/'+scope.association.itemId+'/'+scope.officeId+'/', {
	          	      params: {
	          	    	  query: query
	          	      }
	          	    }).then(function(res){
	          	    	itemDetails = [];
	          	    	for(var i in res.data.serialNumbers){
	          	    		itemDetails.push(res.data.serialNumbers[i]);
	          	    		if(i==7){
	          	    			break;
	          	    		}
	          	    	}
	          	      return  itemDetails;
	          	    });
            };
	        	
	        scope.getNumber = function(num) {
	             return new Array(num);   
	         };
	     
	        scope.submit = function() {  
	        	
	        	var swapserialNum=$("input[name='serialNumber']").val();
	            this.formData.provisionNum=swapserialNum;
	            this.formData.orderId=scope.association.orderId;
	            this.formData.planId=scope.association.planId;
	            this.formData.serialNo=scope.association.serialNum;
	            this.formData.associationId=scope.association.id;
	            this.formData.deviceAgrementType=scope.config;
	            this.formData.saleId=routeParams.id;
	            this.formData.deviceAgrementType=scope.config;
	            delete this.formData.serials;

	            resourceFactory.hardwareSwapResource.save({'clientId': routeParams.clientId},this.formData,function(data){
	                location.path('/vieworder/' + scope.association.orderId+'/'+routeParams.clientId);
	              });
	        };
	    }
	  });
	  mifosX.ng.application.controller('HardwareSwapController', ['$scope', 'webStorage','$routeParams', '$location', 'ResourceFactory','$http','$rootScope','API_VERSION', mifosX.controllers.HardwareSwapController]).run(function($log) {
        $log.info("HardwareSwapController initialized");
    });
}(mifosX.controllers || {}));

