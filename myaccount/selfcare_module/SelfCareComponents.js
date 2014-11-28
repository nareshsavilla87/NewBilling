define(['underscore', 'selfcare'], function() {
  var components = {
	  
    selfcare_models:      [
							  'LoggedInUser',
							  'roleMap',
							  'Langs',
							  'paypalUser',
						      'paypalUser',
						      'returnURL',
						      'dalpayURL',
						      'autherization',
						      'constants'
				          ],
				     
    selfcare_services:    [
						      'RequestSender',
						      'HttpServiceProvider',
						      'AuthenticationService',
						      'SessionManager',
						      'NavigationPage',
						      'Paginator'
					      ],
					    
    selfcare_controllers: [
                           	  'main/SelfCareMainController',
						      'main/SignInFormController',
						      'main/SignUpFormController',
						      'main/ActivateUserController',
						      'main/ActiveClientPreviewScreenController',
						      'main/ProfileController',
						      'main/OrdersController',
						      'main/StatementsController',
						      'main/PaymentsController',
						      'main/TicketsController',
						      'main/CreateTicketController',
						      'main/ChangePasswordController',
						      'main/AdditionalOrdersController',
						      'main/AdditionalOrdersPreviewScreenController',
						      'main/EventDetailsPreviewScreenController',
						      'main/HomeController',
						      'main/VODEventsController',
						      'main/ViewOrderController',
						      'main/ChangeOrderController',
						      'main/RenewalOrderController',
						      'main/RenewalOrderPreviewScreenController',
						      'main/ListOfVODSController',
						      'main/KortaController',
						      'main/KortaSuccessController',
						      'main/KortaTokenPaymentController',
						      'main/KortaTokenPaymentSuccessController',
						      'main/ChangeKortaTokenPaymentController',
						      'main/UserSettingController',
						      'main/GlobalPaySuccessController',
						      'main/GlobalPayController'

					      ],
					      
    selfcare_filters:    [
                       	      'DateFormat',
                       	      'StatusLookup'
                         ],
                       
    selfcare_directives: [
						      'LateValidateDirective',
						      'ScrollbarTopDirective',
						      'NgAutoFocusFunDirective',
						      'OnBlurDirective'
					     ]
  };
  
  require(_.reduce(_.keys(components), function(list, group) {
    return list.concat(_.map(components[group], function(name) { return group + "/" + name; }));
  }, ['routeProvider','initialTasks','webstorage-configuration']
  ));
});
