/**
 * Created with IntelliJ IDEA.
 * User: ccaglar
 * Date: 14/10/13
 * Time: 4:29 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

app.controller('timerCtrl', function ($scope, Socket) {
    $scope.timerStarted = false;
    $scope.completed = false;

    $scope.start = function(){
        $scope.timerStarted = true;
        Socket.emit('start');
    }

    Socket.on("increment", function(data){
        $scope.time = data;
    });


    $scope.stop = function(){
        $scope.completed = true;
        Socket.emit('stop');
    }

    $scope.pause = function(){
        $scope.timerStarted = false;
        Socket.emit('pause');
    }

    $scope.submit = function(){
        var data = this.inputdata;
        Socket.emit("submit", data);
    }
});