(function(selfcare) {
  var defineRouteProvider = function($routeProvider, $locationProvider) {
    $routeProvider
    
    .when('/active/:mailId/:registrationKey', {
        templateUrl: 'selfcare_module/views/clients/activateuser.html'
    })
    .when('/additionalorderspreviewscreen/:orderId/:clientId', {
    	templateUrl: 'selfcare_module/views/clients/additionalorderspreviewscreen.html'
    })
    .when('/eventdetailspreviewscreen', {
    	templateUrl: 'selfcare_module/views/clients/eventdetailspreviewscreen.html'
    })
    .when('/profile', {
        templateUrl: 'selfcare_module/views/clients/profile.html'
    })
    .when('/statements', {
        templateUrl: 'selfcare_module/views/clients/statements.html'
    })
    .when('/tickets', {
        templateUrl: 'selfcare_module/views/clients/tickets.html'
    })
    .when('/newTicket', {
        templateUrl: 'selfcare_module/views/clients/newTicket.html'
    })
    .when('/changepwd', {
        templateUrl: 'selfcare_module/views/clients/changepassword.html'
    })
    .when('/additionalorders/:orderId/:clientId', {
    	templateUrl: 'selfcare_module/views/clients/additionalorders.html'
    })
    .when('/vodevents', {
	    templateUrl: 'selfcare_module/views/clients/vodevents.html'
	})
	.when('/vieworder/:orderId/:clientId', {
        templateUrl: 'selfcare_module/views/clients/vieworder.html'
	})
	.when('/changeorder/:orderId/:clientId', {
	    templateUrl: 'selfcare_module/views/clients/changeorder.html'
    })
    .when('/renewalorder/:orderId/:clientId', {
    	templateUrl: 'selfcare_module/views/clients/renewalorder.html'
    })
    .when('/renewalorderpreviewscreen/:orderId/:clientId', {
    	templateUrl: 'selfcare_module/views/clients/renewalorderpreviewscreen.html'
    })
    .when('/listofvods', {
    	templateUrl: 'selfcare_module/views/clients/listofvods.html'
	})
	.when('/kortaIntegration/:planId/:clientId',{
    	templateUrl: 'selfcare_module/views/kortaIntegration.html'
    })
    .when('/kortasuccess',{
    	templateUrl: 'selfcare_module/views/kortasuccess.html'
    })
    .when('/kortatokenpayment/:planId/:clientId',{
    	templateUrl: 'selfcare_module/views/KortaTokenPayment.html'
    })
    .when('/kortatokenpaymentsuccess/:planId/:clientId',{
    	templateUrl: 'selfcare_module/views/KortaTokenPaymentSuccess.html'
    })
    .when('/changekortatoken',{
    	templateUrl: 'selfcare_module/views/ChangeKortaToken.html'
    })
    .when('/usersetting',{
    	templateUrl: 'selfcare_module/views/clients/usersettings.html'
    })
    .when('/viewstatement/:billId',{
    	templateUrl: 'selfcare_module/views/clients/viewstatement.html'
    })
    .when('/obsglobalpay/:planId/:clientId',{
    	templateUrl: 'selfcare_module/views/globalpay.html'
    })
    .when('/globalpayIntegration/:clientId/:amount',{
    	templateUrl: 'selfcare_module/views/globalpayIntegration.html'
    })
    .when('/paymentgatewayresponse',{
    	templateUrl: 'selfcare_module/views/paymentgatewayresponse.html'
<<<<<<< HEAD
=======
    })
    .when('/termsandconditionsonlinepayment',{
    	templateUrl: 'selfcare_module/views/termsandConditionsforOnlinePayment.html'
>>>>>>> upstream/master
    });
       
    $locationProvider.html5Mode(false);
  };
  selfcare.ng.application.config(defineRouteProvider).run(function($log) {
    $log.info("RouteProvider definition completed");
  });
}(selfcare || {}));
