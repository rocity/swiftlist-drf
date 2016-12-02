var app = angular.module('swiftList', [
                'ui.bootstrap'
                ])
                .controller('HomeController', HomeController)
;

function HomeController($scope) {
    $scope.heading = 'Home Page';
}
