import uuidv4 from 'uuid'
import Game from './Game'

const GAME_WIDTH = 10;
const GAME_HEIGHT = 20;
class Player extends Game {
	constructor (name, admin = false, updateRoomFunction) {
		super(updateRoomFunction)
		this.uuid = uuidv4()
		this.name = name
		this.score = 0;
		this.admin = admin;
		this.live = true;
		this.sheets = [];
		this.map_game = [];
		this.indestructible = 0;
		this.time = 1000;
		// Array.from(Array(GAME_HEIGHT), () => 
    //   new Array(GAME_WIDTH).fill(0)
    // )
		for (let i = 0; i < 20; i++) {
			this.map_game.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		}
		this.block = null;
	}
        
	addSheetFunc = (func) => {
		this.addSheet = func; 
	}

	pushSheet = () => {
		this.addSheet();
	}

	destroyLine = (a) => {
		while (a) {
			this.map_game[this.indestructible].fill(-1);
			this.indestructible = this.indestructible + 1;
			if (this.indestructible == 19) {
				return;
			}
		}
	}

	startGame = () => {
		this.start();
	}

	keyBind = (i) => {
		this.setKey(i);
	}
}

export default Player;
