(function() {
    require.config({
    	 waitSeconds: 200,
        paths: {
            'jquery':           './bower_components/jquery/jquery',
            'jquery-ui':        './bower_components/jquery-ui/ui/jquery-ui',
            'data-tables':      './bower_components/datatables/media/js/jquery.dataTables',
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
            'd3':               './bower_components/d3/d3',
            'nvd3':             './bower_components/nvd3/nv.d3',
            'ngSanitize':       './bower_components/angular-sanitize/angular-sanitize',
            'angularFileUpload':'./bower_components/angularjs-file-upload/angular-file-upload',
            'ckEditor':         './bower_components/ckeditor/ckeditor',
            'bootstraptimepicker':	'./bower_components/bootstrap-timepicker/js/bootstrap-timepicker',
            'styles'			: './selfcare_styles',
            'selfcare_test'		: './selfcare_test/functional',
            'notificationWidget': './selfcare_modules/notificationWidget',
            'modified.datepicker': './selfcare_modules/datepicker',
            'configurations'	:  './selfcare_modules/configurations'
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
            'd3': {exports: 'd3'},
            'nvd3': { deps: ['d3']},
            'ngSanitize':{deps:['angular'],exports:'ngSanitize'},
            'notificationWidget':{deps: ['angular','jquery'],exports:'notificationWidget'},
            'angularFileUpload':{deps: ['angular','jquery'],exports:'angularFileUpload'},
            'modified.datepicker':{deps: ['angular']},
            'bootstraptimepicker':{deps:['jquery']},
            'ckEditor':{deps:['jquery']},
            'configurations':{deps: ['angular']},
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
				                    'data-tables',
				                    'blockUI',
				                    'jquery-ui',
				                    'ngSanitize',
				                    'notificationWidget',
				                    'angularFileUpload',
				                    'modified.datepicker',
				                    'bootstraptimepicker',
				                    'ckEditor',
				                    'configurations'
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
