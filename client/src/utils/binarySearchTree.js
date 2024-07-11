class TreeNodeClass {
  constructor(value) {
    this.value = value;
    this.count = 1;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  async insertWithAnimation(value, callback, animationSpeed) {
    if (!this.root) {
      this.root = new TreeNodeClass(value);
      callback(this.root, null);
      return;
    }
    await this._insertNodeWithAnimation(this.root, value, callback, animationSpeed);
  }

  async _insertNodeWithAnimation(node, value, callback, animationSpeed) {
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    callback(node, null);

    if (value < node.value) {
      if (!node.left) {
        node.left = new TreeNodeClass(value);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(node.left, { from: node, to: node.left });
      } else {
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(null, { from: node, to: node.left });
        await this._insertNodeWithAnimation(node.left, value, callback, animationSpeed);
      }
    } else if (value > node.value) {
      if (!node.right) {
        node.right = new TreeNodeClass(value);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(node.right, { from: node, to: node.right });
      } else {
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(null, { from: node, to: node.right });
        await this._insertNodeWithAnimation(node.right, value, callback, animationSpeed);
      }
    } else {
      node.count++;
      callback(node, null);
    }
  }

  async searchWithAnimation(value, callback, animationSpeed) {
    const result = await this._searchNodeWithAnimation(this.root, value, callback, animationSpeed);
    console.log(result ? `Value ${value} found in the tree!` : `Value ${value} not found in the tree.`);
    return result;
  }

  async _searchNodeWithAnimation(node, value, callback, animationSpeed) {
    if (!node) return null;

    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    callback(node, null);

    if (value < node.value) {
      if (node.left) {
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(null, { from: node, to: node.left });
        return await this._searchNodeWithAnimation(node.left, value, callback, animationSpeed);
      } else {
        return null;
      }
    } else if (value > node.value) {
      if (node.right) {
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(null, { from: node, to: node.right });
        return await this._searchNodeWithAnimation(node.right, value, callback, animationSpeed);
      } else {
        return null;
      }
    } else {
      return node;
    }
  }

  async removeWithAnimation(value, callback, animationSpeed) {
    const result = await this._removeNodeWithAnimation(this.root, value, callback, animationSpeed);
    console.log(result ? `Value ${value} removed from the tree!` : `Value ${value} not found in the tree.`);
    return result;
  }

  async _removeNodeWithAnimation(node, value, callback, animationSpeed) {
    if (!node) return null;

    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    callback(node, null);

    if (value < node.value) {
      if (node.left) {
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(null, { from: node, to: node.left });
        node.left = await this._removeNodeWithAnimation(node.left, value, callback, animationSpeed);
      }
    } else if (value > node.value) {
      if (node.right) {
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(null, { from: node, to: node.right });
        node.right = await this._removeNodeWithAnimation(node.right, value, callback, animationSpeed);
      }
    } else {
      if (node.count > 1) {
        node.count--;
        callback(node, null);
        return node;
      }

      if (!node.left && !node.right) {
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(null, { from: node, to: null });
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(null, null);
        return null;
      }
      if (!node.left) {
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(null, { from: node, to: node.right });
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(null, null);
        return node.right;
      }
      if (!node.right) {
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(null, { from: node, to: node.left });
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        callback(null, null);
        return node.left;
      }

      const minNode = await this._findMinNodeWithAnimation(node.right, callback, animationSpeed);
      node.value = minNode.value;
      node.count = minNode.count;
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      callback(node, null);
      node.right = await this._removeNodeWithAnimation(node.right, minNode.value, callback, animationSpeed);
    }
    return node;
  }

  async _findMinNodeWithAnimation(node, callback, animationSpeed) {
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    callback(node, null);
    if (node.left) {
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      callback(null, { from: node, to: node.left });
      return await this._findMinNodeWithAnimation(node.left, callback, animationSpeed);
    }
    return node;
  }

  async inorderTraversalWithAnimation(node, visitCallback, animationSpeed) {
    if (node === null) return;
    await this.inorderTraversalWithAnimation(node.left, visitCallback, animationSpeed);
    await visitCallback(node);
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    await this.inorderTraversalWithAnimation(node.right, visitCallback, animationSpeed);
  }

  async preorderTraversalWithAnimation(node, visitCallback, animationSpeed) {
    if (node === null) return;
    await visitCallback(node);
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    await this.preorderTraversalWithAnimation(node.left, visitCallback, animationSpeed);
    await this.preorderTraversalWithAnimation(node.right, visitCallback, animationSpeed);
  }

  async postorderTraversalWithAnimation(node, visitCallback, animationSpeed) {
    if (node === null) return;
    await this.postorderTraversalWithAnimation(node.left, visitCallback, animationSpeed);
    await this.postorderTraversalWithAnimation(node.right, visitCallback, animationSpeed);
    await visitCallback(node);
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
  }

  insert(value) {
    if (!this.root) {
      this.root = new TreeNodeClass(value);
      return;
    }
    this._insertNode(this.root, value);
  }

  _insertNode(node, value) {
    if (value < node.value) {
      if (!node.left) {
        node.left = new TreeNodeClass(value);
      } else {
        this._insertNode(node.left, value);
      }
    } else if (value > node.value) {
      if (!node.right) {
        node.right = new TreeNodeClass(value);
      } else {
        this._insertNode(node.right, value);
      }
    } else {
      node.count++;
    }
  }

  remove(value) {
    this.root = this._removeNode(this.root, value);
  }

  _removeNode(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._removeNode(node.right, value);
    } else {
      if (node.count > 1) {
        node.count--;
        return node;
      }

      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const minNode = this._findMinNode(node.right);
      node.value = minNode.value;
      node.count = minNode.count;
      node.right = this._removeNode(node.right, minNode.value);
    }
    return node;
  }

  _findMinNode(node) {
    return node.left ? this._findMinNode(node.left) : node;
  }

  getLinks(node, links = []) {
    if (node) {
      if (node.left) {
        links.push({
          x1: node.x,
          y1: node.y,
          x2: node.left.x,
          y2: node.left.y,
        });
        this.getLinks(node.left, links);
      }
      if (node.right) {
        links.push({
          x1: node.x,
          y1: node.y,
          x2: node.right.x,
          y2: node.right.y,
        });
        this.getLinks(node.right, links);
      }
    }
    return links;
  }

  countNodes(node = this.root) {
    if (!node) return 0;
    return 1 + this.countNodes(node.left) + this.countNodes(node.right);
  }
}

export { TreeNodeClass, BinarySearchTree };
