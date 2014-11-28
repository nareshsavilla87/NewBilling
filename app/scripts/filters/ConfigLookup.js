(function(module) {
    mifosX.filters = _.extend(module, {
        ConfigLookup: function ($http) {
        	
        	var paymentValue = "true";
        	var ipTvValue = "false";
        	var isClientIndividualValue = "false";
        	var deviceAgrementTypeValue = "SALE";
        	
            return function(input) {    
            	
            	var  configNameLookup = {
            			
                   //For Enabling payment details in Simple Activation
                   "payment":paymentValue,
                  
                   //For enabling Category Details in Service Mapping For IPTV
                   "IPTV":ipTvValue,
                  
                   //Represent the Default Client Type IND or Corporate in Create Client 
                   "IsClientIndividual":isClientIndividualValue,
                   
                   "deviceAgrementType":deviceAgrementTypeValue
                	 
                 };
            	if(input == 'jsonData'){
            		return [{"name":"payment","value":paymentValue},
            		        {"name":"IPTV","value":ipTvValue},
            		        {"name":"IsClientIndividual","value":isClientIndividualValue},
            		        {"name":"deviceAgrementType","value":deviceAgrementTypeValue}
            		       ];
            	}else{
            		return configNameLookup[input];
            	}
            };
        }
    });
    mifosX.ng.application.filter('ConfigLookup', ['$http',mifosX.filters.ConfigLookup]).run(function($log) {
        $log.info("ConfigLookup filter initialized");
    });
}(mifosX.filters || {}));
