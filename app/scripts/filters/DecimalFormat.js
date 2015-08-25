(function(module) {
    mifosX.filters = _.extend(module, {
        DecimalFormat: function ($rootScope) {
            return function(decimal) {
                var locale=$rootScope.locale.code;
                var finalDecimal;
                console.log(locale);
                if(locale !='en'){
                finalDecimal=decimal.toLocaleString(locale);
                }else{
                	finalDecimal=decimal;
                }
                return finalDecimal;
            };
        }
    });
    mifosX.ng.application.filter('DecimalFormat',['$rootScope',mifosX.filters.DecimalFormat]).run(function($log) {
        $log.info("DecimalFormat filter initialized");
    });
}(mifosX.filters || {}));
