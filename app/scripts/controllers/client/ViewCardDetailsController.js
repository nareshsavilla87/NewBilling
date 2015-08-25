(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewCardDetailsController: function(scope, routeParams , route, location, resourceFactory, http,webStorage,$modal) {
        scope.clientcarddetails = {};
        var key  = mifosX.models.encrptionKey;

        resourceFactory.creditCardUpdateResource.get({clientId: routeParams.clientId, id: routeParams.id, cardType: routeParams.type} , function(data) {
            scope.clientcarddetails = data;  

            if(scope.clientcarddetails.type=='CreditCard'){
			        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails.cardNumber, key);
			        var cardNum = decrypted1.toString(CryptoJS.enc.Utf8);
			          var stars = "";
			         for (var j in cardNum)
			        	 if(j>=0&&j<(cardNum.length)-4) stars += "*";
			         cardNum = stars+cardNum.substr(cardNum.length-4,cardNum.length-1);
			         
			         scope.clientcarddetails.cardNumber = cardNum;
			        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails.cardExpiryDate, key);
			        scope.clientcarddetails.cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
			        
            }else if(scope.clientcarddetails.type=='ACH'){
            	  
			        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails.routingNumber, key);
			        var routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
			          var stars = "";
			         for (var j in routingNumber)
			        	 if(j>=0&&j<(routingNumber.length)-4) stars += "*";
			         routingNumber = stars+routingNumber.substr(routingNumber.length-4,routingNumber.length-1);
			         
			         scope.clientcarddetails.routingNumber = routingNumber;
			        
			        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails.bankAccountNumber, key);
			        var bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
			          var stars = "";
			         for (var j in bankAccountNumber)
			        	 if(j>=0&&j<(bankAccountNumber.length)-4) stars += "*";
			         bankAccountNumber = stars+bankAccountNumber.substr(bankAccountNumber.length-4,bankAccountNumber.length-1);
			         
			         scope.clientcarddetails.bankAccountNumber = bankAccountNumber;
			         var decrypted3 = CryptoJS.AES.decrypt(scope.clientcarddetails.bankName, key);
				        scope.clientcarddetails.bankName = decrypted3.toString(CryptoJS.enc.Utf8);
			        
            }
        });
        
        scope.documentsTab = function(){
        	 webStorage.add("callingTab", {someString: "identities" });
        };
        scope.deletecardDetails = function (){
        	
        	$modal.open({
    		  	templateUrl: 'approve.html',
              	controller: Approve,
              	resolve:{}
          	});
            
          };
          
          var Approve = function ($scope, $modalInstance) {
             
        	  $scope.approve = function () {
            	  resourceFactory.creditCardUpdateResource.delete({clientId: routeParams.clientId, id: routeParams.id} , {} , function(data) {
                 	 webStorage.add("callingTab", {someString: "identities" });
                       location.path('/viewclient/'+routeParams.clientId);      
                 });
            	  $modalInstance.close('delete');
              };
              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
              };

          };
    }
  });
  mifosX.ng.application.controller('ViewCardDetailsController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http','webStorage','$modal', mifosX.controllers.ViewCardDetailsController]).run(function($log) {
    $log.info("ViewCardDetailsController initialized");
  });
}(mifosX.controllers || {}));