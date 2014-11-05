(function(module) {
  mifosX.controllers = _.extend(module, {
	  IpchangeController: function(scope, webStorage,resourceFactory, routeParams,location,dateFilter,modal,http,$rootScope,API_VERSION) {
		  
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
        scope.removeIpAddress = [];
        scope.exitIpParamData = [];
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
        scope.image=clientData.image;
        scope.device=clientData.hwSerialNumber;
        scope.displayName=clientData.displayName;
        scope.planName=orderData.planName;
       // scope.formData.groupName=orderData.groupName;
        scope.orderNo=orderData.orderNo;
        scope.parameterDatas=[];
        scope.ipTypeDatas = ["Single","Multiple"];
        scope.IPAddressType = true;
   		scope.subnetType = false;
   		scope.IPAddressObj = {ipAddress:undefined};
    
       resourceFactory.provisioningtemplateDataResource.get({orderId: routeParams.orderId,serviceId: routeParams.serviceId} , function(data) {
    	   
    	   scope.parameterDatas=data.parameterDatas;
    	   scope.provisioningdata=data;
    	   scope.services=data.services;
    	   scope.ipPoolDatas=data.ipPoolDatas;
    	   scope.vlanDatas=data.vlanDatas;
    	   scope.serviceDatas=data.serviceDatas;
    	   scope.exit.servicename=data.services[0].servicecode;
    	   scope.IPAddressType = true;
      		scope.subnetType = false;
      		scope.type="ipaddress";
      		for(var param in scope.serviceDatas){
      		     var temp = {};
      		 if(scope.serviceDatas[param].paramName == "IP_ADDRESS"){
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

                  	 //scope.addIpAddress.push(ipArray[ip]);
                   }
      			}
                  
      		}  
      	   }
                
            });
       
       /**Ip datas start*/
       scope.getData = function(query){
       	   return http.get($rootScope.hostUrl+API_VERSION+'/ippooling/search/', {
       	      params: {
       	    	  query: query
       	      }
       	    }).then(function(res){
       	    	ipPoolData = [];
       	    	for(var i in res.data.ipAddressData){
       	    		ipPoolData.push(res.data.ipAddressData[i]);
       	    		if(i==7){
       	    			break;
       	    		}
       	    	}
       	      return  ipPoolData;
       	    });
       
       };
         
         scope.addIpAddresses = function() {
           	if(scope.IPAddressObj.ipAddress)
      		    scope.addIpAddress.push(scope.IPAddressObj.ipAddress);
           	    scope.IPAddressObj.ipAddress = undefined;

      	};
    	
      	scope.deleteAddIpAddress = function(index,ip) {
        		scope.addIpAddress.splice(index, 1);
	
      	};
         
       /**Ip datas end*/
       
       scope.existIpData=function(ip,index){
     	 scope.exitIpAddress.splice(index,1);
    	// scope.addIpAddress.splice(index,1);
    	 scope.removeIpAddress.push(ip);

      };
         	
        scope.submit = function() {

        	for(var i in scope.exitIpAddress){
        		 scope.addIpAddress.push(scope.exitIpAddress[i]);
        	}
        	this.formData.clientId=parseInt(scope.clientId);
        	this.formData.planName=scope.planName;
        	this.formData.removeIps=scope.removeIpAddress;
        	this.formData.newIps=scope.addIpAddress;
        	
        	resourceFactory.provisioningIpChangeResource.update({'orderId':routeParams.orderId},this.formData,function(data){
            	   location.path('/vieworder/' +routeParams.orderId+'/'+scope.clientId);
              });

        };
        
        /**
         * free ip details pop up start
         * */ 
          scope.freeIpsPopupFun = function(){
        	  modal.open({
                  templateUrl: 'freeIps.html',
                  controller: FreeIpsController,
                  resolve:{}
              });	
          };
          
          var FreeIpsController = function($scope,$modalInstance){
        	  
        	  $scope.ipAddressesData = [];
        	 resourceFactory.runReportsResource.get({reportSource: 'FREEIPS',genericResultSet:false} , function(data) {
        		 	$scope.ipAddressesData = data;
        	 });
        	  
      			$scope.cancel = function(){
      				$modalInstance.dismiss('cancel');
      			};
        }; 
        
        
    }
  });
  mifosX.ng.application.controller('IpchangeController', ['$scope','webStorage', 'ResourceFactory','$routeParams', '$location','dateFilter','$modal','$http','$rootScope','API_VERSION', mifosX.controllers.IpchangeController]).run(function($log) {
    $log.info("IpchangeController initialized");
  });
}(mifosX.controllers || {}));
