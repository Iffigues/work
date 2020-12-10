import _ from 'lodash'
class Pieces {
	constructor() {
		this.shadow = {
			x: this.x,
			y: this.y,
		};
		this.interval = 1000;
		this.srs = [[0, 1], [-1, 0]];
		this.lrs = [[0, -1], [1, 0]];
	}

	canPose = (block, xp, yp) => {
		let xx = block.x + xp;
		let yy = block.y + yp;

		if (xx < 0 || yy < 0 || xx > 9 || yy >= 20 - this.indestructible) {
			return false;
		}

		for (let i = 0; i < 4; i++) {
		
			let abx = block.block[i].x + xx;
			let aby = block.block[i].y + yy;
			
			if (abx < 0 || abx > 9 ||  aby >= 20 - this.indestructible|| aby < 0) {
				return false;
			}

			if (this.map_game[aby][abx] != 0) {
				return false;
			}
		}

		return true
	}

	copyBlock = (block) => {
		return {
			block: _.cloneDeep(block.block),
			y: block.y,
			x: block.x,
			rotate: block.rotate,
			field: block.field,
		};
	}

	retro = (block, blk) => {
		block.x = blk.x;
		block.y = blk.y;
		block.rotate= blk.rotate;
		block.field = blk.field;
		block.block = blk.block;
	}

	willBePosed = (blk) => {
		for (let i = 0; i < 3; i++) {
		
			for (let n = 0; n < 3; n++) {
			
				if (this.canPose(blk, n, i)) {
					blk.x += n;
					blk.y += i;
					return true;
				}

				if (this.canPose(blk, -n, i)) {
					blk.x += n;
					blk.y += -i;
					return true;
				}

				if (this.canPose(blk, n, -i)) {
					blk.x += -n;
					blk.y += i;
					return true;
				}

				if (this.canPose(blk, -n, -i)) {
					blk.x += -n;
					blk.y += -i;
					return true;
				}
			}
		}

		return false;
	}

	rotate = (block, direction) => {
		
		let srs;

		if (!Number.isInteger(direction))
			return false;

		if (direction == 0) {
			srs = this.srs;
		} else if (direction == 1) {
			srs = this.lrs;
		} else {
			return false
		}

		let blk = this.copyBlock(block);
		
		for (let i = 0; i < 4; i++) {
		
			let xs = srs[0][0] * block.block[i].x + srs[0][1] * block.block[i].y;
			let ys = srs[1][0] * block.block[i].x + srs[1][1] * block.block[i].y;
			block.block[i].x = xs;
			block.block[i].y = ys;
		}

		if (this.willBePosed(block)) {
			return true;
		} else{
			block = this.retro(block, blk);
			return false;
		}

	}

	fallen = () => {

		if (this.canFall())
			this.y++;
	}
}

export default Pieces;
