class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (node === null) {return;}
		if(this.left === null) {
			this.left = node;
			node.parent = this;
			return;
		}
		if(this.right === null)	{
			this.right = node;
			node.parent = this;
			return;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
			return;
		}
		if (this.right === node) {
			this.right = null;
			node.parent = null;
			return;
		}
		throw "Error removeChild";
	}


	remove() {
		if (this.parent !== null) {
			this.parent.removeChild(this);
			return;
		}
	}

	swapWithParent() {
		if (this.parent === null) {return}
			let parentOfParent, parentLeftChild, parentRightChild, leftChild, rightChild, parent;
			parentOfParent = this.parent.parent;
			parent = this.parent;
			leftChild = this.left;
			if (leftChild !== null) {
					leftChild.remove();
			}
			rightChild = this.right;
			if (rightChild !== null) {
					rightChild.remove();
			}
			parent.remove();
			parentLeftChild = parent.left;
			parentRightChild = parent.right;

			if (this === parentLeftChild) {
				this.remove();

				this.appendChild(parent);
				if (parentRightChild !== null) {
					parentRightChild.remove();
					this.appendChild(parentRightChild);
				}

			}
			if (this === parentRightChild) {
				this.remove()
				if (parentLeftChild !== null) {
					parentLeftChild.remove();
					this.appendChild(parentLeftChild);
				}
				this.appendChild(parent);
			}
			parent.appendChild(leftChild);
			parent.appendChild(rightChild);
			if (parentOfParent !== null) {
					parentOfParent.appendChild(this);
			}
		}

}


module.exports = Node;
