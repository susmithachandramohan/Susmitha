app.service("upservice",["$http", function($http) {
            var obj = {};
            obj.myFun = function(id) {
                return $http ({
                    method: 'GET',
                    url: 'http://localhost:8080/details/' + id
                });

            }
            obj.update = function(id, myWelcome) {
                return $http({
                    method: 'PUT',
                    url: 'http://localhost:8080/details/' + id,
                    data: myWelcome
                });

            }

            return obj;
        }]);
