import random from 'random'

class mounter {
	constructor () {
	}
	timer = () => {
		setInterval(() => {}, this.interval);
	}
	newCase = (x, y , pivot) => {
		return (!Number.isInteger(x) || !Number.isInteger(y) || !typeof pivot == "boolean")
			? false
			: { x, y, pivot };
		}
}

class I extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
		this.y = 1;
		this.type = 1;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-2, 0, false),
			this.newCase(-1,0, false),
			this.newCase(0, 0, true),
			this.newCase(1, 0, false),
		];
	}
}

class O extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
		this.y = 1;
		this.type = 2;
		this.rotate = false;
		this.field = 1;
		this.block = [
			this.newCase(-1, 0, false),
			this.newCase(-1,1, false),
			this.newCase(0, 0, true),
			this.newCase(0, 1, false),
		];
	}
}

class T extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
		this.y = 1;
		this.type = 3;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 0, false),
			this.newCase(0,1, false),
			this.newCase(0, 0, true),
			this.newCase(1, 0, false),
		];
	}
}

class J extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
		this.y = 1;
		this.type = 4;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 1, false),
			this.newCase(-1,0, false),
			this.newCase(0, 0, true),
			this.newCase(1, 0, false),
		];
	}
}

class L extends mounter {
	constructor() {	
		super();
		this.state = false;
		this.x = 5;
		this.y = 1;
		this.type = 5;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 0, false),
			this.newCase(0,0, true),
			this.newCase(1, 0, false),
			this.newCase(1, 1, false),
		];
	}
}


class S extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
		this.y = 1;
		this.type = 6;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 0, false),
			this.newCase(0,0, true),
			this.newCase(0, 1, false),
			this.newCase(1, 1, false),
		];
	}
}

class Z extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
		this.y = 1;
		this.type = 7;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 1, false),
			this.newCase(0,1, false),
			this.newCase(0, 0, true),
			this.newCase(1, 0, false),
		];
	}
}


class Block {
	constructor() {
		this.blocks = [I, O, T, S, Z, J, L];
	}
	newBlock = () => {
		let i = random.int(0, this.blocks.length - 1);
		return new this.blocks[i]();
	}
}

export default Block;
