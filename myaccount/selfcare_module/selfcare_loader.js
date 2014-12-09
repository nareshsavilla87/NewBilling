(function() {
    require.config({
    	 waitSeconds: 200,
        paths: {
            'jquery':           './bower_components/jquery/jquery',
            'jquery-ui':        './bower_components/jquery-ui/ui/jquery-ui',
            'blockUI':          './bower_components/blockui/jquery.blockUI',
            'angular':          './bower_components/angular/angular',
            'angular-resource': './bower_components/angular-resource/angular-resource',
            'angular-route': 	'./bower_components/angular-route/angular-route',
            'angular-translate':'./bower_components/angular-translate/angular-translate',
            'angular-translate-loader-static-files':'./bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
            'angular-mocks':    './bower_components/angular-mocks/angular-mocks',
            'angularui':        './bower_components/angular-bootstrap/ui-bootstrap',
            'angularuitpls':    './bower_components/angular-bootstrap/ui-bootstrap-tpls',
            'underscore':       './bower_components/underscore/underscore',
            'webstorage':       './bower_components/angular-webstorage/angular-webstorage',
            'require-css':      './bower_components/require-css/css',
            'bootstraptimepicker':'./bower_components/bootstrap-timepicker/js/bootstrap-timepicker',
            'tmh.dynamicLocale': './bower_components/angular-dynamic-locale/tmhDynamicLocale.min',
            'selfcare_test'			: './selfcare_test/functional',
            'notificationWidget'	: './selfcare_configuration/notificationWidget',
            'modified.datepicker'	: './selfcare_configuration/datepicker',
            'configurations'		:  './selfcare_configuration/configurations',
            'LocalStorageModule'	: './selfcare_configuration/localstorage',
            'kennitala'				:  './selfcare_configuration/kennitala',
            'aes'					: './CryptoJS/aes',
            'md5'					: './CryptoJS/md5'
        },
        shim: {
            'angular': { exports: 'angular' },
            'angular-resource': { deps: ['angular'] },
            'angular-route': { deps: ['angular'] },
            'angular-translate': { deps: ['angular'] },
            'angular-translate-loader-static-files': {deps: ['angular' , 'angular-translate'] },
            'angularui': { deps: ['angular'] },
            'angularuitpls': { deps: ['angular' ,'angularui' ] },
            'angular-mocks': { deps: ['angular'] },
            'webstorage': { deps: ['angular'] },
            'jquery-ui': { deps: ['jquery'] },
            'notificationWidget':{deps: ['angular','jquery'],exports:'notificationWidget'},
            'modified.datepicker':{deps: ['angular']},
            'bootstraptimepicker':{deps:['jquery']},
            'tmh.dynamicLocale': {deps: ['angular']},
            'LocalStorageModule':{deps:['angular']},
            'configurations':{deps: ['angular']},
            'kennitala':{deps: ['jquery']},
            'aes':{deps: ['jquery']},
            'md5':{deps: ['jquery']},
            
            'selfcare': {deps: [
				                    'angular',
				                    'jquery',
				                    'angular-resource',
				                    'angular-route',
				                    'angular-translate',
				                    'angular-translate-loader-static-files',
				                    'angularui',
				                    'angularuitpls',
				                    'webstorage',
				                    'blockUI',
				                    'jquery-ui',
				                    'notificationWidget',
				                    'modified.datepicker',
				                    'bootstraptimepicker',
				                    'tmh.dynamicLocale',
				                    'LocalStorageModule',
				                    'configurations',
				                    'kennitala',
				                    'aes',
				                    'md5',
				                    
				                 ], exports: 'selfcare'}},
        packages: [
		            {
		                name: 'css',
		                location: './bower_components/require-css',
		                main: 'css'
		            }
		         ]
    });

    require(['SelfCareComponents', 'SelfCareStyles'], function() {
   	 require(['selfcare_test/testInitializer'], function (testMode) {
            if (!testMode) {
                angular.bootstrap(document, ['SelfCare_Application']);
            }
        });
   });
}());
