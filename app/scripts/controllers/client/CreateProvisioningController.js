(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateProvisioningController: function(scope, webStorage,resourceFactory, routeParams,location,dateFilter,$modal) {
        scope.orderId = routeParams.orderId;
		scope.provisioningdata= [];
        scope.services= [];
        scope.serviceparams= [];
        scope.ipPoolDatas=[];
        scope.vlanDatas=[];
        scope.formData={};
        scope.addIpAddress = [];
        scope.groupDatas =[];
        
        var clientData = webStorage.get('clientData');
        var orderData = webStorage.get('orderData');
        scope.statusActive=clientData.statusActive;
        scope.accountNo=clientData.accountNo;
        scope.officeName=clientData.officeName;
        scope.balanceAmount=clientData.balanceAmount;
        scope.currency=clientData.currency;
        scope.imagePresent=clientData.imagePresent;
        scope.categoryType=clientData.categoryType;
        scope.email=clientData.email;
        scope.clientId=clientData.clientId;
        scope.phone=clientData.phone;
        scope.device=clientData.hwSerialNumber;
        scope.displayName=clientData.displayName;
        scope.planName=orderData.planName;
        scope.image=clientData.image;
        scope.orderNo=orderData.orderNo;
        scope.parameterDatas=[];
        scope.ipTypeDatas = ["Single","Multiple"];

        scope.IPAddressType = true;
   		scope.subnetType = false;
   		scope.formData.ipRange = "ipAddress";
   		scope.IPAddressObj = {ipAddress:undefined};

     
       resourceFactory.provisioningCreatetemplateDataResource.get({orderId: routeParams.orderId,serviceId:routeParams.serviceId} , function(data) {
    	   scope.parameterDatas=data.parameterDatas;
    	   scope.provisioningdata=data;
    	   scope.services=data.services;
    	   scope.ipPoolDatas=data.ipPoolDatas;
    	   scope.vlanDatas=data.vlanDatas;
    	   scope.serviceparams=data.serviceDatas;
    	   scope.groupDatas=data.groupDatas;
    	   scope.formData.serviceName=data.services[0].serviceId;
    	   scope.formData.groupName=data.groupDatas[0].groupName;
    	   for(var param in scope.parameterDatas){
       		  var temp = {};
       	
       		if(scope.parameterDatas[param].paramName == "SERVICE" && scope.parameterDatas[param].type == "Single"){
       			scope.parameterDatas[param].paramValue = data.serviceDatas[0].paramValue;
       			
       		}else if(scope.parameterDatas[param].paramName == "GROUP_NAME" && scope.parameterDatas[param].type == "Single"){
       			scope.parameterDatas[param].paramValue =data.groupDatas[0].groupName;
       		}
       		}
            });
       
       
       scope.getData = function(query){
          	if(query.length>0){
          		resourceFactory.ippoolingDetailsResource.getIpAddress({query: query}, function(data) { 
          			
   	            scope.ipPoolDatasData = data.ipAddressData;
   	        });
          	}else{
              	
          	}
          };
          
          scope.addIpAddresses = function() {
        	if(scope.IPAddressObj.ipAddress)
   		    scope.addIpAddress.push(scope.IPAddressObj.ipAddress);
        	
        	if(scope.addIpAddress.length > 1)
        		scope.formData.ipType = "Multiple";
        	else if(scope.addIpAddress.length == 1)
        		scope.formData.ipType = "Single";
        	else
        		scope.formData.ipType = "Subnet";
        	
        	scope.IPAddressObj.ipAddress = undefined;

   	};
   	
   	scope.deleteAddIpAddress = function(index) {
   		scope.addIpAddress.splice(index, 1);
   		
   		if(scope.addIpAddress.length > 1)
    		scope.formData.ipType = "Multiple";
    	else if(scope.addIpAddress.length == 1)
    		scope.formData.ipType = "Single";
    	else
    		scope.formData.ipType = undefined;
   		
   	};
   	scope.selectedIPAddress  = function(data){

   		scope.IPAddressType = true;
   		scope.subnetType = false;
   		scope.formData.ipRange = data;
   		scope.addIpAddress = [];
   		delete scope.formData.subnet;
   		scope.IPAddressObj.ipAddress = undefined;
   		scope.formData.ipType = undefined;
   	};
   	scope.selectedSubnet  = function(data){
   		
   		scope.subnetType = true;
   		scope.IPAddressType = false;
   		scope.formData.ipRange = data;
   		delete scope.addIpAddress;
   	};
   	
   	scope.selectService=function(serviceId){

       resourceFactory.provisioningCreatetemplateDataResource.get({orderId: routeParams.orderId,serviceId:serviceId} , function(data) {
     	   scope.parameterDatas=data.parameterDatas;
     	   scope.provisioningdata=data;
     	   scope.services=data.services;
     	   scope.ipPoolDatas=data.ipPoolDatas;
     	   scope.vlanDatas=data.vlanDatas;
     	  	for(var param in scope.parameterDatas){
         		  var temp = {};
         		
         		if(scope.parameterDatas[param].paramName == "SERVICE" && scope.parameterDatas[param].type == "Single"){
         			scope.parameterDatas[param].paramValue = data.serviceDatas[0].paramValue;
         		
         		}else if(scope.parameterDatas[param].paramName == "GROUP_NAME" && scope.parameterDatas[param].type == "Single"){
         			scope.parameterDatas[param].paramValue =data.groupDatas[0].groupName;
         		}
         		}
                 
             });
   		
   	};
   	
  //free ip details pop up start 
    scope.freeIpsPopupFun = function(){
  	  $modal.open({
            templateUrl: 'freeIps.html',
            controller: FreeIpsController,
            resolve:{}
        });	
    }
    
    var FreeIpsController = function($scope,$modalInstance){
  	  
  	  $scope.ipAddressesData = [];
  	 resourceFactory.runReportsResource.get({reportSource: 'FREEIPS',genericResultSet:false} , function(data) {
  		 	$scope.ipAddressesData = data;
  	 });
  	  
			$scope.cancel = function(){
				$modalInstance.dismiss('cancel');
			};
  };
   //free ip details pop up end 
   	
        scope.submit = function() {
        	scope.formData.clientId=scope.clientId;
        	scope.formData.orderId=routeParams.orderId;
        	scope.formData.planName=scope.planName;
        	scope.formData.macId=scope.device;
        	scope.formData.ipRange
        	
        	   scope.serviceParameters=[];
        	for(var param in scope.parameterDatas){
        		

        		  var temp = {};
        		 
        		  
        		if(scope.parameterDatas[param].paramName == "SERVICE"){
        			
        			 temp.paramName = scope.parameterDatas[param].paramName;
                    temp.paramValue = scope.parameterDatas[param].paramValue;
                    scope.serviceParameters.push(temp);
        		}else if(scope.parameterDatas[param].paramName == "GROUP_NAME"){
        			
        			 temp.paramName = scope.parameterDatas[param].paramName;
        			temp.paramValue = scope.formData.groupName;
        			scope.serviceParameters.push(temp);
                    
        		}else if(scope.parameterDatas[param].paramName == "VLAN_ID"){
        			
        			 temp.paramName = scope.parameterDatas[param].paramName;
                    temp.paramValue = scope.formData.vLan;
                    scope.serviceParameters.push(temp);
                    
        		}else if(scope.parameterDatas[param].paramName == "IP_ADDRESS"){
        			 temp.paramName = scope.parameterDatas[param].paramName;
        			 if(scope.subnetType){
        				 temp.paramValue = scope.IPAddressObj.ipAddress;
        				 if(temp.paramValue)
        				  scope.formData.ipType = "Subnet";
        				 else
        					 scope.formData.ipType = undefined;
        			 }
        			 if(scope.IPAddressType){
            			 temp.paramValue = scope.addIpAddress;
            		}
        			scope.serviceParameters.push(temp);
                    
        		}
        		  
        	}
        	   scope.formData.serviceParameters = scope.serviceParameters;
        	   
           resourceFactory.provisioningResource.save({'clientId': scope.clientId},scope.formData,function(data){
        	   location.path('/vieworder/' +routeParams.orderId+'/'+scope.clientId);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateProvisioningController', [
                                                                    '$scope',
                                                                    'webStorage', 
                                                                    'ResourceFactory',
                                                                    '$routeParams', 
                                                                    '$location',
                                                                    'dateFilter',
                                                                    '$modal', 
                                                                    mifosX.controllers.CreateProvisioningController]).run(function($log) {
    $log.info("CreateMediaController initialized");
  });
}(mifosX.controllers || {}));
