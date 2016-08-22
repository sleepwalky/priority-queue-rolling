const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	push(data, priority) {
		let node;
		node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		let node;
		if (this.root === null) { return; }
			node = this.detachRoot();
			this.restoreRootFromLastInsertedNode(node);
			this.shiftNodeDown(this.root);
			return node.data;
	}

	detachRoot() {
		let node;
		if (this.root === null) {return node;}
		node = this.root;
		this.root = null;
		this.length--;
		if (this.parentNodes.indexOf(node) !== -1) {
			this.parentNodes.shift();
		}
		return node;
	}

	restoreRootFromLastInsertedNode(detached) {
		let parent;
		if (!(detached instanceof Node )) {return;}
		let last, temp;
		last = this.parentNodes.pop();
		if (last !== undefined) {
			this.root = last;
			if (last.parent !== null) {
				parent = last.parent;
				last.remove();
				if (parent.right === null && parent.left !== null && parent !== detached) {
					this.parentNodes.unshift(parent);
				}
			}
			if (detached.left !== null) {
					last.appendChild(detached.left);
			}
			if (detached.right !== null) {
					last.appendChild(detached.right);
					return;
			}
			this.parentNodes.unshift(last);
		}
	}

	size() {
		return this.length;
	}

	isEmpty() {
		if (this.root === null) {
			return true;
		}
			else {
				return false;
			}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	insertNode(node) {
		this.length++;
		if (this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}
		if (this.parentNodes[0].left === null) {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
		}
			else {
				this.parentNodes[0].appendChild(node);
				this.parentNodes.push(node);
				this.parentNodes.shift();
			}

	}

	shiftNodeUp(node) {
		let i, j;
		if (node.parent !== null && node.priority > node.parent.priority) {
			if (node.parent === this.root) {
				this.root = node;
			}

			i = this.parentNodes.indexOf(node.parent);
			j = this.parentNodes.indexOf(node);
			if (i === -1) {
				this.parentNodes[j] = node.parent;
			}
				else {
					this.parentNodes[i] = node;
					this.parentNodes[j] = node.parent;
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (node === null) {return;}
		let i, j, temp;
		if (node.left !== null) {
			temp = node.left;
			if (node.right !== null) {
				if (temp.priority <= node.right.priority) {
					temp = node.right;
				}
			}
			if (temp.priority > node.priority) {
				if (node === this.root) {
					this.root = temp;
				}
				temp.swapWithParent();
				i = this.parentNodes.indexOf(node);
				j = this.parentNodes.indexOf(temp);
				if (i === -1) {
					this.parentNodes[j] = node;
				}
					else {
						this.parentNodes[i] = temp;
						this.parentNodes[j] = node;
				}
				this.shiftNodeDown(node);
			}
		}
	}

	draw() {
		let a,b,c,d,e,f,g,k,aa,bb,cc,dd,ee,ff,gg,kk;
		if (this.root !== null) {
			a = this.root;
			aa = a.priority;
			b = a.left;
			c = a.right;
			if (b !== null) {
				bb = b.priority;
				d = b.left;
				e = b.right;
				if (d !== null) {
					dd = d.priority;
					if (d.left !== null) {
						kk = d.left.priority;
					}
				}
				if (e !== null) {
					ee = e.priority;
				}

			}
			if (c !== null) {
				cc = c.priority;
				f = c.left;
				g = c.right;
				if (f !== null) {
					ff = f.priority;
				}
				if (g !== null) {
					gg = g.priority;
				}
			}
		}

		console.log('	' + aa);
		console.log('     ' + bb + '   ' + cc);
		console.log(dd + '   ' + ee + '       ' + ff + ' ' + gg);
		console.log(kk);
		console.log(' ');

	}

}

module.exports = MaxHeap;
