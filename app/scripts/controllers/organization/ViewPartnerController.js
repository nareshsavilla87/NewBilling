(function(module) {
	mifosX.controllers = _.extend(module, {

		ViewPartnerController : function(scope, routeParams, rootScope,	resourceFactory, webStorage,PermissionService,route,$modal) {

			scope.agreements = [];
			scope.officeFinanceTrans = [];
			scope.PermissionService = PermissionService;
			scope.officeId=routeParams.officeId;

			 var callingTab = webStorage.get('callingTab', null);
			if (callingTab == null) {
				callingTab = "";
			} else {
				scope.displayTab = callingTab.someString;
				if (scope.displayTab == "financial") {
					scope.FinancialTab = true;
					webStorage.remove('callingTab');
				}
			}
			
			
			 scope.partnersTab = function(){
		       	   webStorage.add("callingTab", {someString: "Partners" });
		     };

			resourceFactory.partnerResource.get({partnerId : routeParams.id}, function(data) {
				scope.partner = data;
				webStorage.add("partnerName", scope.partner.partnerName);
                
				//for agreement data
				resourceFactory.agreementResource.get({partnerId : scope.officeId}, function(data) {
					scope.agreements = data;
				});

			});

			//for office finance Transactions
			scope.getFinancialData = function() {
	
				resourceFactory.officeFinancialTransactionResource.get({officeId : scope.officeId}, function(data) {
					scope.officeFinanceTrans = data;
				});
				
				scope.partnersTab = function() {
					
					webStorage.add("callingTab", {someString : "Partners"});
				};
			};
			
			 /**
	       	 * Delete Agreement
	       	 * */
	         scope.deleteAgreement = function (id){
	         	scope.agreementId=id;
	          	 $modal.open({
	  	                templateUrl: 'deletePopupForAgreement.html',
	  	                controller: approve,
	  	                resolve:{}
	  	        });
	         };
	          
	      	function  approve($scope, $modalInstance) {
	      		$scope.approve = function () {
	              	resourceFactory.agreementResource.remove({agreementId: scope.agreementId} , {} , function() {
	                    route.reload();
	              	});
	              	$modalInstance.dismiss('delete');
	      		};
	            $scope.cancel = function () {
	                  $modalInstance.dismiss('cancel');
	            };
	        }

		}
	});
	mifosX.ng.application.controller(
			'ViewPartnerController',
			[ '$scope', '$routeParams', '$rootScope', 'ResourceFactory',
					'webStorage','PermissionService','$route','$modal', mifosX.controllers.ViewPartnerController ])
			.run(function($log) {
				$log.info("ViewPartnerController initialized");
			});
}(mifosX.controllers || {}));