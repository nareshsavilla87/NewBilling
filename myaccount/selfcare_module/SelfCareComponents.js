define(['underscore', 'selfcare'], function() {
  var components = {
	  
    selfcare_models:      [
							  'LoggedInUser',
							  'roleMap',
							  'Langs',
						      'returnURL',
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
						      'main/ProfileController',
						      'main/StatementsController',
						      'main/TicketsController',
						      'main/CreateTicketController',
						      'main/ChangePasswordController',
						      'main/AdditionalOrdersController',
						      'main/AdditionalOrdersPreviewScreenController',
						      'main/EventDetailsPreviewScreenController',
						      'main/VODEventsController',
						      'main/ViewOrderController',
						      'main/ChangeOrderController',
						      'main/RenewalOrderController',
						      'main/RenewalOrderPreviewScreenController',
						      'main/ServicesController',
						      'main/KortaController',
						      'main/KortaSuccessController',
						      'main/KortaTokenPaymentController',
						      'main/KortaTokenPaymentSuccessController',
						      'main/ChangeKortaTokenPaymentController',
						      'main/UserSettingController',
						      'main/ViewStatementController',
						      'main/GlobalPaySuccessController',
						      'main/GlobalPayController',
						      'main/PaymentGatewayResponseController'
					      ],
					      
    selfcare_filters:    [
                       	      'DateFormat',
                       	      'StatusLookup',
                       	      'ConfigLookup'
                         ],
                       
    selfcare_directives: [
						      'LateValidateDirective',
						      'NgAutoFocusFunDirective',
						      'OnBlurDirective'
					     ]
  };
  
  require(_.reduce(_.keys(components), function(list, group) {
    return list.concat(_.map(components[group], function(name) { return group + "/" + name; }));
  }, ['routeProvider','initialTasks','webstorage-configuration']
  ));
});
