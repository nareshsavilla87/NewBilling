(function(module) {
    mifosX.filters = _.extend(module, {
        DateFormat: function (dateFilter,localStorageService) {
            return function(input) {
                if(input){
                	var inputValue=input.toString();
                	var splitValue=inputValue.split(",");
                    var tDate = new Date(splitValue[0],splitValue[1]-1,splitValue[2]);
                    return dateFilter(tDate,localStorageService.get('dateformat'));
                }
            };
        }
    });
    mifosX.ng.application.filter('DateFormat', ['dateFilter','localStorageService',mifosX.filters.DateFormat]).run(function($log) {
        $log.info("DateFormat filter initialized");
    });
}(mifosX.filters || {}));

