(function(module) {
  mifosX.controllers = _.extend(module, {
		  ProvisionController : function(scope,routeParams, location, resourceFactory,dateFilter,API_VERSION,$rootScope) {
			  
			scope.provisionLogdatas = [];
			scope.formData = {};
            scope.logformData = {};
			scope.start ={};
			scope.start.date = new Date();
			scope.logFileDate =false;
			scope.ProcessingAdapter =false;
			scope.provisionLogdatas = [];
			
			scope.formData.command = mifosX.models.AdapterStatusCommand;
			var AdapterStatusStopedResponse =mifosX.models.AdapterStatusStopedResponse;
			var AdapterStatusStartingResponse = mifosX.models.AdapterStatusStartingResponse;
			
			var AdapterStopedResponse =mifosX.models.AdapterStopedResponse;
			var AdapterStartingResponse = mifosX.models.AdapterStartingResponse;
			
			scope.AdapterProvSystem = mifosX.models.AdapterProvSystem;
			scope.AdapterFileName = mifosX.models.AdapterFileName;
			
			resourceFactory.provisionResource.save(scope.formData, function(data) {
				scope.ProcessingAdapter = true;
				
				if(data.status.contains(AdapterStatusStopedResponse)){
					scope.adapterStatus = "Stopped";
				}
				if(data.status.contains(AdapterStatusStartingResponse)){
					scope.adapterStatus = "Running";
				}
			});
			scope.logformData.dateFormat = mifosX.models.AdapterLogFileDateFormat;
        	var reqDate = dateFilter(scope.start.date,scope.logformData.dateFormat);
        	scope.logformData.startDate = reqDate;
        	scope.logformData.logFileLocation = mifosX.models.AdapterLogFileCommand;
        	scope.logformData.days = mifosX.models.AdapterLogFileIntervelDays;
			
			resourceFactory.provisionLogResource.save(scope.logformData, function(data) {
        		scope.provisionLogdatas = data.provisionAdapterData;
        	});
			
			
			scope.downloadLogFile = function(value){
				var url = $rootScope.hostUrl+ API_VERSION +'/adapter/printlog?tenantIdentifier=default&filePath='+value;
				 window.open(url);
			};
			
			scope.RunCommand =  function(value){
				scope.formData = {};
				if(value == 'start'){
					scope.formData.command = mifosX.models.AdapterStartCommand;
				}else if(value == 'stop'){
					scope.formData.command = mifosX.models.AdapterStopCommand;
				}else{
					scope.formData.command = mifosX.models.AdapterStatusCommand;
				}
				
				resourceFactory.provisionResource.save(scope.formData, function(data) {		
					scope.ProcessingAdapter = true;
					if(data.status.contains(AdapterStopedResponse)){
						scope.adapterStatus = "Stopped";
					}
					if(data.status.contains(AdapterStartingResponse)){
						scope.adapterStatus = "Running";
					}
				});
			};
		}
  });
  mifosX.ng.application.controller('ProvisionController', ['$scope', '$routeParams', '$location', 'ResourceFactory','dateFilter','API_VERSION','$rootScope', mifosX.controllers.ProvisionController]).run(function($log) {
    $log.info("ProvisionController initialized");
  });
}(mifosX.controllers || {}));

