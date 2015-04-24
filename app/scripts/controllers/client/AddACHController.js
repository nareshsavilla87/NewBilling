(function(module) {
	mifosX.controllers = _.extend(module, {
		AddACHController : function(scope,webStorage, routeParams , location, resourceFactory) {
			scope.clientId = routeParams.clientId;
			scope.walletConfig = webStorage.get('is-wallet-enable');
            var clientData = webStorage.get('clientData');
            scope.hwSerialNumber=clientData.hwSerialNumber;
            scope.displayName=clientData.displayName;
            scope.statusActive=clientData.statusActive;
            scope.accountNo=clientData.accountNo;
            scope.officeName=clientData.officeName;
            scope.balanceAmount=clientData.balanceAmount;
            scope.currency=clientData.currency;
            scope.imagePresent=clientData.imagePresent;
            scope.categoryType=clientData.categoryType;
            scope.email=clientData.email;
            scope.phone=clientData.phone;
            scope.image=clientData.image;
            scope.formData = {};
            scope.formEncryptedData = {};
           // var key = CryptoJS.enc.Base64.parse( mifosX.models.encrptionKey);
            var key = mifosX.models.encrptionKey;
            
            scope.reset123 = function(){
            	webStorage.add("callingTab", {someString: "ACHDetailsTab" });
            };
			  scope.submit = function () {
				    this.formEncryptedData.type="ACH";
				    this.formEncryptedData.routingNumber = CryptoJS.AES.encrypt(this.formData.routingNumber, key).toString();
				    this.formEncryptedData.bankAccountNumber = CryptoJS.AES.encrypt(this.formData.bankAccountNumber, key).toString();
				    this.formEncryptedData.bankName = CryptoJS.AES.encrypt(this.formData.bankName, key).toString();
				    this.formEncryptedData.name = this.formData.name;
				    this.formEncryptedData.accountType=this.formData.accountType;				   
	                resourceFactory.creditCardSaveResource.save({clientId:scope.clientId},this.formEncryptedData,function(data){
	                	webStorage.add("callingTab", {someString: "ACHDetailsTab" });
	                    location.path('/viewclient/' + data.clientId);
	                });
	            };
			
		}
	});
	 mifosX.ng.application.controller('AddACHController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.AddACHController]).run(function($log) {
	        $log.info("AddACHController initialized");
	    });
}(mifosX.controllers || {}));
