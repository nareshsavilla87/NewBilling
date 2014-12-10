(function(selfcare_module) {
	selfcare.filters = _.extend(selfcare_module, {
        ConfigLookup: function ($http) {
        	
        	var nationalId =true;
        	
            return function(input) {    
            	
            	var  configNameLookup = {
            			
                   "nationalId":nationalId,
                 };
            	return configNameLookup[input];
            };
        }
    });
	selfcare.ng.application.filter('ConfigLookup', ['$http',selfcare.filters.ConfigLookup]).run(function($log) {
        $log.info("ConfigLookup filter initialized");
    });
}(selfcare.filters || {}));
