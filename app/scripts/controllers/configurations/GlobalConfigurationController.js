(function(module) {
    mifosX.controllers = _.extend(module, {
        GlobalConfigurationController: function(scope,$modal,routeParams,resourceFactory , location,route,filter,webStorage) {
            scope.configs = [];
            scope.clientConfigs = {};
            scope.temp = [];
            scope.myData = [];
            scope.showSmtp = true;
        
            function configurationResourceData(){
            	resourceFactory.configurationResource.get(function(data) {
            		for(var i in data.globalConfiguration){
            			if(data.globalConfiguration[i].name == 'smtp'){
            				scope.showSmtp = false;
            			}
            			scope.configs.push(data.globalConfiguration[i]);
            		}
            		webStorage.add("client_configuration",JSON.parse(data.clientConfiguration)); 
            	});
            }
            configurationResourceData();
            function cacheResouceData(){
            	resourceFactory.cacheResource.get(function(data) {
            		for(var i=0;i<data.length;i++ ){
            			if(data[i].cacheType.id==2){
                        var cache = {};
                        cache.name = 'Is Cache Enabled';
                        cache.enabled =  data[i].enabled;
            		}
                }
                scope.configs.push(cache);
            	});
            }
            cacheResouceData();
            
            scope.edit= function(id){
		      	  scope.errorStatus=[];
		      	  scope.errorDetails=[];
		      	  scope.editId=id;
		        	  $modal.open({
		                templateUrl: 'editglobal.html',
		                controller:editGlobalController ,
		                resolve:{}
		            });
		        	
		        };
		        
		        var editGlobalController=function($scope,$modalInstance){
			      	  
		        	$scope.formData = {}; 
		            $scope.statusData=[];
		            $scope.updateData={};
		            //console.log(scope.editId);
		            
		            
		           // DATA GET
		            resourceFactory.configurationResource.get({configId: scope.editId}, function (data) {
		                $scope.formData = data;//{value: data.value};
		                $scope.formData.value=data.value;
		            });
		            
		         	$scope.accept = function(){
		         		$scope.flag=true;
		         		this.updateData.value=this.formData.value;
		         		resourceFactory.configurationResource.update({configId: scope.editId},this.updateData,function(data){ 
		                  route.reload();
		                  $modalInstance.close('delete');
		                  },function(errData){
		                  $scope.flag = false;
		                });
		         	};  
		    		$scope.reject = function(){
		    			$modalInstance.dismiss('cancel');
		    		};
		        };
		        
		        scope.getClientConfiguration = function(){
		        	 scope.myData = [];
          			 scope.mainObject = webStorage.get("client_configuration");
          			 scope.clientListObject = webStorage.get("client_configuration").clientListing;
          			 
          	    	  for (var key in scope.mainObject) {
          	    		  if(key != "clientListing"){
          	    			  scope.myData.push({
      		  					"name" : key,
      		  					"value" :scope.mainObject[key],
          	    			  });
          	    		  }else{
          	    			 scope.value = {};
          	    			 for (var keyClientList in scope.clientListObject){
          	    				 if(scope.clientListObject[keyClientList] == 'true'){
          	    					scope.value[keyClientList] = scope.clientListObject[keyClientList]; 
          	    				 }
         	    			 }
          	    			 scope.myData.push({
     		  					"name" : key,
     		  					"value" :scope.value,
     	    				 }); 
          	    		  }
          	    	  }
		        };
            
		        scope.enable = function (id, name) {
	                if (name == 'Is Cache Enabled') {
	                    var temp = {};
	                    temp.cacheType = 2;
	                    resourceFactory.cacheResource.update(temp, function (data) {
	                        route.reload();
	                    });
	                }
	                else {
	                    var temp = {'enabled': 'true'};
	                    resourceFactory.configurationResource.update({'configId': id}, temp, function (data) {
	                        route.reload();
	                    });
	                }
	            };
	            
	            scope.disable = function (id, name) {
	                if (name == 'Is Cache Enabled') {
	                    var temp = {};
	                    temp.cacheType = 1;
	                    resourceFactory.cacheResource.update(temp, function (data) {
	                        route.reload();
	                    });
	                }
	                else {
	                    var temp = {'enabled': 'false'};
	                    resourceFactory.configurationResource.update({'configId': id}, temp, function (data) {
	                        route.reload();
	                    });
	                }
	            };
	            
	            //client Configuration
	            
	            scope.getConfigLookUp = function(){
	            	scope.configLookupsdata = filter('ConfigLookup')('jsonData');
	            	
	            };
	            
	            scope.clientConfigChange = function(name,value,html){
	            	
	            	if(value == 'true'){
	            		scope.oldValue = value;
	            		scope.newValue = false;
	            	}else{
	            		scope.oldValue = value;
	            		scope.newValue = true;
	            	}
	            	var tempclient = {"name":name,"newValue":scope.newValue,"oldValue":scope.oldValue};
	            	resourceFactory.clientConfigurationResource.update(tempclient, function (data) {
	            		webStorage.add("client_configuration",data);
                        route.reload();
                        if(html == 'editclientlisting.html'){scope.editClientListing();}
                        else if(html == 'editregestrationlisting.html'){scope.editRegistrationListing();};
                    });
	            };
	            
	            scope.editClientConfigs = function(name,value){
	          	  scope.oldValue = value;
	          	  scope.clientConfigName = name;
	                $modal.open({
	                    templateUrl: 'editClientConfig.html',
	                    controller: Approve,
	                    resolve:{}
	                });
	            };
	            
	            function Approve($scope, $modalInstance) {
	            	$scope.data = {};
	            	$scope.dates = [
		                      	        'dd MMM yyyy',
		                                'dd MMMM yyyy',
		                                'dd/MMM/yyyy',
		                                'dd/MMMM/yyyy',
		                                'dd-MMM-yyyy',
		                                'dd-MMMM-yyyy',
		                                'MMM-dd-yyyy',
		                                'MMMM-dd-yyyy',
		                                'MMM dd yyyy',
		                                'MMMM dd yyyy',
		                                'MMM/dd/yyyy',
		                                'MMMM/dd/yyyy'
		                                  
		                           ];
	            	$scope.data.value = scope.oldValue;
	            	$scope.data.name = scope.clientConfigName;
	                $scope.approve = function (newValue) {
	                	var tempclientConfig = {"name":scope.clientConfigName,"newValue":newValue,"oldValue":scope.oldValue};
	                    scope.approveData = {};
	                    resourceFactory.clientConfigurationResource.update(tempclientConfig, function (data) {
	                    	webStorage.add("client_configuration",data);
	                        route.reload();
	                    });
	                    $modalInstance.close('delete');
	                };
	                $scope.cancel = function () {
	                    $modalInstance.dismiss('cancel');
	                };
	            }
	            
	            scope.editClientListing=function(name, value){
	                $modal.open({
	                    templateUrl: 'editclientlisting.html',
	                    controller: ApproveClientListing,
	                    resolve:{}
	                });
	            };
	            scope.editRegistrationListing=function(){
	            	$modal.open({
	            		templateUrl: 'editregestrationlisting.html',
	            		controller: ApproveRegistrationListing,
	            		resolve:{}
	            	});
	            };
	           function ApproveClientListing($scope, $modalInstance) {
	        	   
	          	  	$scope.clientListData = [];
	          	  	$scope.tempData = [];
	          	  	$scope.tempData = webStorage.get("client_configuration").clientListing;
	          	  	for (var key in $scope.tempData) {
      	    			  $scope.clientListData.push({
  		  					"name" : key,
  		  					"value" :$scope.tempData[key].toString(),
      	    			  });
	          	  	}
	                $scope.approve = function (name, value) {
	                    scope.approveData = {};
	                    scope.clientConfigChange(name, value , 'editclientlisting.html');
	                    $modalInstance.close('delete');
	                };
	                $scope.cancel = function () {
	                    $modalInstance.dismiss('cancel');
	                };
	            }
	           
	           function ApproveRegistrationListing($scope, $modalInstance) {
	        	   
	        	   $scope.registrationListData = [];
	        	   $scope.tempData = [];
	        	   $scope.tempData = webStorage.get("client_configuration").registrationListing;
	        	   for (var key in $scope.tempData) {
	        		   $scope.registrationListData.push({
	        			   "name" : key,
	        			   "value" :$scope.tempData[key].toString(),
	        		   });
	        	   }
	        	   $scope.approve = function (name, value) {
	        		   scope.approveData = {};
	        		   scope.clientConfigChange(name, value , 'editregestrationlisting.html');
	        		   $modalInstance.close('delete');
	        	   };
	        	   $scope.cancel = function () {
	        		   $modalInstance.dismiss('cancel');
	        	   };
	           }
	            
	        }
	    });

       
   
    mifosX.ng.application.controller('GlobalConfigurationController', ['$scope','$modal', '$routeParams', 'ResourceFactory', '$location','$route','$filter','webStorage', mifosX.controllers.GlobalConfigurationController]).run(function($log) {
        $log.info("GlobalConfigurationController initialized");
    });
}(mifosX.controllers || {}));
