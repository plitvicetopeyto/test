require('dotenv').config({path: './.env'})

try {
	console.log(require.resolve('twitch-js'));
} catch(e) {
	console.error('twitch-js not found');
	process.exit(e.code);
}


const TwitchJS = require('twitch-js').default;



const token = process.env.OATH_TOKEN;
const username = process.env.BOT_USERNAME;

const channel = process.env.CHANNEL_NAME;

console.log('Channel: ' + channel);

const { api, chat } = new TwitchJS({ token, username });






function checkJS() {
	alert('This is JS');
}




var num_voting_options = 4;

var most_vote;

var votes = new Array(num_voting_options).fill(0);

function findWinners(arr) {
	var winners = []
	var max_votes = Math.max.apply(Math, arr);
	console.log('max_votes: ', max_votes)
	for( let i = 0; i < arr.length; i++) {
		if( arr[i] === max_votes) {
			winners.push(i);
		}
	}

	return winners;
}

const handleMessage = message => {
	// state management

	if( message.message === '!A') {
		console.log('Vote for A')
		++votes[0];
	} else if (message.message === '!B') {
		console.log('Vote for B')
		++votes[1];
	} else if (message.message === '!C') {
		console.log('Vote for C')
		++votes[2];
	} else if (message.message === '!D') {
		console.log('Vote for D')
		++votes[3];
	} else if (message.message === '!votes') {

		var winners = findWinners(votes);
		var str_winners = "";

		for( let i = 0; i < winners.length; i++) {
			str_winners += String.fromCharCode(65 + winners[i]);
		}

		console.log('Winner(s): ' + str_winners);
		
		
		console.log('Votes for A: ' + votes[0]);	
		console.log('Votes for B: ' + votes[1]);
		console.log('Votes for C: ' + votes[2]);
		console.log('Votes for D: ' + votes[3]);
	}

	// Do other stuff
};

chat.on(TwitchJS.Chat.Events.ALL, handleMessage);

chat.connect().then(() => {
	chat.join(channel);
});


