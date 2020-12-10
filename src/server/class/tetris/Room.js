import block from './Tetriminos';
import _ from 'lodash'
import uuidv4 from 'uuid';
var Mutex = require('async-mutex').Mutex;
import Player from './Player';
import regeneratorRuntime from "regenerator-runtime";


class Room extends block {
	
	constructor(player, io, solo = false, channel = uuidv4()) {
		super();
		this.mutex = new Mutex();
		this.isStart = false;
		this.isPlaying = false;
		this.solo = solo;
		this.block = new block();
		this.channel = channel;
		this.players = {};
		this.addPlayer(player);
	}
	
	removePlayer = (uuidUser) => {
		this.players = this.players.filter(item => item.uuid !== uuidUser)
	}

	addSheet = async () => {
		const release = await this.mutex.acquire();

		try {
			let sheet = this.block.newBlock();
			_.map(this.players, elem => elem.sheets.push(sheet));
		} finally {
		    release();
		}
	}

	addPlayer = (player) => {
		player.addSheetFunc(this.addSheet);
		this.players[player.uuid] = player;
	}

	onKey = (key, uuidUser) => {
		if (key === 'ArrowUp') {
			this.players[uuidUser].rotateR();
		} else if (key === 'ArrowDown') {
			this.players[uuidUser].down();
		} else if (key === 'ArrowLeft') {
			this.players[uuidUser].left();
		} else if (key === 'ArrowRight') {
			this.players[uuidUser].rigth();
		} else if (key === ' ') {
			this.players[uuidUser].space();
		}
	}

	countPlayer = () => {
		let i = this.players.length;
		if (i == 4) {
			this.startGame();
		}
	}

	startGame = () => {
		this.isPlaying = true;
		this.isStart = true;
		_.map(this.players, elem => elem.startGame());

	}

	changeIsPlaying = () => {
		this.isPlaying = !this.isPlaying;
	}

	getPlayers = () => {
	    return this.players
	}
}

let p = new Player();
let y = new Room(p);
y.startGame();

export default Room;
