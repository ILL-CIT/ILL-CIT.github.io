// Initialize the chessboard
var board = Chessboard('chessboard', {
	draggable: true,
	dropOffBoard: 'trash',
	sparePieces: true
});

// Initialize Stockfish
var stockfish = STOCKFISH();

// Listen for the next move button click
$('#next-move-button').on('click', function() {
	var player = $('#player-select').val();

	// Get the FEN string for the current position
	var fen = board.fen();

	// Tell Stockfish to calculate the next best move
	stockfish.postMessage('position fen ' + fen + ' ' + player);
	stockfish.postMessage('go depth 15');

	// Listen for Stockfish's response
	stockfish.onmessage = function(event) {
		if (event && typeof event === 'object') {
			var match = event.data.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);

			if (match) {
				var from = match[1];
				var to = match[2];
				var promotion = match[3];

				// Make the recommended move on the board
				var move = { from: from, to: to };
				if (promotion) {
					move.promotion = promotion;
				}
				board.move(move);

				// Disable the next move button
				$('#next-move-button').prop('disabled', true);
			}
		}
	};
});

// Listen for a piece drop event on the board
board.on('drop', function(source, target, piece, newPos, oldPos, orientation) {
	var player = $('#player-select').val();

	// If it's the player's turn, enable the next move button
	if (board.turn() === player) {
		$('#next-move-button').prop('disabled', false);
	}
});

// Listen for a piece drag start event on the board
board.on('dragStart', function(source, piece, position, orientation) {
	var player = $('#player-select').val();

	// If it's not the player's turn, prevent dragging
	if (board.turn() !== player) {
		return false;
	}
});

// Listen for a player select change event
$('#player-select').on('change', function() {
	var player = $('#player-select').val();

	// Tell Stockfish to recalculate the best move based on the new player
	var fen = board.fen();
	stockfish.postMessage('position fen ' + fen + ' ' + player);
});

// Listen for Stockfish's output
stockfish.onmessage = function(event) {
	console.log(event.data);
};
