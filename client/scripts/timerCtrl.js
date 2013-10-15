/**
 * Created with IntelliJ IDEA.
 * User: ccaglar
 * Date: 14/10/13
 * Time: 4:29 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

app.controller('timerCtrl', function ($scope, Socket) {
    $scope.start = function(){
        Socket.on("timer", function(data){
            $scope.time = data;
        });
    }

    $scope.submit = function(){
        var data = this.inputdata;
        Socket.emit("submit", data);
    }
});