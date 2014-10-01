(function(selfcare_module) {
	selfcare.filters = _.extend(selfcare_module, {
        DateFormat: function (dateFilter,localStorageService) {
            return function(input) {
                if(input){
                    var tDate = new Date(input);
                    return dateFilter(tDate,localStorageService.get('dateformat'));
                }

            };
        }
    });
    selfcare.ng.application.filter('DateFormat', ['dateFilter','localStorageService',selfcare.filters.DateFormat]).run(function($log) {
        $log.info("DateFormat filter initialized");
    });
}(selfcare.filters || {}));
