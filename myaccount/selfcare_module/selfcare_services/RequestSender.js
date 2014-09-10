(function(selfcare_module) {
  selfcare.services = _.extend(selfcare_module, {
	  RequestSender: function() {
      var baseUrl = "" , apiVer = "/obsplatform/api/v1";
      this.setBaseUrl = function(url) {baseUrl = url;};
      this.$get = ['$resource','$rootScope', function(resource,$rootScope) {
        var defineResource = function(url, paramDefaults, actions) {
        	var tempUrl = baseUrl;
        	$rootScope.hostUrl = tempUrl;
          return resource(baseUrl + url, paramDefaults, actions);
        };
        return {
        	userResource: defineResource(apiVer + "/users/:userId", {userId : '@id'}, {}),
        	
        	registrationResource: defineResource(apiVer + "/selfcare/register", {}, {
        		update : {method: 'PUT', params: {}}
        	}),
        	configurationResource:defineResource(apiVer + "/configurations",{}, {}),
        	
        	addressTemplateResource: defineResource(apiVer + "/address/template/:city", {city:'@city'}, {}),
        	
        	allocateHardwareDetails: defineResource(apiVer + "/itemdetails/:oneTimeSaleId/:quantity", {oneTimeSaleId:'@saleId',quantity:'@quantity'},{}),
        	
        	authenticationClientResource: defineResource(apiVer + "/activationprocess/selfregistration", {}, {}),
        	
        	orderTemplateResource: defineResource(apiVer + "/prices", {}, {}),
        	
        	loginUser: defineResource(apiVer + "/selfcare/login", {username:'@username',password:'@password'}, {}),
        	
        	clients: defineResource(apiVer + "/clients/:clientId", {clientId:'@clientId'}, {}),
        	
        	forgotPwdResource: defineResource(apiVer + "/selfcare/forgotpassword", {}, {
        		update : {method : 'PUT',params : {}}
        	}),
        	ticketResourceTemplate: defineResource(apiVer + "/tickets/template",{},  {}),
        	
        	ticketResource: defineResource(apiVer + "/tickets/:clientId",{clientId:'@clientId'},  {}),
        	
        	changePwdResource: defineResource(apiVer + "/selfcare/changepassword",{},  {
        		update : {method: 'PUT', params: {}}
        	}),
        	vodEventsResource: defineResource(apiVer + "/assets",{},  {}),
        	
        	eventsResource: defineResource(apiVer + "/eventorder",{},  {}),
        	
        	bookOrderResource: defineResource(apiVer + "/orders/:clientId/:orderId",{clientId : '@clientId',orderId : '@orderId'},  {
        		update: { method: 'PUT' }
        	}),
        	
            getOrderResource: defineResource(apiVer + "/orders/:clientId/orders",{clientId : '@clientId'},  {}),
            
            paymentsResource: defineResource(apiVer + "/financialTransactions/:clientId", {clientId:'@clientId'}, {}),
            
            getSingleOrderResource: defineResource(apiVer + "/orders/:orderId/orderprice", {orderId:'@orderId'}, {
           	  update: { method: 'PUT' }
            }),
            
            OrderDisconnectResource: defineResource(apiVer + "/orders/disconnect", {}, {}),
            
            OrderreconnectResource: defineResource(apiVer + "/orders/reconnect/:orderId", {orderId:'@orderId'},{
               	update: { method: 'PUT' }
            }),
            
            changeOrderResource: defineResource(apiVer + "/orders/changePlan/:orderId", {orderId:'@orderId'}, {
                update: { method: 'PUT' }
             }),
             
            clientTemplateResource: defineResource(apiVer + "/clients/template", {}, {}),
            
            clientResource: defineResource(apiVer + "/clients/:clientId/:anotherresource", {clientId:'@clientId',anotherresource:'@anotherresource'}, {
                getAllClientDocuments: {method: 'GET', params: {}, isArray: true},
                update: { method: 'PUT'}
            }),
            
            orderRenewalResourceTemplate: defineResource(apiVer + "/orders/renewalorder/:orderId", {orderId:'@orderId'},{
            	update: { method: 'PUT' }
           }),
           
           orderRenewalResource: defineResource(apiVer + "/orders/renewal/:orderId", {orderId:'@orderId'},{
              	update: { method: 'PUT' }
            }),

        };
      }];
    }
  });
  selfcare.ng.services.config(function($provide) {
    $provide.provider('RequestSender', selfcare.services.RequestSender);
  });
}(selfcare.services || {}));
