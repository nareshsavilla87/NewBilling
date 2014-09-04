(function(module) {
	mifosX.controllers = _.extend(module, {
		EventOrderController : function(scope, webStorage, resourceFactory,
				routeParams, location, dateFilter) {

			scope.formData = {};
			scope.clientId = routeParams.id;
			scope.priceFormData = {};
			var clientData = webStorage.get('clientData');
			scope.hwSerialNumber = clientData.hwSerialNumber;
			scope.displayName = clientData.displayName;
			scope.statusActive = clientData.statusActive;
			scope.accountNo = clientData.accountNo;
			scope.officeName = clientData.officeName;
			scope.balanceAmount = clientData.balanceAmount;
			scope.currency = clientData.currency;
			scope.imagePresent = clientData.imagePresent;
			scope.categoryType = clientData.categoryType;
			scope.email = clientData.email;
			scope.phone = clientData.phone;
			scope.requireDevice = webStorage.get('Registration_requires_device');
			// scope.datass = {};
			scope.start = {};
			scope.start.date = new Date();
			scope.minDate = scope.start.date;

			resourceFactory.eventOrderTemplateResource.get({
				clientId : routeParams.id
			}, function(data) {
				scope.devices = data.devices;
				scope.events = data.events;
				scope.optTypes = data.optType;
				scope.codes = data.codes;
				scope.clientTypes = data.clientType;
			});

			/*
			 * scope.getEventPrice = function(){
			 * resourceFactory.eventOrderPriceTemplateResource.getEventPrice({clientId :
			 * routeParams.id,ftype: scope.formData.formatType,otype:
			 * scope.formData.optType,eventId:
			 * scope.formData.eventId},function(data){ scope.price =
			 * data.eventPrice; scope.showPrice = true; },function(errorData){
			 * scope.showPrice = false; }); };
			 */

			/*
			 * scope.updatePrice = function(){ var fD = {}; fD.clientId =
			 * routeParams.id; fD.price = scope.price; fD.optType =
			 * scope.formData.optType; fD.formatType =
			 * scope.formData.formatType; fD.eventId = scope.formData.eventId
			 * resourceFactory.eventOrderPriceUpdateTemplateResource.update(fD,function(data){
			 * scope.price = data.resourceIdentifier; }); };
			 */
			scope.reset123 = function() {
				webStorage.add("callingTab", {
					someString : "eventordertab"
				});
			}

			scope.submit = function() {
				this.formData.locale = "en";
				this.formData.clientId =routeParams.id;
				this.formData.dateFormat = "dd MMMM yyyy";
				var adjustmentDate = dateFilter(scope.start.date,
						'dd MMMM yyyy');
				this.formData.eventBookedDate = adjustmentDate;
				resourceFactory.eventOrderTemplateResource.save(this.formData,
						function(data) {
							location.path('/viewclient/' + routeParams.id);
						});
			};

		}
	});
	mifosX.ng.application.controller(
			'EventOrderController',
			[ '$scope', 'webStorage', 'ResourceFactory', '$routeParams',
					'$location', 'dateFilter',
					mifosX.controllers.EventOrderController ]).run(
			function($log) {
				$log.info("EventOrderController initialized");
			});
}(mifosX.controllers || {}));
