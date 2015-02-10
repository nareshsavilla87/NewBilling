(function(module) {
	mifosX.controllers = _.extend(module, {
		PaymentGatewayConfigurationController : function(scope, $modal, routeParams,
				resourceFactory, location, route) {
			
			scope.configs = [];
			
			resourceFactory.paymentGatewayConfigurationResource.get(function(data) {
				for ( var i in data.globalConfiguration) {
					scope.configs.push(data.globalConfiguration[i]);
				}
			});

			scope.edit = function(id,name) {
				scope.errorStatus = [];
				scope.errorDetails = [];
				scope.editId = id;
				
				if(name == 'korta'){
					$modal.open({
						templateUrl : 'editKorta.html',
						controller : editKortaController,
						resolve : {}
					});
				} else if(name == 'paypal'){
					$modal.open({
						templateUrl : 'editPaypal.html',
						controller : editPaypalController,
						resolve : {}
					});
				} else if(name == 'dalpay'){
					$modal.open({
						templateUrl : 'editdalpay.html',
						controller : editDalpayController,
						resolve : {}
					});
				} else if(name == 'globalpay'){
					$modal.open({
						templateUrl : 'editGlobalpay.html',
						controller : editGlobalpayController,
						resolve : {}
					});

				} else if(name == 'neteller'){
					$modal.open({
						templateUrl : 'editneteller.html',
						controller : editNetellerController,
						resolve : {}
					});
				} else if(name == 'is-paypal' || name == 'is-paypal-for-ios'){
					$modal.open({
						templateUrl : 'editMobilePaypal.html',
						controller : editMobilePaypalController,
						resolve : {}
					});
				} else {
					$modal.open({
						templateUrl : 'editgeneral.html',
						controller : editgeneralController,
						resolve : {}
					});
				}

			};
			
			var editGlobalpayController = function($scope, $modalInstance) {

				$scope.formData = {};
				$scope.updateData = {};
	
				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({ configId : scope.editId }, function(data) {		
					var	val 	= JSON.parse(data.value);
					$scope.formData.merchantId = val['merchantId'];
					$scope.formData.userName = val['userName'];
					$scope.formData.password = val['password'];
				});

				$scope.submit = function() {
					$scope.globalpayData = {
							"value" : '{"merchantId" : "' + $scope.formData.merchantId
									+ '","userName" : "' + $scope.formData.userName
									+ '","password" : "' + $scope.formData.password
									+ '"}'	
					};
						
					$scope.updateData.value = $scope.globalpayData.value;
					resourceFactory.paymentGatewayConfigurationResource.update({configId : scope.editId}, $scope.updateData, function(data) {
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
			
			var editKortaController = function($scope, $modalInstance) {

				$scope.formData = {};
				$scope.updateData = {};
				
				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({ configId : scope.editId }, function(data) {
					var	val 	= JSON.parse(data.value);
					$scope.formData.merchantId = val['merchantId'];
					$scope.formData.terminalId = val['terminalId'];
					$scope.formData.secretCode = val['secretCode'];
				});

				$scope.submit = function() {
					$scope.kortaData = {
							"value" : '{"merchantId" : "' + $scope.formData.merchantId
									+ '","terminalId" : "' + $scope.formData.terminalId
									+ '","secretCode" : "' + $scope.formData.secretCode
									+ '"}'
					};				
					$scope.updateData.value = $scope.kortaData.value;
					resourceFactory.paymentGatewayConfigurationResource.update({configId : scope.editId}, $scope.updateData, function(data) {
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

			var editDalpayController = function($scope, $modalInstance) {

				$scope.formData = {};
				$scope.updateData = {};
				
				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({configId : scope.editId}, function(data) {
					var	val 	= JSON.parse(data.value);
					$scope.formData.url = val['url'];
					$scope.formData.merchantId = val['merchantId'];
					$scope.formData.pageId = val['pageId'];
				});
				
				$scope.submit = function() {
					$scope.dalpayData = {
							"value" : '{"url" : "' + $scope.formData.url
									+ '","merchantId" : "' + $scope.formData.merchantId
									+ '","pageId" : "' + $scope.formData.pageId
									+ '"}'
					};
						
					$scope.updateData.value = $scope.dalpayData.value;
					resourceFactory.paymentGatewayConfigurationResource.update({configId : scope.editId}, $scope.updateData, function(data) {
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

			var editPaypalController = function($scope, $modalInstance) {

				$scope.formData = {};
				$scope.updateData = {};
				
				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({ configId : scope.editId }, function(data) {
					var	val 	= JSON.parse(data.value);
					$scope.formData.paypalUrl = val['paypalUrl'];
					$scope.formData.paypalEmailId = val['paypalEmailId'];
				});

				$scope.submit = function() {
					$scope.paypalFlag = true;
					$scope.paypalData = {
							"value" : '{"paypalUrl" : "' + $scope.formData.paypalUrl
									+ '","paypalEmailId" : "' + $scope.formData.paypalEmailId
									+ '"}'
					};
						
					$scope.updateData.value = $scope.paypalData.value;
					resourceFactory.paymentGatewayConfigurationResource.update({configId : scope.editId}, $scope.updateData, function(data) {
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
			
			var editNetellerController = function($scope, $modalInstance) {

				$scope.formData = {};
				$scope.updateData = {};

				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({configId : scope.editId}, function(data) {		
					var	val 	= JSON.parse(data.value);
					$scope.formData.url = val['url'];
					$scope.formData.clientId = val['clientId'];
					$scope.formData.secretCode = val['secretCode'];
				});
				
				$scope.submit = function() {
					$scope.netellerData = {
							"value" : '{"url" : "' + $scope.formData.url
									+ '","clientId" : "' + $scope.formData.clientId
									+ '","secretCode" : "' + $scope.formData.secretCode
									+ '"}'
					};
						
					$scope.updateData.value = $scope.netellerData.value;
					resourceFactory.paymentGatewayConfigurationResource.update({configId : scope.editId}, $scope.updateData, function(data) {
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
			
			var editMobilePaypalController = function($scope, $modalInstance) {

				$scope.formData = {};
				$scope.updateData = {};
				
				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({ configId : scope.editId }, function(data) {
					var	val 	= JSON.parse(data.value);
					$scope.formData.clientId = val['clientId'];
					$scope.formData.secretCode = val['secretCode'];
					alert($scope.formData.clientId);
				});

				$scope.submit = function() {
					
					$scope.mobilepaypalData = {
							"value" : '{"clientId" : "' + $scope.formData.clientId
									+ '","secretCode" : "' + $scope.formData.secretCode
									+ '"}'
					};
						
					$scope.updateData.value = $scope.mobilepaypalData.value;
					resourceFactory.paymentGatewayConfigurationResource.update({configId : scope.editId}, $scope.updateData, function(data) {
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
			
			var editgeneralController = function($scope, $modalInstance) {

				$scope.formData = {};
				$scope.updateData = {};
	
				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({ configId : scope.editId }, function(data) {		
					$scope.formData.value = data.value;
				});

				$scope.submit = function() {
					resourceFactory.paymentGatewayConfigurationResource.update({configId : scope.editId}, $scope.formData, function(data) {
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
