(function(module) {
  mifosX.filters = _.extend(module, {
	  EventTypeCategory: function () {
                    return function(history,val,resourceId) {
                    		
                    	var historyData = history;
                    	var jsonStringData = historyData.replace("{","");
                    	jsonStringData = jsonStringData.replace("}","");
                    	jsonStringData = jsonStringData.replace(/"/g,"");
                    	var jsonArray = JSON.parse(historyData);
                    	var  eventTypeCategoryMsg = {
                    	
                        //client related data
                        "CREATE CLIENT" : "Client Created Succesfully with Name:"+jsonArray.firstname+jsonArray.lastname,
                        "UPDATE CLIENT" : "{"+jsonStringData+"}",
                        "UPDATE ADDRESS" : "Client Address Updated Succesfully with "+jsonStringData,
                        "DELETE CLIENT" : "Client Closed Succesfully with reason id "+jsonArray.closureReasonId,
                        
                        
                       //order related data 
                        "CREATE ORDER" : "PlanCode :"+jsonArray.planCode+" Contract Period :"+jsonArray.contractPeriod,
                        "CHANGEPLAN ORDER" : "PlanCode :"+jsonArray.planCode+" Contract Period :"+jsonArray.contractPeriod,
                        "DELETE ORDER" : "Order Deleted successfully",
                        "EXTENSION ORDER" : "Order Extended to "+jsonArray.extensionPeriod+" Due To "+jsonArray.extensionReason,
                        "RECONNECT ORDER" : "Order Re-Connected successfully with OrderId:"+resourceId,
                        "REACTIVE ORDER" : "Order Re-Actived successfully with OrderId:"+resourceId,
                        "SUSPEND ORDER" : "Order Suspended with reason "+jsonArray.suspensionReason+" and Description "+jsonArray.suspensionDescription,
                        "RETRACKOSDMESSAGE ORDER" : "Order Re-Track OSD Message Added with commandName "+jsonArray.commandName,
                        "APPLYPROMO ORDER" : "Apply Promo Added for Order With Promo Id "+jsonArray.promoId,
                        "TERMINATE ORDER" : "Order Terminated successfully with OrderId:"+resourceId,
                        
                        //payments related Data
                        "CREATE PAYMENT" : "Payment Created successfully successfully with paymentId:"+resourceId,
                        "CANCEL PAYMENT" : "Payment Canceled Succesfully with remarks "+jsonArray.cancelRemark,
                        
                        //itemsale related data
                        "CREATE ONETIMESALE" : "Item Sale Created Succesfully with Charge Code "+jsonArray.chargeCode+" ,UnitPrice "+jsonArray.unitPrice+"" +
                        						" ,Total Price "+jsonArray.totalPrice+" ,Quantity "+jsonArray.quantity+" and SaleType "+jsonArray.saleType,
                        "DEALLOCATE INVENTORY" : "Deallocated item",
                        "DELETE ONETIMESALE"   : "Item sale deleted Succesfully",
                        
                        
                        //more info related data
                        "CREATE PARENTCLIENT" : "Parent Added to Client Succesfully",
                        "CREATE CLIENTCARDDETAILS" : "Client Credit Card Details Added Succesfully",
                        
                        //notes related data
                        "CREATE CLIENTNOTE" : "Client Notes Created successfully",
                        
                        
                        //statement related data
                        "DELETE BILLMASTER" : "Bill Statement Deleted successfully",
                        
                        //client identifier related data
                        "CREATE CLIENTIDENTIFIER" : "Client Identifier Added Succesfully",
                        "DELETE CLIENTIDENTIFIER" : "Client Identifier Deleted Succesfully",
                        
                        
                        //ticket related data
                        "CREATE TICKET" : "Ticket Created Succesfully",
                        "CLOSE TICKET" : "Ticket Closed Succesfully",
                        
                        //client contact information related data
                        "CREATE Client_Contact_Info" : "Client Contact Information Added Succesfully",
                        "UPDATE Client_Contact_Info" : "Client Contact Information Updated Succesfully",
                        "DELETE Client_Contact_Info" : "Client Contact Information Deleted Succesfully",
                        
                        
                        //credit distribution related data
                        "CREATE CREDITDISTRIBUTION" : "Credit Distribution ",
                        
                        
                        //adjustment related data
                        "CREATE ADJUSTMENT" : "AmountPaid:"+jsonArray.amount_paid+" AdjustmentType:"+jsonArray.adjustment_type+" AdjustmentCode:"+jsonArray.adjustment_code+" Remarks:"+jsonArray.Remarks,
                        
                        
                        "CREATE OWNEDHARDWARE" : "Owned Hardware Created",
                        "CREATE ALLOCATION" : "Allocation Added Succesfully",
                        
                        
                        
                       //self care related data 
                        "SELFREGISTRATION ACTIVATE" : "Selfcare Registration Activated",
                        "CREATE SELFCARE" : "Selfcare Account Created Succesfully with UserName:"+jsonArray.userName,
                        
                     };

                      
                      return eventTypeCategoryMsg[val];
                  };
                }
  });
  mifosX.ng.application.filter('EventTypeCategory', [mifosX.filters.EventTypeCategory]).run(function($log) {
    $log.info("EventTypeCategory filter initialized");
  });
}(mifosX.filters || {}));
