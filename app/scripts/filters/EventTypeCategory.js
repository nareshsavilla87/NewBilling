(function(module) {
  mifosX.filters = _.extend(module, {
	  EventTypeCategory: function () {
                    return function(history,val) {
                    		
                      var  eventTypeCategoryMsg = {
                    		  
                        "CREATE CLIENT" : "Client Created Succesfully" ,
                        "CREATE ONETIMESALE" : "Item Sale Added Succesfully",
                        "DEALLOCATE INVENTORY" : "Deallocated item",
                        "CREATE ORDER" : "Order Created successfully",
                        "DELETE ORDER" : "Order Deleted successfully",
                        "CREATE PAYMENT" : "Payment Created successfully",
                        "CREATE ADJUSTMENT" : "Adjustmented successfully",
                        "CREATE TICKET" : "Ticket Created Succesfully",
                        "CREATE CLIENTIDENTIFIER" : "Client Identifier Added Succesfully",
                        "CREATE CLIENTCARDDETAILS" : "Client Credit Card Details Added Succesfully",
                        "CREATE PARENTCLIENT" : "Parent Added to Client Succesfully",
                        "CREATE CLIENTNOTE" : "Client Notes Created successfully",
                        "CREATE Client_Contact_Info" : "Client Contact Information Added Succesfully",
                        "UPDATE Client_Contact_Info" : "Client Contact Information Updated Succesfully",
                        "DELETE Client_Contact_Info" : "Client Contact Information Deleted Succesfully",
                        "CLOSE TICKET" : "Ticket Closed Succesfully",
                        "SELFREGISTRATION ACTIVATE" : "Selfcare Registration Activated",
                        "CREATE SELFCARE" : "Selfcare Account Created Succesfully",
                        
                     };

                      
                      return eventTypeCategoryMsg[val];
                  };
                }
  });
  mifosX.ng.application.filter('EventTypeCategory', [mifosX.filters.EventTypeCategory]).run(function($log) {
    $log.info("EventTypeCategory filter initialized");
  });
}(mifosX.filters || {}));
