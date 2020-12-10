import Block from './Piece'
var Mutex = require('async-mutex').Mutex;
import regeneratorRuntime from "regenerator-runtime";

class Game extends Block {
	constructor(updateRoomFunction) {
		super();
		this.updateRoomFunction = updateRoomFunction;
		this.mutex = new Mutex();
		this.block = null;
		this.keyBind = [this.left, this.rigth, this.down, this.rotateL, this.rotateR, this.space];
	}

 	setMoose = async (yy, xx) => {
		 const release = await this.mutex.acquire();
		 try {
			 if (yy !== 0) {
				 if (this.canPose(this.block, xx, yy)) {
					 this.block.y += yy;
				}
			} if (xx !== 0) {
					if (this.canPose(this.block, xx, yy)) {
						this.block.x += xx;
					}
				}
			} finally {
			release();
		}
	}

	left = () => {
		this.setMoose(0, -1);
	}
	
	rigth = () => {
		this.setMoose(0, 1);
	}
	
	down = () => {
		this.setMoose(1, 0);
	}



	rotateL = async  () => {
		const release = await this.mutex.acquire();
		try {
			this.rotate(this.block, 0);
		} finally {
			release();
		}
	}
	
	rotateR = async () => {
		const release = await this.mutex.acquire();
		try {
			this.rotate(this.block, 1);
		} finally {
			release();
		}
	}
	
	space = async () => {
		const release = await this.mutex.acquire();
		try {
		while (this.canPose(this.block, 0, 0)) 
			this.block.y += 1;
		this.block.y -= 1;
		} finally {
			release();
		}
	}

	draw = async (blk, z) => {
		for (let y = 0; y < 4; y = y + 1) {
			this.map_game[blk.y + blk.block[y].y][blk.x + blk.block[y].x] = z;
		}
		
	}
	
	setKey = (i) => {
		if(typeof this.keyBind[i] === 'undefined') {
		} else {
			this.keyBind[i]();
		}
	}

	sleep = (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	moove = async () => {
		let i = 0;
		const release = await this.mutex.acquire();
		ff: try {
			if (!this.canPose(this.block, 0, 1)) {
				i = 0;
				break ff;
			}
			await this.sleep(1000);
			this.block.y += 1;
			} finally {
				release();
			}
		return i;
	}

	start = async () => {
		while (1) {
			if (this.sheets.length === 0) {
				await this.addSheet();
			}
			this.block = this.sheets.pop();
			await this.rotateL();
			const res = await this.mutex.acquire();
			try {
				if (!this.canPose(this.block, 0, 0)) {
					break;
				}
			} finally {
				res();
			}
			while (1) {
				this.draw(this.block, this.block.type);
				if (this.updateRoomFunction) {
					this.updateRoomFunction()
				}
				this.draw(this.block, 0);
				const release = await this.mutex.acquire();
				try {
				
					if (!this.canPose(this.block, 0, 1)) {
						this.draw(this.block, this.block.type);
						this.verifLine();
						break;
					}
					await this.sleep(1000);
					this.draw(this.block, 0);
					this.block.y += 1;
				} finally {
					release();
				}
			}
		}
	}

	wash = (e) => {
		this.map_game.splice(e,e);
		this.map_game.unshift([0,0,0,0,0,0,0,0,0,0]);
	}

	verifLine = () => {
		let arr = 0;
		for (let i = 19 - this.indestructible; i >= 0; i--) {
			let u = 1;
			for (let y = 0; y < 10; y++) {
				if (this.map_game[i][y] == 0) {
					u = 0;
					break;
				}
			}
			if (u == 1) {
				arr = arr + 1;
				this.wash(i);
				this.verifLine();
			}
		}
		return arr;
	}
}

export default Game;
