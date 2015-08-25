(function(module) {
	mifosX.controllers = _.extend(module, {
		PaymentGatewayConfigurationController : function(scope, $modal, routeParams,resourceFactory, location, route) {
			
			scope.configs = [];
			
			resourceFactory.paymentGatewayConfigurationResource.get(function(data) {
				for ( var i in data.globalConfiguration) {
					scope.configs.push(data.globalConfiguration[i]);
				}
			});

			scope.edit = function(id,name,value) {
				scope.errorStatus = [];
				scope.errorDetails = [];
				var v = angular.fromJson(value);
				if(typeof(v) == "object"){
					$modal.open({
						templateUrl : 'editconfig.html',
						controller : editConfigController,
						resolve : {
							configId: function () {
						          return id;
						        }
						}
					});
				}else {
					$modal.open({
						templateUrl : 'editgeneral.html',
						controller : editgeneralController,
						resolve : {
							configId: function () {
						          return id;
						        }
						}
					});
				}
			};
			
			function editConfigController($scope, $modalInstance,configId) {
				$scope.keyValues = [];
				resourceFactory.paymentGatewayConfigurationResource.get({ configId : configId }, function(data) {		
					var val = angular.fromJson(data.value);
					if(Object.keys(val).length==0){
						$scope.createConfigParams();
					}else{
						for(var i in Object.keys(val)){
							var key = Object.keys(val)[i];
							var value = val[key];
							$scope.keyValues.push({key : key , value : value,disable:true});
						}
					}
				});
				
				$scope.createConfigParams = function(){
					$scope.keyValues.push({key : "" , value : "",disable:false});
				};
				$scope.editConfigParams = function(index,key){
					$(".configParam"+key).removeAttr("disabled");
					$scope.keyValues[index].disable = false;
				};
				$scope.deleteConfigParams = function(index){
					$scope.keyValues.splice(index,1);
				};
				
				$scope.submit = function() {
					$scope.editedData = {};
					for(var i in $scope.keyValues){
						$scope.editedData[$scope.keyValues[i].key] = $scope.keyValues[i].value;
					}
						
					$scope.updateData = {value:angular.toJson($scope.editedData)};
					resourceFactory.paymentGatewayConfigurationResource.update({configId : configId}, $scope.updateData, function(data) {
						$modalInstance.close('delete');
						route.reload();
					});
				};
				$scope.cancel = function() {
					$modalInstance.dismiss('cancel');
				};
			};
			
			function editgeneralController($scope, $modalInstance,configId) {

				$scope.formData = {};
				$scope.updateData = {};
	
				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({ configId : configId }, function(data) {		
					$scope.formData.value = data.value;
				});

				$scope.submit = function() {
					resourceFactory.paymentGatewayConfigurationResource.update({configId : configId}, $scope.formData, function(data) {
						$modalInstance.close('delete');
						route.reload();
					}, function(errData) {
						$scope.paypalFlag = false;
					});
				};
				$scope.cancel = function() {
					$modalInstance.dismiss('cancel');
				};
			};
			
			scope.enable = function(id) {

				var temp = {'enabled' : 'true'};
				resourceFactory.paymentGatewayConfigurationResource.update({ 'configId' : id }, temp, function(data) {
					route.reload();
				});
			};

			scope.disable = function(id) {

				var temp = {'enabled' : 'false'};
				resourceFactory.paymentGatewayConfigurationResource.update({ 'configId' : id }, temp, function(data) {
					route.reload();
				});
			};
			
		}
	});

	mifosX.ng.application.controller('PaymentGatewayConfigurationController', [ 
	'$scope', 
	'$modal', 
	'$routeParams', 
	'ResourceFactory',			
	'$location', 
	'$route',			
	mifosX.controllers.PaymentGatewayConfigurationController 
	]).run(function($log) {
		$log.info("PaymentGatewayConfigurationController initialized");		
	});
}(mifosX.controllers || {}));
