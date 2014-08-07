(function(module) {
    mifosX.controllers = _.extend(module, {
        GlobalConfigurationController: function(scope,$modal,routeParams,resourceFactory , location,route) {
            scope.configs = [];
            resourceFactory.configurationResource.get(function(data) {
                for(var i in data.globalConfiguration){
                	if(data.globalConfiguration[i].name == 'Is_Paypal'){
                		data.globalConfiguration[i].value = "";
                	}
                	scope.configs.push(data.globalConfiguration[i]);
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
		        
		        scope.editPaypal= function(id){
			      	  scope.errorStatus=[];
			      	  scope.errorDetails=[];
			      	  scope.editId=id;
			        	  $modal.open({
			                templateUrl: 'editPaypal.html',
			                controller:editPaypalController ,
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
		        
		        var editPaypalController=function($scope,$modalInstance){

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

	        }
	    });

       
   
    mifosX.ng.application.controller('GlobalConfigurationController', ['$scope','$modal', '$routeParams', 'ResourceFactory', '$location','$route', mifosX.controllers.GlobalConfigurationController]).run(function($log) {
        $log.info("GlobalConfigurationController initialized");
    });
}(mifosX.controllers || {}));
