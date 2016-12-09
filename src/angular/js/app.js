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


// django csrf
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
        .state('listView', {
            url: '/list/:listId',
            templateUrl: 'templates/listPage.html',
            controller: ListController,
        })

}

function HomeController($scope, ListService) {
    /*
    * A page where a collection of Lists are displayed
     */
    $scope.heading = 'List of Lists'
    $scope.list = []

    // Retrieve all Lists from the API
    ListService.list().then(function(response){
        // Format created time of all lists
        for (var i = response.data.length - 1; i >= 0; i--) {
            ftime = moment(response.data[i].created).format("MM-DD-YYYY");

            response.data[i].created = ftime;
        }

        $scope.list = response.data;
    });
}

function ListController($scope, $stateParams, ListService) {
    /*
    * A page where a single List is displayed with its Items
     */
    $scope.list = [];
    $scope.item_create = {};

    // retrieve list details from the API
    ListService.listDetail($stateParams.listId).then(function (response) {
        $scope.list = response.data;
    })

    $scope.createItem = function () {
        $scope.item_create.item_list = $scope.list.id;

        // send http request to API
        ListService.itemCreate($scope.item_create)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.list.items.push(response.data)
                }
            })
    }

    $scope.deleteItem = function (scopeItem, index) {
        ListService.itemDelete(scopeItem.item.id)
            .then(function (response) {
                if (response.status == 204) {
                    $scope.list.items.splice(index, 1);
                }
            })
    }

    $scope.markItemDone = function (scopeItem) {
        ListService.itemDone(scopeItem.item.id, scopeItem.item)
            .then(function (response) {
                if (response.status == 200) {
                    // Mark item as Done in the UI
                    scopeItem.item.done = response.data.done;
                }
            })
    }
}

function ListService($http, API_URL) {
    var services = {
        list: listGet,
        listDetail: listDetail,
        itemDone: itemDone,
        itemCreate: itemCreate,
        itemDelete: itemDelete,
    };
    return services;

    // get all lsits
    function listGet() {
        return $http.get(API_URL);
    }

    // get list details
    function listDetail(listId) {
        return $http.get(API_URL + 'list/' + listId + '/');
    }

    // update item status
    function itemDone(itemId, data) {
        return $http.put(API_URL + 'item/' + itemId + '/', data);
    }

    function itemCreate(data) {
        return $http.post(API_URL + 'item/', data)
    }

    function itemDelete(itemId) {
        return $http.delete(API_URL + 'item/' + itemId + '/')
    }

}
