var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http, upservice) {



    $scope.sortColumn = "name";

    $scope.search = function(values) {
        $scope.next = false;

        $http.get("http://localhost:8080/details/?id=" + values).then(function(response) {
            $scope.myWelcome = response.data;
            console.log($scope.myWelcome);
        });
    }
     $scope.t=true;
    $scope.prev = false;
    $scope.nxt = false;
    var page = 0;


    $scope.load = function() {
        $scope.prev = true;
        $scope.nxt = true;

        if (page == 0) {

            $scope.prev = false;
        }
        $http.get("http://localhost:8080/details/?_start=" + page + "&_limit=10").then(function(response) {
            $scope.myWelcome = response.data;


        });
    }
    $scope.next = function() {
        page = page + 10;
        if (page > 0) {

            $scope.prev = true;
        }
        $http.get("http://localhost:8080/details/?_start=" + page + "&_limit=10").then(function(response) {
            $scope.myWelcome = response.data;
        });

    }


    $scope.pre = function() {


        page = page - 10;
        if (page < 0) {

            $scope.prev = false;
        }
        if (page < 10) {
            $scope.prev = false;
        }
        $http.get("http://localhost:8080/details/?_start=" + page + "&_limit=10").then(function(response) {
            $scope.myWelcome = response.data;
        });
    }
    $scope.refresh=function(){
        $scope.s=false;
        $scope.t=true;
        $scope.data={};
    }

    $scope.addData = function() {
        $scope.t=true;

        $http.post("http://localhost:8080/details", $scope.data).then(function(response) {
            $scope.myWelcome = [response.data];
            console.log($scope.myWelcome);
        });

    }
    $scope.deleteItem = function(id) {
        console.log(id);
        $http.delete("http://localhost:8080/details/" + id).then(function(response) {
            var index = -1;
            var del = eval($scope.myWelcome);
            for (var i = 0; i < del.length; i++) {
                if (del[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("");
            }
            console.log("Removing");
            $scope.myWelcome.splice(index, 1);
            // alert("deleting"+id+"");
        });
    }
    $scope.edit = function(id) {
        console.log("running");
        $scope.s = true;
        $scope.t=false;

        upservice.myFun(id).success(function(response) {
            $scope.data = response;
            // $log.info($scope.myWelcome);
        });
    }
    $scope.update = function() {
        $scope.s = false;
        $scope.t=false;
        console.log($scope.myWelcome.id+","+ $scope.myWelcome);
        upservice.update($scope.data.id, $scope.data).success(function(response) {
            alert("updated");

            $scope.data = [response];
        });

    }
});






app.directive('search', function() {


    return {
        //console.log("vanthuruchu");
        restrict: 'E',
        templateUrl: 'search.html',
        // controller:function()
        // {

        // }
    };
});
app.directive('load', function() {


    return {
        //console.log("vanthuruchu");
        restrict: 'E',
        templateUrl: 'load.html',
        // controller:function()
        // {

        // }
    };
});
app.directive('add', function() {


    return {
        //console.log("vanthuruchu");
        restrict: 'E',
        templateUrl: 'add.html',
        // controller:function()
        // {

        // }
    };
});
