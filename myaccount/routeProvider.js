selfcareApp.config(function($routeProvider, $locationProvider) {
	
    $routeProvider
    
    .when('/active/:mailId/:registrationKey', {
        templateUrl: 'views/activateuser.html'
    })
    .when('/orderbookingscreen/:screenName/:clientId/:planId/:priceId', {
    	templateUrl: 'views/orderbookingscreen.html'
    })
    .when('/eventdetailspreviewscreen', {
    	templateUrl: 'views/eventdetailspreviewscreen.html'
    })
    .when('/profile', {
        templateUrl: 'views/profile.html'
    })
    .when('/statements', {
        templateUrl: 'views/statements.html'
    })
    .when('/tickets', {
        templateUrl: 'views/tickets.html'
    })
    .when('/newTicket', {
        templateUrl: 'views/newTicket.html'
    })
    .when('/changepwd', {
        templateUrl: 'views/changepassword.html'
    })
    .when('/additionalorders/:clientId', {
    	templateUrl: 'views/additionalorders.html'
    })
    .when('/vodevents', {
	    templateUrl: 'views/vodevents.html'
	})
	.when('/vieworder/:orderId/:clientId', {
        templateUrl: 'views/vieworder.html'
	})
	.when('/changeorder/:orderId/:clientId', {
	    templateUrl: 'views/changeorder.html'
    })
    .when('/renewalorder/:orderId/:clientId', {
    	templateUrl: 'views/renewalorder.html'
    })
    .when('/renewalorderpreviewscreen/:orderId/:clientId', {
    	templateUrl: 'views/renewalorderpreviewscreen.html'
    })
    .when('/services', {
    	templateUrl: 'views/services.html'
	})
	.when('/kortaintegration',{
    	templateUrl: 'views/kortaintegration.html'
    })
    .when('/kortasuccess/:screenName/:planId/:priceId',{
    	templateUrl: 'views/kortasuccess.html'
    })
    .when('/kortatokenintegration',{
    	templateUrl: 'views/kortatokenintegration.html'
    })
    .when('/changekortatoken',{
    	templateUrl: 'views/changekortatoken.html'
    })
    .when('/usersetting',{
    	templateUrl: 'views/usersettings.html'
    })
    .when('/viewstatement/:billId',{
    	templateUrl: 'views/viewstatement.html'
    })
    .when('/obsglobalpay',{
    	templateUrl: 'views/globalpaysuccess.html'
    })
    .when('/globalpayintegration',{
    	templateUrl: 'views/globalpayintegration.html'
    })
    .when('/paymentgatewayresponse/:clienId',{
    	templateUrl: 'views/paymentgatewayresponse.html'
    })
    .when('/paymentprocess/:screenName/:priceDataId/:planId/:price',{
    	templateUrl: 'views/paymentprocess.html'
    })
    .when('/neteller/:priceDataId',{
    	templateUrl: 'views/neteller.html'
    })
    .when('/internalpayment/:screenName/:clientId/:planId/:priceId/:amount',{
    	templateUrl: 'views/internalpayment.html'
    })
    .when('/prepaidpayment',{
    	templateUrl: 'views/prepaidpayment.html'
    });
       
    $locationProvider.html5Mode(false);
 
});
