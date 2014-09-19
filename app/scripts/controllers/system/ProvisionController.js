(function(module) {
  mifosX.controllers = _.extend(module, {
		  ProvisionController : function(scope,routeParams, location, resourceFactory,dateFilter,API_VERSION,$rootScope) {
			  
			scope.provisionLogdatas = [];
			scope.formData = {};
			scope.formData.commandsource = 'start';
			scope.start ={};
			scope.start.date = new Date();
			scope.logFileDate =false;
			scope.ProcessingAdapter =false;

			scope.selectingCommandSource = function(commandSource){
				scope.ProcessingAdapter =false;
				scope.provisionLogdatas = [];
				if(commandSource == 'logfile'){
					scope.logFileDate =true;
				}else{
					scope.logFileDate =false;
				}
			};
			
			scope.downloadLogFile = function(value){
				var url = $rootScope.hostUrl+ API_VERSION +'/adapter/printlog?tenantIdentifier=default&filePath='+value;
				 window.open(url);
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
						});
						
					}
				}
            	
			};
		}
  });
  mifosX.ng.application.controller('ProvisionController', ['$scope', '$routeParams', '$location', 'ResourceFactory','dateFilter','API_VERSION','$rootScope', mifosX.controllers.ProvisionController]).run(function($log) {
    $log.info("ProvisionController initialized");
  });
}(mifosX.controllers || {}));


