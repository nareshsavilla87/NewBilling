(function(module) {
  mifosX.filters = _.extend(module, {
	  EventTypeCategory: function () {
                    return function(history,val) {
                    		
                    	var jsonStringData = history;
                    	var jsonArray = JSON.parse(jsonStringData);
                      var  eventTypeCategoryMsg = {
                    	
                        //client related data
                        "CREATE CLIENT" : "Client Created Succesfully" ,
                        "UPDATE CLIENT" : "Client Updated",
                        
                        
                       //order related data 
                        "CREATE ORDER" : "Order Created successfully for "+jsonArray.paytermCode+" with plan Code "+jsonArray.planCode,
                        "DELETE ORDER" : "Order Deleted successfully",
                        "RECONNECT ORDER" : "Order Re-Connected successfully",
                        "REACTIVE ORDER" : "Order Re-Actived successfully",
                        "SUSPEND ORDER" : "Order Suspended with reason "+jsonArray.suspensionReason+" and Description "+jsonArray.suspensionDescription,
                        "RETRACKOSDMESSAGE ORDER" : "Order Re-Track OSD Message Added with commandName "+jsonArray.commandName,
                        "APPLYPROMO ORDER" : "Apply Promo Added for Order With Promo Id "+jsonArray.promoId,
                        "EXTENSION ORDER" : "Order Extended to "+jsonArray.extensionPeriod+" Due To "+jsonArray.extensionReason,
                        
                        //payments related Data
                        "CREATE PAYMENT" : "Payment Created successfully",
                        "CANCEL PAYMENT" : "Payment Canceled Succesfully with remarks "+jsonArray.cancelRemark,
                        
                        //itemsale related data
                        "CREATE ONETIMESALE" : "Item Sale Created Succesfully with Charge Code "+jsonArray.chargeCode+" ,UnitPrice "+jsonArray.unitPrice+"" +
                        						" ,Total Price "+jsonArray.totalPrice+" ,Quantity "+jsonArray.quantity+" and SaleType "+jsonArray.saleType,
                        "DEALLOCATE INVENTORY" : "Deallocated item",
                        
                        
                        
                        
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
                        "CREATE OWNEDHARDWARE" : "Owned Hardware Created",
                        "CREATE ALLOCATION" : "Allocation Added Succesfully",
                        "TERMINATE ORDER" : "Order Terminated",
                        
                        
                        
                        
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
