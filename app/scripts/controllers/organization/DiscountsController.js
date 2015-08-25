(function(module) {
	mifosX.controllers = _.extend(module, {
		DiscountsController : function(scope, resourceFactory, location, webStorage, PermissionService, $modal, route) {

			scope.discounts = [];
			scope.promotiondatas = [];
			scope.PermissionService = PermissionService;

			var callingTab = webStorage.get('callingTab', null);
			if (callingTab == null) {
				callingTab = "";
			} else {
				scope.displayTab = callingTab.someString;
				if (scope.displayTab == "Promotioncode") {
					scope.PromotionCodeTab = true;
					webStorage.remove('callingTab');
				}
			}

			scope.getDicounts = function() {
				resourceFactory.discountsResource.getDiscount(function(data) {
					scope.discounts = data;
				});

			};
			scope.getPromotionCodes = function() {
				resourceFactory.promotionResource.get(function(data) {
					scope.promotiondatas = data;
				});
			};

			scope.routeToDiscounts = function(id) {
				location.path('/viewdiscounts/' + id);
			};
			scope.routeToPromotion = function(id) {
				location.path('/viewpromotioncode/' + id);
			};
			
	         /**
	       	 * Delete Discount
	       	 * */
	         scope.deleteDiscount = function (id){
	         	scope.discountId=id;
	          	 $modal.open({
	  	                templateUrl: 'deletePopupForDiscount.html',
	  	                controller: approve,
	  	                resolve:{}
	  	        });
	         };
	          
	      	function  approve($scope, $modalInstance) {
	      		$scope.approve = function () {
	              	resourceFactory.discountResource.remove({discountId: scope.discountId} , {} , function() {
	                    route.reload();
	              	});
	              	$modalInstance.dismiss('delete');
	      		};
	            $scope.cancel = function () {
	                  $modalInstance.dismiss('cancel');
	            };
	        }
	      	
	      /**
	       * 	Delete Promotioncodes
	       * */
	      	scope.deletePromotion = function (id){
	      		scope.promotionId = id;
	     	    $modal.open({
	     		  	templateUrl: 'deletepopupForPromotionCodes.html',
	               	controller: approvePromotion,
	               	resolve:{}
	           	});
	             
	        };
	        function approvePromotion($scope, $modalInstance) {
	        	$scope.approve = function (act) {
	        		scope.approveData = {};
	                resourceFactory.promotionResource.remove({promotioncodeId: scope.promotionId} , {} , function(data) {
	                	webStorage.add("callingTab", {someString: "Promotioncode" });
	                	route.reload();
	                });
	                $modalInstance.close('delete');
	            };
	            $scope.cancel = function () {
	            	$modalInstance.dismiss('cancel');
	            };
	        };
		}
	});
	mifosX.ng.application.controller('DiscountsController',[ 
	    '$scope',
	    'ResourceFactory', 
	    '$location',
	    'webStorage',
	    'PermissionService',
	    '$modal',
	    '$route',
	    mifosX.controllers.DiscountsController 
	    ]).run(function($log) {
	    	$log.info("DiscountsController initialized");
	    });
}(mifosX.controllers || {}));
