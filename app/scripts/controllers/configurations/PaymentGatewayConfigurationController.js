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
				} 
				
				if(name == 'paypal'){
					$modal.open({
						templateUrl : 'editPaypal.html',
						controller : editPaypalController,
						resolve : {}
					});
				} 
				
				if(name == 'dalpay'){
					$modal.open({
						templateUrl : 'editdalpay.html',
						controller : editDalpayController,
						resolve : {}
					});
				}
				
				if(name == 'globalpay'){
					$modal.open({
						templateUrl : 'editGlobalpay.html',
						controller : editGlobalpayController,
						resolve : {}
					});
				} 

			};

			/*scope.editPaypal = function(id) {
				scope.errorStatus = [];
				scope.errorDetails = [];
				scope.editId = id;
				$modal.open({
					templateUrl : 'editPaypal.html',
					controller : editPaypalController,
					resolve : {}
				});

			};*/
			
			var editGlobalpayController = function($scope, $modalInstance) {

				$scope.formData = {};
				$scope.statusData = [];
				$scope.updateData = {};

				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({ configId : scope.editId }, function(data) {
					var value = data.value;
					var arr = value.split(",");
					var merchantId = arr[0].split('"');
					var userName = arr[1].split('"');
					var password = arr[2].split('"');

					$scope.formData.merchantId = merchantId[3];
					$scope.formData.userName = userName[3];
					$scope.formData.password = password[3];
				});

				$scope.submit = function() {
					
					$scope.kortaData = {
						"value" : '{"merchantId" : "' + $scope.formData.merchantId
								+ '","userName" : "' + $scope.formData.userName
								+ '","password" : "' + $scope.formData.password
								+ '"}'
					};
					$scope.updateData.value = $scope.kortaData.value;
					//console.log(this.updateData);
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
				$scope.statusData = [];
				$scope.updateData = {};

				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({ configId : scope.editId }, function(data) {
					var value = data.value;
					var arr = value.split(",");
					var merchantId = arr[0].split('"');
					var terminalId = arr[1].split('"');
					var secretCode = arr[2].split('"');

					$scope.formData.merchantId = merchantId[3];
					$scope.formData.terminalId = terminalId[3];
					$scope.formData.secretCode = secretCode[3];
				});

				$scope.submit = function() {
					
					$scope.kortaData = {
						"value" : '{"merchantId" : "' + $scope.formData.merchantId
								+ '","terminalId" : "' + $scope.formData.terminalId
								+ '","secretCode" : "' + $scope.formData.secretCode
								+ '"}'
					};
					$scope.updateData.value = $scope.kortaData.value;
					//console.log(this.updateData);
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
				$scope.statusData = [];
				$scope.updateData = {};
				//console.log(scope.editId);

				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({configId : scope.editId}, function(data) {
					$scope.formData = data;//{value: data.value};
					$scope.formData.value = data.value;
				});

				$scope.accept = function() {
					$scope.flag = true;
					this.updateData.value = this.formData.value;
					resourceFactory.paymentGatewayConfigurationResource.update({configId : scope.editId }, this.updateData, function(data) {
						route.reload();
						$modalInstance.close('delete');
					}, function(errData) {
						$scope.flag = false;
					});
				};
				
				$scope.reject = function() {
					$modalInstance.dismiss('cancel');
				};
			};

			var editPaypalController = function($scope, $modalInstance) {

				$scope.formData = {};
				$scope.statusData = [];
				$scope.updateData = {};

				// DATA GET
				resourceFactory.paymentGatewayConfigurationResource.get({ configId : scope.editId }, function(data) {
					var value = data.value;
					var arr = value.split(",");
					var paypalUrl = arr[0].split('"');
					var paypalEmailId = arr[1].split('"');

					$scope.formData.url = paypalUrl[3];
					$scope.formData.emailId = paypalEmailId[3];
				});

				$scope.submit = function() {
					$scope.paypalFlag = true;
					//consoe.log($scope.clientId);
					$scope.paypalData = {
						"value" : '{"paypalUrl" : "' + $scope.formData.url
								+ '","paypalEmailId" : "' + $scope.formData.emailId
								+ '"}'
					};
					$scope.updateData.value = $scope.paypalData.value;
					//console.log(this.updateData);
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
