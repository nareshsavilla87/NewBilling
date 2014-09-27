(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditCurrencyDetailsController: function(scope, resourceFactory, location, routeParams,$rootScope) {
        
		  scope.countryDatas = [];
	        scope.currencydatas = [];
	        scope.currencystatus = [];
	        
        resourceFactory.currencyResource.getCurrencyDetails({id : routeParams.id, template : 'true'}, function(data) {
        	//alert('hi');
        	 	scope.countryDatas = data.countryData;
	            scope.currencydatas = data.currencydata.currencyOptions;
	            scope.currencystatus = data.currencystatus;
	           scope.formData =  data;
	           /* scope.formData = {
	            		
	            };*/
        });
        
        scope.submit = function() {
        	this.formData.locale = $rootScope.locale.code;
        	delete this.formData.countryData;
        	delete this.formData.currencydata;
        	delete this.formData.currencystatus;
        	delete this.formData.id;
        	resourceFactory.currencyResource.update({id: routeParams.id}, this.formData,function(data){
            location.path('/viewcurrencydetails/'+data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditCurrencyDetailsController', ['$scope', 'ResourceFactory', '$location', '$routeParams','$rootScope', mifosX.controllers.EditCurrencyDetailsController]).run(function($log) {
    $log.info("EditCurrencyDetailsController initialized");
  });
}(mifosX.controllers || {}));




/*(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateCurrencyDetailsController: function(scope, resourceFactory, location) {
	        scope.countryDatas = [];
	        scope.currencydatas = [];
	        scope.currencystatus = [];
	        
	        resourceFactory.currencyTemplateResource.get(function(data) {
	            scope.countryDatas = data.countryData;
	            scope.currencydatas = data.currencydata.currencyOptions;
	            scope.currencystatus = data.currencystatus;
	            scope.formData = {
	            		
	            };
	        });
	        
	        scope.submit = function() {  
	            resourceFactory.currencyResource.save(this.formData,function(data){
	            	location.path('/currencydetails');
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateCurrencyDetailsController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CreateCurrencyDetailsController]).run(function($log) {
	    $log.info("CreateCurrencyDetailsController initialized");
	  });
	}(mifosX.controllers || {}));

*/
