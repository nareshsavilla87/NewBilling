(function(module) {
	  mifosX.controllers = _.extend(module, {
	    CreateSmtpController: function(scope, resourceFactory, location, dateFilter, routeParams) {
	        
	    	scope.formData={};
	    	scope.formData.userName="smtp";
	    	
	    	scope.id = routeParams.id;
	    	
	    	/*var a = btoa('ashok');  
	    	var b = atob(a);
	    	alert(b);*/
	    	
	    	/*{"name":"smtp","value":"{\"mailId\":\"ashokreddy556@gmail.com\"," +  {"value":"Single Plan"}
	    			"\"password\":\"OTk4OTcyMDcxNQ\u003d\u003d\",\"hostName\":\"smtp.gmail.com\"," +
	    			"\"port\":\"25\",\"starttls\":\"true\"}","enabled":true,"id":25}*/
	    	
	    	if(scope.id>0){
	    		
	    		resourceFactory.configurationResource.get({configId: scope.id}, function (data) { 
	    			var	val = JSON.parse(data.value);
					scope.formData.mailId = val['mailId'];
					scope.formData.hostName = val['hostName'];
					scope.formData.port = val['port'];
					scope.formData.starttls = val['starttls'];
	                 
					var password = val['password'];
					scope.formData.password = atob(password);
	            });
	    	}
	    	
	        scope.submit = function() {  
	        	
	        	if(scope.id>0){
	        		var password = btoa(scope.formData.password);
		        	
		        	scope.smtpData = {
							"value" : '{"mailId" : "' + scope.formData.mailId
									+ '","hostName" : "' + scope.formData.hostName
									+ '","port" : "' + scope.formData.port
									+ '","starttls" : "' + scope.formData.starttls
									+ '","password" : "' + password
									+ '"}'	
					};
		        	
		        	resourceFactory.configurationResource.update({configId: scope.id},scope.smtpData,function(data){ 
		        		location.path('/global'); 
		        	});
	        	}else {
	        		resourceFactory.configurationSMTPResource.save(this.formData,function(data){ location.path('/global'); });
				}
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateSmtpController', ['$scope', 'ResourceFactory', '$location', 'dateFilter', '$routeParams', mifosX.controllers.CreateSmtpController]).run(function($log) {
	    $log.info("CreateSmtpController initialized");
	  });
	}(mifosX.controllers || {}));

