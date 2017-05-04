/**
 * Created by nestor_milian on 1/05/17.
 */
var socket = io();
function submitfunction(){
    var from = $('#user').val();
    var message = $('#m').val();
    if(message != '') {
        socket.emit('chatMessage', from, message);
    }
    $('#m').val('').focus();
    return false;
}

function notifyTyping() {
    var user = $('#user').val();
    socket.emit('notifyUser', user);
}

socket.on('chatMessage', function(from, msg){
    var me = $('#user').val();
    var color = (from == me) ? 'green' : '#009afd';
    var from = (from == me) ? 'Me' : from;
    $('#messages').append('<div id="space"></div>'+'<b style="color:' + color + '">' + from + '</b>: '+'<li>'+ msg + '</li>'+ '<b style="color:' + color + '">' + '</b>'+ '<div id="space"></div>');
});

socket.on('notifyUser', function(user){
    var me = $('#user').val();
    if(user != me) {
        $('#notifyUser').text(user + ' is typing ...');
    }
    setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});

$(document).ready(function(){
    var name = getParameterByName('name');
    $('#user').val(name);
    socket.emit('chatMessage', 'Usuario', '<b>' + name + '</b> has joined the discussion');
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


