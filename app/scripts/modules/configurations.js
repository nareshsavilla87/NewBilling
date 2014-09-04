angular.module('configurations', [])
.constant('TENANT','default')
.constant('HOST','https://demo.openmf.org')
.constant('API_VERSION','/obsplatform/api/v1')
.constant('CONTENT_TYPE','application/json; charset=utf-8')
.constant('IDLE_DURATION', 20 * 60)

.constant('WARN_DURATION', 20)
.constant('KEEPALIVE_INTERVAL', 20 * 60);

