var app = angular.module('swiftList', [
                'ui.bootstrap',
                'ngRoute'
                ])
                .controller('HomeController', HomeController)
                .controller('ListController', ListController)
                .config(routeConfig)
;

function routeConfig($routeProvider, $locationProvider) {
    $routeProvider
        .when('/list/', {
            templateUrl: 'templates/homePage.html',
            controller: 'HomeController'
        })
        .when('/list/:listId', {
            templateUrl: 'templates/listPage.html',
            controller: 'ListController',
            resolve: {
                delay: function ($q, $timeout) {
                    var delay = q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.response
                }
            }
        })
        .otherwise({
          redirectTo: "/"
        })

        ; // end of routeProvider
}

function HomeController($scope) {
    $scope.heading = 'Home Page'
}

function ListController($scope) {
    $scope.heading = 'List Page';
}
