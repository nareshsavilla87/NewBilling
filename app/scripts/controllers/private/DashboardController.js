(function(module) {
    mifosX.controllers = _.extend(module, {
    	DashboardController: function(scope, resourceFactory,location,dateFilter) {
    		
            scope.dashModel = 'dashboard';
            
            scope.switch1 = function() {
	        	location.path('/home');
			};
            
			scope.switchDef = function() {
	        	location.path('/definations');
			};
				
			scope.calendarFun = function() {
				location.path('/calendar');
			};
           
            scope.formatdate = function(){
                var bardate = new Date();
                scope.formattedDate = [];
                for(var i=0; i<12;i++)
                {
                    var temp_date = bardate.getDate();
                    bardate.setDate(temp_date - 1);
                    var curr_date = bardate.getDate();
                    var curr_month = bardate.getMonth() +1;
                    scope.formattedDate[i] = curr_date + "/" + curr_month;
                    if(i == 11 ) scope.startDate = dateFilter(bardate,"yyyy-MM-dd");
                    if(i == 0) scope.endDate 	= dateFilter(bardate,"yyyy-MM-dd");
                    
                }
            };scope.formatdate();

            
            scope.getWeek = function() {
                scope.formattedWeek = [];
                var checkDate = new Date();
                checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
                var time = checkDate.getTime();
                checkDate.setMonth(0);
                checkDate.setDate(1);
                var week = Math.floor(Math.round((time - checkDate) / 86400000) / 7);
                for(var i=0;i<12;i++)
                {
                    if(week==0)
                    {
                        week = 52;
                    }
                    scope.formattedWeek[i] = week - i;

                }
            };scope.getWeek();

            scope.getMonth = function(){
                var today = new Date();
                var aMonth = today.getMonth();
                scope.formattedMonth= [];
                var month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
                for (var i=0; i<12; i++)
                {
                    scope.formattedMonth.push(month[aMonth]);
                    aMonth--;
                    if (aMonth < 0)
                    {
                        aMonth = 11;
                    }
                }
            }; scope.getMonth();
            
            scope.getBarData = function(format,firstData,secondData,firstKey,secondKey){
            	scope.BarData =[{"key": firstKey,"values":[]},{"key": secondKey,"values":[]}];
	    		for(var i=format.length-1;i>=0;i--){
	    			scope.BarData[0].values.push([format[i],firstData[i]]);
	    			scope.BarData[1].values.push([format[i],secondData[i]]);
	    		};
            };
            
            scope.getFcount = function (dateData,retrievedDateData,responseData,category) {
                for(var i in dateData ){
                	scope.fcount[i] = 0;
                    for(var j in retrievedDateData){
                        if(dateData[i]==retrievedDateData[j])
                            scope.fcount[i]=responseData[j][category];
                    }
                }
            };
            scope.getLcount = function (dateData,retrievedDateData,responseData,category) {
                for(var i in dateData ){
                	scope.lcount[i] = 0;
                    for(var j in retrievedDateData){
                        if(dateData[i]==retrievedDateData[j])
                            scope.lcount[i]=responseData[j][category];
                    }
                }
            };
            
            scope.offices = [];
            resourceFactory.groupTemplateResource.get(function(data) {
            	scope.offices  = data.officeOptions;
            	scope.officeId = data.officeId;
            	scope.clientTrendsTabFun();
            });

            scope.formData = {};
            
//tab1 active
       scope.clientTrendsTabFun = function(){
    	   
    	   scope.ClientTrendsTab="active";
    	   scope.CollectionAmountTab="";
    	   scope.StockItemDetailsTab="";
      	   scope.TicketsStatisticsTab="";
      	   
      	   scope.formData.CTOfficeId = scope.officeId || 1;
      	 
      	 scope.clientTrendsByDayFun = function(){
      		scope.chartType = 'Days';
      		for(var i in scope.offices){
                if(scope.offices[i].id == scope.formData.CTOfficeId){
                	scope.officeName = scope.offices[i].name;
                }
            }
           resourceFactory.runReportsResource.get({reportSource: 'ClientTrendsByDay',R_officeId:scope.formData.CTOfficeId, genericResultSet:false} , function(data) {
                scope.days = [];
                scope.tempDate = [];
                scope.fcount = [];
                for(var i in data)
                {
                    scope.days[i] = data[i].days;
                }
                for(var i in scope.days)
                {
             	   if (scope.days[i] && scope.days[i].length > 2) {
                        var tday = scope.days[i][2];
                        var tmonth = scope.days[i][1];
                        var tyear = scope.days[i][0];
                        scope.tempDate[i] = tday + "/" + tmonth;
                    }
                }
                scope.getFcount(scope.formattedDate,scope.tempDate,data,"count");
                
                resourceFactory.runReportsResource.get({reportSource: 'OrderTrendsByDay',R_officeId:scope.formData.CTOfficeId, genericResultSet:false} , function(data) {
                    scope.ldays = [];
                    scope.ltempDate = [];
                    scope.lcount = [];
                    for(var i in data)
                    {
                        scope.ldays[i] = data[i].days;
                    }
                    for(var i in scope.ldays)
                    {
                 	   if (scope.ldays[i] && scope.ldays[i].length > 2) {
                            var tday = scope.ldays[i][2];
                            var tmonth = scope.ldays[i][1];
                            var tyear = scope.ldays[i][0];
                            scope.ltempDate[i] = tday + "/" + tmonth;
                        }
                    }
                    scope.getLcount(scope.formattedDate,scope.ltempDate,data,"lcount");
                    scope.getBarData(scope.formattedDate,scope.fcount,scope.lcount,"New Client Joining","New Orders Created");
                });
           });
      	 };scope.clientTrendsByDayFun();
      	 
      	scope.clientTrendsByWeekFun = function(){
      		
        	scope.chartType = 'Weeks';
        	for(var i in scope.offices){
      			if(scope.offices[i].id == scope.formData.CTOfficeId){
      				scope.officeName = scope.offices[i].name;
      			}
      		}
            resourceFactory.runReportsResource.get({reportSource: "ClientTrendsByWeek",R_officeId:scope.formData.CTOfficeId, genericResultSet:false} , function(data) {
                scope.weeks = [];
                scope.fcount = [];

                for(var i in data) scope.weeks[i] = data[i].Weeks;

                scope.getFcount(scope.formattedWeek,scope.weeks,data,"count");
                
                resourceFactory.runReportsResource.get({reportSource: "OrderTrendsByWeek",R_officeId:scope.formData.CTOfficeId, genericResultSet:false} , function(data) {
                    scope.lweeks = [];
                    scope.lcount = [];
                    for(var i in data) scope.lweeks[i] = data[i].Weeks;
                    
                    scope.getLcount(scope.formattedWeek,scope.lweeks,data,"lcount");
                    scope.getBarData(scope.formattedWeek,scope.fcount,scope.lcount,"New Client Joining","New Orders Created");
                });
            });
      	};
      	
      	scope.clientTrendsByMonthFun = function(){
      		
        	scope.chartType = 'Months';
        	for(var i in scope.offices){
      			if(scope.offices[i].id == scope.formData.CTOfficeId){
      				scope.officeName = scope.offices[i].name;
      			}
      		}
            scope.formattedSMonth = [];
            var monthArray = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
            var today = new Date();
            var aMonth = today.getMonth();
            for (var i=0; i<12; i++)
            {
                scope.formattedSMonth.push(monthArray[aMonth]);
                aMonth--;
                if (aMonth < 0)
                {
                    aMonth = 11;
                }
            }
            resourceFactory.runReportsResource.get({reportSource: "ClientTrendsByMonth",R_officeId:scope.formData.CTOfficeId, genericResultSet:false} , function(data) {
                scope.months = [];
                scope.fcount = [];

                for(var i in data) scope.months[i] = data[i].Months;
                scope.getFcount(scope.formattedMonth,scope.months,data,"count");
                
                resourceFactory.runReportsResource.get({reportSource: "OrderTrendsByMonth",R_officeId:scope.formData.CTOfficeId, genericResultSet:false} , function(data) {
                    scope.lmonths = [];
                    scope.lcount = [];

                    for(var i in data) scope.lmonths[i] = data[i].Months;
                    
                    scope.getLcount(scope.formattedMonth,scope.lmonths,data,"lcount");
                    scope.getBarData(scope.formattedSMonth,scope.fcount,scope.lcount,"New Client Joining","New Orders Created");
                });
            });
      	};
         
       };

 //tab2 active
	   scope.collectionAmountTabFun = function(){
			 
			scope.ClientTrendsTab="";
			scope.CollectionAmountTab="active";
			scope.StockItemDetailsTab="";
			scope.TicketsStatisticsTab="";
			
			scope.formData.CAOfficeId = scope.officeId || 1;
			
			scope.collectionAmountByDayFun = function(){
	      		scope.chartType = 'Days';
	      		for(var i in scope.offices){
	                if(scope.offices[i].id == scope.formData.CAOfficeId){
	                	scope.officeName = scope.offices[i].name;
	                }
	            }
	           resourceFactory.runReportsResource.get({reportSource: 'Collection Day Wise chart',R_endDate : scope.endDate,R_startDate:scope.startDate,R_paymode_id:-1,R_officeId:scope.formData.CAOfficeId, genericResultSet:false} , function(data) {
	                scope.days = [];
	                scope.tempDate = [];
	                scope.fcount = [];
	                for(var i in data)
	                {
	                    scope.days[i] = data[i].Date;
	                }
	                for(var i in scope.days)
	                {
	                	if(scope.days[i]){
		                	var date = scope.days[i].split("-");
		                	scope.tempDate[i] = date[2] + "/" + parseInt(date[1]);
	                	}
	                }
	                scope.getFcount(scope.formattedDate,scope.tempDate,data,"Amount_Collection");
	                
	                resourceFactory.runReportsResource.get({reportSource: 'Invoice Day Wise chart',R_endDate : scope.endDate,R_startDate:scope.startDate,R_officeId:scope.formData.CAOfficeId, genericResultSet:false} , function(data) {
	                    scope.ldays = [];
	                    scope.ltempDate = [];
	                    scope.lcount = [];
	                    for(var i in data)
	                    {
	                        scope.ldays[i] = data[i].Invoice_date;
	                    }
	                    for(var i in scope.ldays)
	                    {
	                 	   if (scope.ldays[i]) {
	                 		  var date = scope.ldays[i].split("-");
	                           scope.ltempDate[i] = date[2] + "/" + parseInt(date[1]);
	                        }
	                    }
	                    scope.getLcount(scope.formattedDate,scope.ltempDate,data,"invoice_Amount");
	                    scope.getBarData(scope.formattedDate,scope.fcount,scope.lcount,"Collections","Invoices");
	                });
	           });
	   		};scope.collectionAmountByDayFun();
	   		
	   	  scope.collectionAmountByMonthFun = function() {
				
				scope.chartType = 'Months';
				for(var i in scope.offices){
			        if(scope.offices[i].id == scope.formData.CAOfficeId){
			            scope.officeName = scope.offices[i].name;
			        }
			    }
				scope.formattedSMonth = [];
				var monthArray = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
				var today = new Date();
				var aMonth = today.getMonth();
				for (var i=0; i<12; i++)
				{
				    scope.formattedSMonth.push(monthArray[aMonth]);
				    aMonth--;
				    if (aMonth < 0)
				    {
				        aMonth = 11;
				    }
				}
				resourceFactory.runReportsResource.get({reportSource: 'Collection Month Wise chart',R_officeId:scope.formData.CAOfficeId, genericResultSet:false} , function(data) {
				    scope.months = [];
				    scope.fcount = [];
				
				    for(var i in data) scope.months[i] = data[i].Month;
				    
				    scope.getFcount(scope.formattedMonth,scope.months,data,"Amount_Collection");
				    
				    resourceFactory.runReportsResource.get({reportSource: 'Invoice Month Wise chart ',R_officeId:scope.formData.CAOfficeId, genericResultSet:false} , function(data) {
				        scope.lmonths = [];
				        scope.lcount = [];
				
				        for(var i in data) scope.lmonths[i] = data[i].Month;
				        
				        scope.getLcount(scope.formattedMonth,scope.lmonths,data,"invoice_Amount");
				        scope.getBarData(scope.formattedSMonth,scope.fcount,scope.lcount,"Collections","Invoices");
				    });
				});
			 };
	      	 
	   };
            
  //tab3 active
	   scope.ticketsStatisticsTabFun = function(){
	   
		  	 scope.ClientTrendsTab="";
		  	 scope.CollectionAmountTab="";
		  	 scope.StockItemDetailsTab="";
		  	 scope.TicketsStatisticsTab="active";
		  	 
		    function getFcount1(retrievedDateData,responseData) {
		            for(var j in retrievedDateData){
		            	scope.fcount[j] = 0;
		            	scope.fcount[j]=responseData[j].tkt_cnt;
		            }
		    };
		    function getLcount1(retrievedDateData,responseData) {
		            for(var j in retrievedDateData){
		            	scope.lcount[j] = 0;
		            	scope.lcount[j]=responseData[j].tkt_cnt;
		            }
		    };
		    
		    scope.formData.tktOfficeId = scope.officeId || 1;	
		    scope.ticketsbyDaysFun = function(){
		    	
		    	scope.chartType = 'Days';
	      		for(var i in scope.offices){
	                if(scope.offices[i].id == scope.formData.tktOfficeId){
	                	scope.officeName = scope.offices[i].name;
	                }
	            }
			    resourceFactory.runReportsResource.get({reportSource: 'TicketsbyDays',R_officeId:scope.formData.tktOfficeId, genericResultSet:false} , function(data) {
			    	scope.tickets = [];
			        scope.tickets = data;
			        scope.days = [];
			        scope.tempDate = [];
			        scope.fcount = [];
			        for(var i in scope.tickets){
			            scope.days[i] = scope.tickets[i].days;
			        }
			        for(var i in scope.days){
			        	if(scope.days[i] && scope.days[i].length > 2){
			        		var tday = scope.days[i][2];
			        		var tmonth = scope.days[i][1];
			        		scope.tempDate[i] = tday + "/" + tmonth;
			        	}
			        }
			        getFcount1(scope.tempDate,scope.tickets);
			        
			        resourceFactory.runReportsResource.get({reportSource: 'TicketsbyDays',R_officeId:scope.formData.tktOfficeId, genericResultSet:false} , function(data) {
			            scope.ldays = [];
			            scope.ltempDate = [];
			            scope.lcount = [];
			            for(var i in data){
			                scope.ldays[i] = data[i].days;
			            }
			            for(var i in scope.ldays){
			            	
			            	if(scope.ldays[i] && scope.ldays[i].length > 2){
			                var tday = scope.ldays[i][2];
			                var tmonth = scope.ldays[i][1];
			                scope.ltempDate[i] = tday + "/" + tmonth;
			            	}
			            }
			            getLcount1(scope.ltempDate,data);
			            scope.getBarData(scope.ltempDate,scope.fcount,scope.lcount,"All Tickets","Tickets Open");
			        });
			    });
		    };scope.ticketsbyDaysFun();
		    

	   scope.getTicketsWeeklyData = function(){
	
			scope.chartType = 'Weeks';
			resourceFactory.runReportsResource.get({reportSource: 'TicketsByWeek',R_officeId:scope.formData.tktOfficeId, genericResultSet:false} , function(data) {
			    scope.weeks = [];
			    scope.fcount = [];
			
			    for(var i in scope.offices){
			        if(scope.offices[i].id == scope.formData.tktOfficeId){
			            scope.officeName = scope.offices[i].name;
			        }
			    }
			    for(var i in data) scope.weeks[i] = data[i].Weeks;
			
			    scope.getFcount(scope.formattedWeek,scope.weeks,data,"tkt_cnt");
			    
			    resourceFactory.runReportsResource.get({reportSource: 'TicketsByWeek',R_officeId:scope.formData.tktOfficeId, genericResultSet:false} , function(data) {
			        scope.lweeks = [];
			        scope.lcount = [];
			        for(var i in data)
			        {
			            scope.lweeks[i] = data[i].Weeks;
			        }
			        scope.getLcount(scope.formattedWeek,scope.lweeks,data,"tkt_cnt");
			        scope.getBarData(scope.formattedWeek,scope.fcount,scope.lcount,"All Tickets","Tickets Open");
			    });
			});
		 };

		scope.getTicketsMonthlyData = function() {
			
			scope.chartType = 'Months';
			for(var i in scope.offices){
		        if(scope.offices[i].id == scope.formData.tktOfficeId){
		            scope.officeName = scope.offices[i].name;
		        }
		    }
			scope.formattedSMonth = [];
			var monthArray = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
			var today = new Date();
			var aMonth = today.getMonth();
			for (var i=0; i<12; i++)
			{
			    scope.formattedSMonth.push(monthArray[aMonth]);
			    aMonth--;
			    if (aMonth < 0)
			    {
			        aMonth = 11;
			    }
			}
			resourceFactory.runReportsResource.get({reportSource: 'TicketsByMonth',R_officeId:scope.formData.tktOfficeId, genericResultSet:false} , function(data) {
			    scope.months = [];
			    scope.fcount = [];
			
			    for(var i in data)
			    {
			        scope.months[i] = data[i].Months;
			    }
			    scope.getFcount(scope.formattedMonth,scope.months,data,"tkt_cnt");
			    
			    resourceFactory.runReportsResource.get({reportSource: 'TicketsByMonth',R_officeId:scope.formData.tktOfficeId, genericResultSet:false} , function(data) {
			        scope.lmonths = [];
			        scope.lcount = [];
			
			        for(var i in data) scope.lmonths[i] = data[i].Months;
			        
			        scope.getLcount(scope.formattedMonth,scope.lmonths,data,"tkt_cnt");
			        scope.getBarData(scope.formattedSMonth,scope.fcount,scope.lcount,"All Tickets","Tickets Open");
			    });
			});
		 };

	   };
	   
	//tab4 active 
	scope.stockItemDetailsTabFun = function(){
			 
			scope.ClientTrendsTab="";
			scope.CollectionAmountTab="";
			scope.StockItemDetailsTab="active";
			scope.TicketsStatisticsTab="";
			
	      scope.getStockItemDetailsFun = function(){
			
			for(var i in scope.offices){
            	if(scope.offices[i].id== scope.formData.STOfficeId){
            		scope.officeName = scope.offices[i].name;
            	}
            }
		
				scope.formData.STOfficeId = scope.officeId || 1;
			resourceFactory.runReportsResource.get({reportSource: 'Stock_Item_Details',R_officeId:scope.formData.STOfficeId, genericResultSet:false} , function(data){	
		 		scope.showDisbursementerror = false;
		        
        		if(data && data.length == 0){
        			scope.showDisbursementerror = true;
        		}
        		data = angular.fromJson(angular.toJson(data))
	    		scope.disbursedData = [];
        		for(var obj in data){
            	    for(var key in data[obj]){
            	            scope.disbursedData.push({key:key,y:data[obj][key]});
            	    }
            	}

			});
	     };scope.getStockItemDetailsFun();
        
	   };
	 

            scope.xFunction = function(){
                return function(d) {
                    return d.key;
                };
            };
            scope.yFunction = function(){
                return function(d) {
                    return d.y;
                };
            };
            var colorArray = ['#0f82f5', '#008000', '#808080', '#000000', '#FFE6E6'];
            var colorArrayPie =['#008000','#ff4500','#0f82f5'];
            scope.colorFunction = function() {
                return function(d, i) {
                    return colorArray[i];
                };
            };
            scope.colorFunctionPie = function() {
                return function(d, i) {
                    return colorArrayPie[i];
                };
            };
            
        }
    });
    mifosX.ng.application.controller('DashboardController', ['$scope', 'ResourceFactory','$location','dateFilter', mifosX.controllers.DashboardController]).run(function($log) {
        $log.info("DashboardController initialized");
    });
}(mifosX.controllers || {}));


