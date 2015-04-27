(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditProvisioningDetailsController: function(scope, webStorage,resourceFactory, routeParams,location,dateFilter,modal) {
		  
		scope.orderId = routeParams.orderId;
        scope.provisioningdata= [];
        scope.services= [];
        scope.ipPoolDatas=[];
        scope.vlanDatas=[];
        scope.formData={};
        scope.addIpAddress = [];
        scope.serviceDatas =[];
        scope.exit={};
        scope.exitIpAddress = [];
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
        scope.image=clientData.image;
        scope.planName=orderData.planName;
       // scope.formData.groupName=orderData.groupName;
        scope.orderNo=orderData.orderNo;
        scope.parameterDatas=[];
        scope.ipTypeDatas = ["Single","Multiple"];
        scope.IPAddressType = true;
   		scope.subnetType = false;
   		scope.formData.ipRange = "ipAddress";
   		scope.IPAddressObj = {ipAddress:undefined};
    
       resourceFactory.provisioningtemplateDataResource.get({orderId: routeParams.orderId,serviceId: routeParams.serviceId} , function(data) {
    	   
    	   scope.parameterDatas=data.parameterDatas;
    	   scope.provisioningdata=data;
    	   scope.services=data.services;
    	   scope.ipPoolDatas=data.ipPoolDatas;
    	   scope.vlanDatas=data.vlanDatas;
    	   scope.serviceDatas=data.serviceDatas;
    	   scope.formData.serviceName=data.services[0].serviceId;
    	   scope.formData.groupName=data.groupDatas[0].groupName;
    	   scope.exit.servicename=data.services[0].servicecode;
    	   scope.IPAddressType = true;
      		scope.subnetType = false;
      		scope.type="ipaddress";
    	   
    	   
    	for(var param in scope.serviceDatas){
    		

    		  var temp = {};
    		
    		if(scope.serviceDatas[param].paramName == "SERVICE"){
    			
    			 temp.paramName = scope.serviceDatas[param].paramName;
    			 scope.formData.service = scope.serviceDatas[param].paramValue;
    			  
               // scope.serviceParameters.push(temp);
    		}else if(scope.serviceDatas[param].paramName == "GROUP_NAME"){
    			
    			 temp.paramName = scope.serviceDatas[param].paramName;
    			//temp.paramValue = this.formData.groupName;
    			//scope.serviceParameters.push(temp);
               // delete this.formData.groupName;
                
    		}else if(scope.serviceDatas[param].paramName == "VLAN_ID"){
    			
    			 temp.paramName = scope.serviceDatas[param].paramName;
                scope.formData.vLan=scope.serviceDatas[param].paramValue;
                scope.exit.vlan=scope.serviceDatas[param].paramValue;
                
                
                
    		}else if(scope.serviceDatas[param].paramName == "IP_ADDRESS"){
    			 scope.exit.ipaddr=undefined;
    			 temp.paramName = scope.serviceDatas[param].paramName;
    			temp.paramValue = scope.serviceDatas[param].paramValue;
    			scope.exit.ipValue=scope.serviceDatas[param].paramValue;

    			var ipValues =temp.paramValue;
    			var found = temp.paramValue.match("/");
    			
    			if(found){
    				var params=ipValues.split("/");
    			//	scope.subnetType = true;
    			//	scope.IPAddressType = false;
    				 scope.exit.ipaddr=temp.paramValue;
    				/*scope.type='subnet';	 
    				 scope.exit.ipaddr=temp.paramValue;
    				  for(var v in params){              	 
    	                
    	                	 scope.IPAddressObj.ipAddress=params[0];
    	                	 scope.formData.subnet=params[1];
    	                 }*/
    			}else{
    			var ipArray =  JSON.parse(temp.paramValue);
    			scope.exitIpAddress=[];
                 for(var ip in ipArray){      	 
                	 scope.exitIpAddress.push(ipArray[ip]);            	 
                 }
                 
                 if(scope.addIpAddress.length > 1)
             		scope.formData.ipType = "Multiple";
             	else
             		scope.formData.ipType = "Single";

    			}
                
    		}
    		
    		  
    	}
                
            });
       
       
   	scope.selectService=function(serviceId){
   		
   	 resourceFactory.provisioningtemplateDataResource.get({orderId: routeParams.orderId,serviceId:serviceId} , function(data) {
   	  scope.formData.serviceName=serviceId;
  	   scope.parameterDatas=data.parameterDatas;
  	   scope.provisioningdata=data;
  	   scope.services=data.services;
  	   scope.ipPoolDatas=data.ipPoolDatas;
  	   scope.vlanDatas=data.vlanDatas;
  	  scope.serviceDatas=data.serviceDatas;
  	   
  	for(var param in scope.serviceDatas){
  		

  		  var temp = {};
  		 
  		 
  		if(scope.serviceDatas[param].paramName == "SERVICE"){
  			
  			 temp.paramName = scope.serviceDatas[param].paramName;
  		     scope.formData.service = scope.serviceDatas[param].paramValue;
  		     
             // scope.serviceParameters.push(temp);
  		}else if(scope.serviceDatas[param].paramName == "GROUP_NAME"){
  			
  			 temp.paramName = scope.serviceDatas[param].paramName;
  			//temp.paramValue = this.formData.groupName;
  			//scope.serviceParameters.push(temp);
             // delete this.formData.groupName;
              
  		}else if(scope.serviceDatas[param].paramName == "VLAN_ID"){
  			
  			 temp.paramName = scope.serviceDatas[param].paramName;
              scope.formData.vLan=scope.serviceDatas[param].paramValue;
              scope.exit.vlan=scope.serviceDatas[param].paramValue;
              
  		}else if(scope.serviceDatas[param].paramName == "IP_ADDRESS"){
  			 temp.paramName = scope.serviceDatas[param].paramName;
  			 temp.paramValue = scope.serviceDatas[param].paramValue;
  			  scope.exit.ipValue=scope.serviceDatas[param].paramValue;
  			
  			var ipValues =temp.paramValue;
			var found = temp.paramValue.match("/");
			
			if(found){
				var params=ipValues.split("/");
				//scope.subnetType = true;
				//scope.IPAddressType = false;
				//scope.type='subnet';	 
				//scope.formData.ipRange = "subnet";
				/*  for(var v in params){              	 
	                
	                	 scope.IPAddressObj.ipAddress=params[0];
	                	 scope.formData.subnet=params[1];
	                 }*/
			}else{
			var ipArray =  JSON.parse(temp.paramValue);
			scope.exitIpAddress=[];
			scope.formData.ipRange = "ipAddress";
             for(var ip in ipArray){      	 
            	 scope.exitIpAddress.push(ipArray[ip]);           	 
             }
             
             if(scope.addIpAddress.length > 1)
         		scope.formData.ipType = "Multiple";
         	else
         		scope.formData.ipType = "Single";
			}

              
  		}
  		
  		  
  	}
              
          });
     
   		
   		/*

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
                  
              });*/
    		
    	};
    	
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
          		scope.formData.ipType = undefined;
          	
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
       	
      //free ip details pop up start 
        scope.freeIpsPopupFun = function(){
      	  modal.open({
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
        	
        	this.formData.clientId=scope.clientId;
        	this.formData.orderId=routeParams.orderId;
        	this.formData.planName=scope.planName;
        	this.formData.macId=scope.device;
        	//delete this.formData.addIpAddress;
        	
        	
        	   scope.serviceParameters=[];
        	for(var param in scope.parameterDatas){
        		

        		  var temp = {};
        		 
        		  
        		if(scope.parameterDatas[param].paramName == "SERVICE"){
        			
        			 temp.paramName = scope.parameterDatas[param].paramName;
                    temp.paramValue =this.formData.service;
                    scope.serviceParameters.push(temp);
        		}else if(scope.parameterDatas[param].paramName == "GROUP_NAME"){
        			
        			 temp.paramName = scope.parameterDatas[param].paramName;
        			temp.paramValue = this.formData.groupName;
        			scope.serviceParameters.push(temp);
                   // delete this.formData.groupName;
                    
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
                   // delete this.formData.ipAddress;
                    
        		}else if(scope.parameterDatas[param].paramName == "VLAN_ID"){
        			
       			 temp.paramName = scope.parameterDatas[param].paramName;
                   temp.paramValue = this.formData.vLan;
                   scope.serviceParameters.push(temp);
                   //delete this.formData.vLan;
                   
       		}
        		
        		  
        	}
        	   this.formData.serviceParameters = scope.serviceParameters;
        	   
        	   resourceFactory.provisioningserviceResource.update({'orderId':routeParams.orderId},this.formData,function(data){
            	   location.path('/vieworder/' +routeParams.orderId+'/'+scope.clientId);
              });

        };
    }
  });
  mifosX.ng.application.controller('EditProvisioningDetailsController', ['$scope','webStorage', 'ResourceFactory','$routeParams', '$location','dateFilter','$modal', mifosX.controllers.EditProvisioningDetailsController]).run(function($log) {
    $log.info("EditProvisioningDetailsController initialized");
  });
}(mifosX.controllers || {}));
