(function() {
    require.config({
    	 waitSeconds: 200,
        paths: {
            'jquery':           '../../app/bower_components/jquery/jquery',
            'jquery-ui':        '../../app/bower_components/jquery-ui/ui/jquery-ui',
            'data-tables':      '../../app/bower_components/datatables/media/js/jquery.dataTables',
            'blockUI':          '../../app/bower_components/blockui/jquery.blockUI',
            'angular':          '../../app/bower_components/angular/angular',
            'angular-resource': '../../app/bower_components/angular-resource/angular-resource',
            'angular-route': 	'../../app/bower_components/angular-route/angular-route',
            'angular-translate':'../../app/bower_components/angular-translate/angular-translate',
            'angular-translate-loader-static-files':'../../app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
            'angular-mocks':    '../../app/bower_components/angular-mocks/angular-mocks',
            'angularui':        './angular-bootstrap/ui-bootstrap',
            'angularuitpls':    './angular-bootstrap/ui-bootstrap-tpls',
            'underscore':       '../../app/bower_components/underscore/underscore',
            'webstorage':       '../../app/bower_components/angular-webstorage/angular-webstorage',
            'require-css':      '../../app/bower_components/require-css/css',
            'd3':               '../../app/bower_components/d3/d3',
            'nvd3':             '../../app/bower_components/nvd3/nv.d3',
            'ngSanitize':       '../../app/bower_components/angular-sanitize/angular-sanitize',
            'angularFileUpload':'../../app/bower_components/angularjs-file-upload/angular-file-upload',
            'ckEditor':         '../../app/bower_components/ckeditor/ckeditor',
            'bootstraptimepicker':	'../../app/bower_components/bootstrap-timepicker/js/bootstrap-timepicker',
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
		                location: '../../app/bower_components/require-css',
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
