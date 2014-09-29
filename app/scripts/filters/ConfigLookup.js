(function(module) {
    mifosX.filters = _.extend(module, {
        ConfigLookup: function ($http) {
        	
        	
            return function(input) {    
            	
            	var  configNameLookup = {
                   //For Enabling payment details in Simple Activation
                   "payment":"true",
                  
                   //For enabling Category Details in Service Mapping For IPTV
                   "IPTV":"false",
                  
                   //Represent the Default Client Type IND or Corporate in Create Client 
                   "IsClientIndividual":"false"
                	 
                 };
                  return configNameLookup[input];};
        }
    });
    mifosX.ng.application.filter('ConfigLookup', ['$http',mifosX.filters.ConfigLookup]).run(function($log) {
        $log.info("ConfigLookup filter initialized");
    });
}(mifosX.filters || {}));
