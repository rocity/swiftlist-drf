var app = angular.module('swiftList', [
                    'ui.bootstrap',
                    'ui.router',
                ])
                .controller('HomeController', HomeController)
                .controller('ListController', ListController)
                .constant('API_URL', 'http://localhost:8080/todo/')
                .factory('ListService', ListService)
                .config(routeConfig)
;

function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/homePage.html',
        })

}

function HomeController($scope, ListService) {
    $scope.heading = 'Home Page'

    $scope.list = ListService.list();
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
        return $http.get(API_URL + 'list/');
    }
}
