(function(module) {
  mifosX.controllers = _.extend(module, {
    UploadClientIdentifierDocumentController: function(scope,webStorage, location, http, routeParams,API_VERSION,$rootScope,$upload) {
      scope.clientId = routeParams.clientId;
      scope.identityId = routeParams.resourceId;
      scope.walletConfig = webStorage.get('is-wallet-enable');
      var clientData = webStorage.get('clientData');
	    scope.hwSerialNumber=clientData.hwSerialNumber;
	    scope.displayName=clientData.displayName;
	    scope.statusActive=clientData.statusActive;
	    scope.accountNo=clientData.accountNo;
	    scope.officeName=clientData.officeName;
	    scope.balanceAmount=clientData.balanceAmount;
	    scope.hwSerialNumber=clientData.hwSerialNumber;
	    scope.currency=clientData.currency;
	    scope.imagePresent=clientData.imagePresent;
	    scope.categoryType=clientData.categoryType;
        scope.email=clientData.email;
        scope.phone=clientData.phone;
        if(scope.imagePresent){
        scope.image=clientData.image;
        }
     
      scope.onFileSelect = function($files) {
        scope.file = $files[0];
      };

      scope.reset123 = function(){
	    	   webStorage.add("callingTab", {someString: "moreInfo" });
	       };
	       
      scope.submit = function () {
        $upload.upload({
          url: $rootScope.hostUrl+ API_VERSION +'/client_identifiers/'+scope.identityId+'/documents', 
          data: scope.formData,
          file: scope.file
        }).then(function(data) {
          // to fix IE not refreshing the model
          if (!scope.$$phase) {
            scope.$apply();
          }
          webStorage.add("callingTab", {someString: "moreInfo" });
          location.path('/viewclient/'+scope.clientId);
        });
      };
    }
  });
  mifosX.ng.application.controller('UploadClientIdentifierDocumentController', ['$scope','webStorage', '$location', '$http', '$routeParams','API_VERSION','$rootScope','$upload', mifosX.controllers.UploadClientIdentifierDocumentController]).run(function($log) {
    $log.info("UploadClientIdentifierDocumentController initialized"); 
  });
}(mifosX.controllers || {}));