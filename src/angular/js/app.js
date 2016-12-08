var app = angular.module('swiftList', [
                    'ui.bootstrap',
                    'ui.router',
                ])
                .controller('HomeController', HomeController)
                .controller('ListController', ListController)
                .constant('API_URL', 'http://localhost:8080/todo/')
                .factory('ListService', ListService)
                .config(routeConfig)
                .config(csrf)
;


function csrf($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}

function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/homePage.html',
        })

}

function HomeController($scope, ListService) {
    $scope.heading = 'List of Lists'

    ListService.list().then(function(response){
        for (var i = response.data.length - 1; i >= 0; i--) {
            ftime = moment(response.data[i].created).format("MM-DD-YYYY");

            response.data[i].created = ftime;
        }

        $scope.list = response.data;
    });
}

function ListController($scope) {
    $scope.heading = 'List Page';
}

function ListService($http, API_URL) {
    var services = {
        list: listGet,
    };
    return services;

    function listGet() {
        return $http.get(API_URL);
    }
}
