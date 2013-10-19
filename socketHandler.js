/**
 * Created with IntelliJ IDEA.
 * User: cem
 * Date: 19/10/13
 * Time: 10:21 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = {
    handle: function(socket){
        var counter = 0;
        var timer;

        // on start, increment timer every second. 12 ms is average rtt thus subtracted.
        socket.on('start', function(){
            timer = setInterval(function(){
                ++counter;
                console.log('Emitted: ' + counter);
                socket.emit('increment', counter);
            }, 988);
        });

        socket.on('submit', function(data){
            console.log('Submitted: ' + data);
        });

        socket.on('pause', function(){
            clearInterval(timer);
        });

        socket.on('stop', function(){
            clearInterval(timer);
        });
    }

}