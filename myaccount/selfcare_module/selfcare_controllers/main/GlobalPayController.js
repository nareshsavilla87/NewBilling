(function(selfcare_module) {
	selfcare.controllers = _.extend(selfcare_module, {
		GlobalPayController: function(scope, RequestSender,routeParams, location, http, dateFilter,webStorage) {  
		 
		  scope.formData = {};
  		  
  		  scope.clientId = routeParams.clientId;
  		  scope.formData.amount = routeParams.amount;
  		
		  var randomFun = function() {
				var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
				var string_length = 10;
				
				var randomstring = scope.clientId + '-';
				
				for (var i=0; i<string_length; i++) {
					var rnum = Math.floor(Math.random() * chars.length);
					randomstring += chars.substring(rnum,rnum+1);	
				}	
				scope.formData.txnref = randomstring;		
			};
			
		  randomFun();	

		  scope.previousPage = function(){
	    	  window.history.go(-1);
	      };
		    
		  scope.submitFun = function(){
			  console.log("Submit Function calling for globalpay");
		  };
		  
    }
  });
selfcare.ng.application.controller('GlobalPayController', ['$scope', 'RequestSender','$routeParams', '$location', '$http', 'dateFilter','webStorage', selfcare.controllers.GlobalPayController]).run(function($log) {
    $log.info("GlobalPayController initialized");
  });
}(selfcare.controllers || {}));
