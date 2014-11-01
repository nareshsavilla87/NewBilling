(function(module) {
	mifosX.controllers = _.extend(module, {
		DiscountsController : function(scope, resourceFactory, location,webStorage, PermissionService) {

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
		}
	});
	mifosX.ng.application.controller('DiscountsController',[ '$scope', 'ResourceFactory', '$location', 'webStorage','PermissionService',mifosX.controllers.DiscountsController ]).run(function($log) {
		$log.info("DiscountsController initialized");
  });
}(mifosX.controllers || {}));
