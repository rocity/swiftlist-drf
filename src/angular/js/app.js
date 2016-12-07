var app = angular.module('swiftList', [
                'ui.bootstrap',
                'ui.router',
                ])
                .controller('HomeController', HomeController)
                .controller('ListController', ListController)
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

function HomeController($scope) {
    $scope.heading = 'Home Page'
}

function ListController($scope) {
    $scope.heading = 'List Page';
}
