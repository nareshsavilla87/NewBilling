(function(module) {
  mifosX.controllers = _.extend(module, {
	  KortaController: function(scope, resourceFactory, location, http, dateFilter,API_VERSION,$rootScope,PermissionService,$upload) {
		  
		  scope.formData = {}; 
		  scope.currencydatas = [];
		  scope.langs = [];
		  scope.doActionTypes = [
		                        {name:"STNOCAP"},
		                        {name:"Recurring"},
		                        {name:"STORAGE"}];
		  scope.formData.doAction = scope.doActionTypes[0];
		  scope.langs = mifosX.models.Langs;
	      scope.formData.optlang = scope.langs[0]; 
		  
		  scope.token = "thor0005";
		  
		  /*scope.md5value=md5("1200.00"+"8185318"+"26460"+"AshokReddy"+"/STNOCAP//"+scope.token + "aXVspr9GY4rEwwUGKI75jDerw7iRhkw388h23fVA" +"TEST");
		  alert(scope.md5value);*/
		  resourceFactory.currencyTemplateResource.get(function(data) {
	            scope.currencydatas = data.currencydata.currencyOptions;
	            		
	        });
		//  md5stringdata = amount + currency + merchantid + terminal + $description + / + do + // + token 
		  //String s= "100.0"+"ISK"+"8185318"+"26460"+"AshokReddy"+"/STNOCAP//thor0003"+"aXVspr9GY4rEwwUGKI75jDerw7iRhkw388h23fVA"+"TEST";
		  //scope.formData = {};
		  
		  scope.submitFun = function(){
			  scope.formData.md5value=md5(scope.formData.amount+".0"+scope.formData.currency+"8185318"+"26460"+scope.formData.description+"/"+scope.formData.doAction+"//"+scope.token + "aXVspr9GY4rEwwUGKI75jDerw7iRhkw388h23fVA" +"TEST");
			  console.log(scope.formData.md5value);
		  };
    }
  });
  mifosX.ng.application.controller('KortaController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter','API_VERSION','$rootScope','PermissionService','$upload', mifosX.controllers.KortaController]).run(function($log) {
    $log.info("KortaController initialized");
  });
}(mifosX.controllers || {}));
