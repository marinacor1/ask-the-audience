var socket = io();

var connectionCount = document.getElementById('connection-count');
var statusMessage   = document.getElementById('status-message');
var tally           = document.getElementById('vote-tally');
var vote           = document.getElementById('vote');

var buttons = document.querySelectorAll('#choices button');


for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

socket.on('userConnection', function(count) {
  connectionCount.innerText = "Connection Users: " + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

socket.on('voteCount', function (votes) {

  var voteTally = {
    a: votes["A"],
    b: votes["B"],
    c: votes["C"],
    d: votes["D"]
  };

  tally.innerText = [voteTally.a, voteTally.b, voteTally.c, voteTally.d];
});

socket.on('vote', function (vote) {
  vote.innerText = vote;
});