/* status wise orders 
scope.id = this.officeIdCum || 1;
   resourceFactory.runReportsResource.get({reportSource: 'CumulativeCustomersChart',R_officeId:scope.id, genericResultSet:false} , function(data) {
   	
   	scope.showCumCustomerDataerror = false;
   	var count = 0;
   	scope.cumCustomersPieData = data;
		for(var i in data){
   		if(data[i].clients==0){
   			count+=1;
   		}
   		
   	}
   	if(count==data.length)
		scope.showCumCustomerDataerror = true;
		scope.cumCustomerData = [];
		for(var i in data)	{
							scope.cumCustomerData.push({key:data[i].status,y:data[i].clients});
							console.log(scope.cumCustomerData);
					  		}
		});
   	scope.cumCustomersPieData = data;
   	if(data[0].clients == 0 && data[1].clients == 0 && data[2].clients == 0){
           scope.showCumCustomerDataerror = true;
       }
   	scope.cumCustomerData = [
   	                       {key:"Active", y:scope.cumCustomersPieData[0].clients},
   	                       {key:"Disconnected", y:scope.cumCustomersPieData[1].clients},
   	                       {key:"Pending", y:scope.cumCustomersPieData[2].clients}
   	                   ];
   });
   
   scope.getCumOffice = function () 
            {   var id = this.officeId || 1;
                for(var i in scope.offices)	{ if(scope.offices[i].id== id){scope.dOfficeName = scope.offices[i].name;} }
                scope.id = this.officeId || 1;
                var count = 0;
                scope.showCumCustomerDataerror = false;
                resourceFactory.runReportsResource.get({reportSource: 'CumulativeCustomersChart',R_officeId:scope.id, genericResultSet:false} , function(data) 
            		{
            		scope.cumCustomersPieData = data;
            		for(var i in data){
                		if(data[i].clients==0){
                			count+=1;
                		}
                		
                	}
                	if(count==data.length)
            		scope.showCumCustomerDataerror = true;
            		scope.cumCustomerData = [];
            		for(var i in data)	{console.log(data[i].status);
            							scope.cumCustomerData.push({key:data[i].status,y:data[i].clients});
            							console.log(scope.cumCustomerData);
            					  		}
            		});
            };
   */

	