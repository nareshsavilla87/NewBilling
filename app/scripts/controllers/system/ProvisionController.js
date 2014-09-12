(function(module) {
  mifosX.controllers = _.extend(module, {
		  ProvisionController : function(scope, webStorage, route, routeParams, location, resourceFactory, PermissionService, dateFilter) {
			  
			scope.PermissionService = PermissionService;
			scope.provisionLogdatas = [];
			scope.formData = {};
			scope.formData.commandsource = 'start';
			scope.start ={};
			scope.start.date = new Date();
			scope.logFileDate =false;
			scope.ProcessingAdapter =false;

			/*scope.download = function() {
				resourceFactory.provisionResource.get({
					offset : offset,
					limit : limit,
					source : scope.formData.source,
					sqlSearch : scope.filterText,
					tabType : 'Invalid'
				}, callback);
			};
			*/
			scope.selectingCommandSource = function(commandSource){
				scope.ProcessingAdapter =false;
				if(commandSource == 'logfile'){
					scope.logFileDate =true;
				}else{
					scope.logFileDate =false;
				}
			};
			
			scope.downloadLogFile = function(value){
				//window.open(value);
				//var value = $rootScope.hostUrl+ API_VERSION +'/jobs/printlog/'+id+'?tenantIdentifier=default';
				 window.open(value);
			};

			scope.submit = function() {
				scope.provisionLogdatas = [];
				if(this.formData.commandsource != null){
					
					if(this.formData.commandsource == 'logfile'){
						this.formData.dateFormat = mifosX.models.AdapterLogFileDateFormat;
		            	var reqDate = dateFilter(scope.start.date,'yyyy-MM-dd');
		            	this.formData.startDate = reqDate;
		            	this.formData.logFileLocation = mifosX.models.AdapterLogFileCommand;
		            	this.formData.days = mifosX.models.AdapterLogFileIntervelDays;
		            	
		            	resourceFactory.provisionLogResource.save(this.formData, function(data) {
		            		scope.provisionLogdatas = data.provisionAdapterData;
		            	});
		            	
		            	
					}else{
						
						if(this.formData.commandsource == 'start'){
							this.formData.command = mifosX.models.AdapterStartCommand;
						}else if(this.formData.commandsource == 'stop'){
							this.formData.command = mifosX.models.AdapterStopCommand;
						}else if(this.formData.commandsource == 'status'){
							this.formData.command = mifosX.models.AdapterStatusCommand;
						}
						resourceFactory.provisionResource.save(this.formData, function(data) {
							scope.ProcessingAdapter = true;
							scope.adapterStatus = data.status;
							console.log(data);
								//	location.path('/message');
						});
						
					}
					
	            	
	            	
					
				}
            	
			};
		}
  });
  mifosX.ng.application.controller('ProvisionController', ['$scope','webStorage', '$route','$routeParams', '$location', 'ResourceFactory','PermissionService','dateFilter', mifosX.controllers.ProvisionController]).run(function($log) {
    $log.info("ProvisionController initialized");
  });
}(mifosX.controllers || {}));


