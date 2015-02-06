(function(module) {
    mifosX.filters = _.extend(module, {
        CodeValidate: function (webStorage) {
            return function(input) {
            	var value = null;
            	
            	if(input == 'code'){
            		value = webStorage.get("client_configuration").codeDefinitionLength;
            	}else if(input == 'number'){
            		value = "/^[0-9.]+$/";
            	}
                return value;
            }
        }
    });
    mifosX.ng.application.filter('CodeValidate', ['webStorage',mifosX.filters.CodeValidate]).run(function($log) {
        $log.info("CodeValidate filter initialized");
    });
}(mifosX.filters || {}));
