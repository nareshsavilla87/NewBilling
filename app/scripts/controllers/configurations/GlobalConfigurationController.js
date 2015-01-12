(function(module) {
    mifosX.controllers = _.extend(module, {
        GlobalConfigurationController: function(scope,$modal,routeParams,resourceFactory , location,route,filter,webStorage) {
            scope.configs = [];
            scope.clientConfigs = {};
            scope.temp = [];
            scope.myData = [];
            scope.showSmtp = true;
            
            resourceFactory.configurationResource.get(function(data) {
                for(var i in data.globalConfiguration){
                	if(data.globalConfiguration[i].name == 'smtp'){
                		scope.showSmtp = false;
                	}
                	scope.configs.push(data.globalConfiguration[i]);
                }
              /*  scope.clientConfigs1 = data.clientConfiguration.split("{")[1].split("}")[0];
                scope.clientConfigs = "{"+scope.clientConfigs1+"}";*/
                scope.clientConfigs1 = data.clientConfiguration;
                webStorage.add("client_configuration",JSON.parse(scope.clientConfigs1));
                //JSON.parse(scope.clientConfigs)
                //console.log(scope.clientConfigs1.split(",").length+"hhjg");
                
                for(var j = 0; j < scope.clientConfigs1.split(",").length; j++){
                	scope.temp = scope.clientConfigs1.split(",")[j].split("\":");
                	//console.log(scope.temp[0]);
                	//scope.myData = {"name":scope.temp[0].split("\"")[1],"value":scope.temp[1].split("\"")[1]};
                	scope.myData.push({"name":scope.temp[0].split("\"")[1],"value":scope.temp[1].split("\"")[1]});
                	//console.log(scope.clientConfigs1.split(",")[j].split("\":")[0].split("\"")[1]);
                	//console.log(scope.clientConfigs1.split(",")[j].split("\":")[1].split("\"")[1]);
                }
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
            });
            
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
		        
		        /*scope.editPaypal= function(id){
			      	  scope.errorStatus=[];
			      	  scope.errorDetails=[];
			      	  scope.editId=id;
			        	  $modal.open({
			                templateUrl: 'editPaypal.html',
			                controller:editPaypalController ,
			                resolve:{}
			            });
			        	
			        };*/
		        
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
		                 // location.path('/paymentGateway');
		                        $modalInstance.close('delete');
		                    },function(errData){
		                  $scope.flag = false;
		                   });
		         	};  
		    		$scope.reject = function(){
		    			$modalInstance.dismiss('cancel');
		    		};
		        };
		        
		        /*var editPaypalController=function($scope,$modalInstance){

		        	$scope.formData = {}; 
		            $scope.statusData=[];
		            $scope.updateData={};
		            
		            
		            
		           // DATA GET
		            resourceFactory.configurationResource.get({configId: scope.editId}, function (data) {
		                 var value=data.value;
		                 var arr = value.split(",");
		                 var clientId = arr[0].split(":");
		                 var secretCode = arr[1].split('"');
		                 
		                 $scope.formData.id = clientId[1];
		                 $scope.formData.code = secretCode[3];
		            });
		            
		         	$scope.submit = function(){
		         		$scope.paypalFlag=true;
		         		//consoe.log($scope.clientId);
		         		$scope.paypalData = {"value":'{"clientId" :'+$scope.formData.id+',"secretCode" : "'+$scope.formData.code+'"}'};
		         		$scope.updateData.value=$scope.paypalData.value;
		         		//console.log(this.updateData);
		         		resourceFactory.configurationResource.update({configId: scope.editId},$scope.updateData,function(data){ 
		         			   $modalInstance.close('delete');

		                       route.reload();
		                 },function(errData){
			                  $scope.paypalFlag = false;
		                 });
		         	};  
		    		$scope.cancel = function(){
		    			$modalInstance.dismiss('cancel');
		    		};
		        };*/
		        
            
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
	            
	            scope.clientConfigChange = function(name,value){
	            	
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
	            
	        }
	    });

       
   
    mifosX.ng.application.controller('GlobalConfigurationController', ['$scope','$modal', '$routeParams', 'ResourceFactory', '$location','$route','$filter','webStorage', mifosX.controllers.GlobalConfigurationController]).run(function($log) {
        $log.info("GlobalConfigurationController initialized");
    });
}(mifosX.controllers || {}));
