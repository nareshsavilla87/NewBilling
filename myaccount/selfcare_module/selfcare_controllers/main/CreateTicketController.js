(function(selfcare_module) {
   selfcare.controllers = _.extend(selfcare_module, {
	  CreateTicketController: function(scope,webStorage, RequestSender, location, translate,dateFilter,routeParams) {
            
			scope.priorityTypes = [];
			scope.formData={};						
			scope.problemsDatas = [];
			scope.usersDatas=[];
			scope.sourceData=[];
			 scope.start = {};
			 scope.start.date = new Date();
			 scope.minDate= scope.start.date;
			 
			 scope.first = {};
			 //scope.first.date = new Date();
		     //scope.first.time = "10:10";
		     
			 $('#timepicker1').timepicker({
		        	showInputs:false,
		        	showMeridian:false
		        });
			 
			 scope.clientId=routeParams.clientId;
		        
		        var selfcare_sessionData=webStorage.get('selfcare_sessionData');
		        if(selfcare_sessionData){
		        	scope.formData.assignedTo=selfcare_sessionData.userId;
		        }
		       
		     RequestSender.ticketResourceTemplate.get(function(data){ 
            	
              scope.date = data.ticketDate;
              scope.priorityTypes=data.priorityType;
              for(var i=0;i<scope.priorityTypes.length;i++){
            	  
              	if(scope.priorityTypes[i].value=='LOW'){
              		scope.formData.priority=scope.priorityTypes[i].value;
              	}
              }
              scope.problemsDatas=data.problemsDatas;
              scope.usersDatas=data.usersData;
              scope.sourceData=data.sourceData;
              for(var i=0;i<scope.sourceData.length;i++){
            	  
                	if(scope.sourceData[i].mCodeValue=='Phone'){
                		scope.formData.sourceOfTicket=scope.sourceData[i].mCodeValue;
                	}
                }
            });
            
            
            scope.reset123 = function(){
         	   webStorage.add("callingTab", {someString: "Tickets" });
         	   delete scope.first.time;
            };
           
			scope.submit = function() { 
				this.formData.locale = 'en';
				scope.first.time=$('#timepicker1').val();
				//console.log(scope.first.date);
				//console.log(scope.first.time);
				var reqDueDate = dateFilter(scope.first.date,'yyyy-MM-dd');
				//alert(scope.first.time);
				if(scope.first.date==null||scope.first.time==''){
					delete this.formData.dueTime;
				}else{
					this.formData.dueTime = reqDueDate+" "+$('#timepicker1').val()+':00';
				}
	        	
	        	
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData.ticketDate = reqDate;
				this.formData.dateFormat = 'dd MMMM yyyy';
				this.formData.ticketTime = ' '+new Date().toLocaleTimeString().replace("IST","").trim();
				RequestSender.ticketResource.save({'clientId': routeParams.clientId},this.formData,function(data){
                 location.path('/tickets');
               });
         };
    }
  });
  selfcare.ng.application.controller('CreateTicketController', ['$scope', 'webStorage','RequestSender', '$location', '$translate','dateFilter', '$routeParams', selfcare.controllers.CreateTicketController]);
}(selfcare.controllers || {}));

