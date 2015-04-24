(function(module) {
	mifosX.controllers = _.extend(module, {
		AddBillModesController : function(scope,webStorage, routeParams , location, resourceFactory) {
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
            if(scope.imagePresent){
             scope.image=clientData.image;
             }
            scope.formData = {};
            
            $('select').multipleSelect();
            resourceFactory.clientBillModeResource.get({clientId: scope.clientId} , function(data) {
            	//scope.clientId = data.id;
            	scope.billModes=data.billMode;
            	var str = scope.billModes;
                var optionsSelect = [];
                for(var i in str){
                	optionsSelect.push(str[i]);
                }
                $("select").multipleSelect("setSelects",optionsSelect);
            	
            });
            
            scope.reset123 = function(){
            	webStorage.add("callingTab", {someString: "moreInfo" });
            };
			  scope.submit = function () {
				  $("select").multipleSelect("getSelects");
				  var val = ($("select").multipleSelect("getSelects")).toString();
				 // console.log($("select").multipleSelect("getSelects"));
				  var s= val.replace(/,/g,'');
				  //console.log(s);
				  var obj = {"billMode":s};
	                resourceFactory.clientBillModeResource.update({clientId:scope.clientId},obj,function(data){
	                	webStorage.add("callingTab", {someString: "moreInfo" });
	                    location.path('/viewclient/' + data.resourceId);
	                });
	            };
			
		}
	});
	 mifosX.ng.application.controller('AddBillModesController', [
	 '$scope',
	 'webStorage', 
	 '$routeParams', 
	 '$location', 
	 'ResourceFactory', 
	 mifosX.controllers.AddBillModesController]).run(function($log) {
	 $log.info("AddBillModesController initialized");
	    });
}(mifosX.controllers || {}));
