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
  
    async insertWithAnimation(value, callback) {
      if (!this.root) {
        this.root = new TreeNodeClass(value);
        callback(this.root, null);
        return;
      }
      await this._insertNodeWithAnimation(this.root, value, callback);
    }
  
    async _insertNodeWithAnimation(node, value, callback) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 saniye bekle
      callback(node, null); // Mevcut düğümü vurgula
  
      if (value < node.value) {
        if (!node.left) {
          node.left = new TreeNodeClass(value);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(node.left, { from: node, to: node.left });
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(null, { from: node, to: node.left });
          await this._insertNodeWithAnimation(node.left, value, callback);
        }
      } else if (value > node.value) {
        if (!node.right) {
          node.right = new TreeNodeClass(value);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(node.right, { from: node, to: node.right });
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(null, { from: node, to: node.right });
          await this._insertNodeWithAnimation(node.right, value, callback);
        }
      } else {
        node.count++;
        callback(node, null);
      }
    }
  
    async searchWithAnimation(value, callback) {
      const result = await this._searchNodeWithAnimation(
        this.root,
        value,
        callback
      );
      if (result) {
        console.log(`Value ${value} found in the tree!`);
      } else {
        console.log(`Value ${value} not found in the tree.`);
      }
      return result;
    }
  
    async _searchNodeWithAnimation(node, value, callback) {
      if (!node) {
        return null;
      }
  
      await new Promise((resolve) => setTimeout(resolve, 1000));
      callback(node, null);
  
      if (value < node.value) {
        if (node.left) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(null, { from: node, to: node.left });
          return await this._searchNodeWithAnimation(node.left, value, callback);
        } else {
          return null;
        }
      } else if (value > node.value) {
        if (node.right) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(null, { from: node, to: node.right });
          return await this._searchNodeWithAnimation(node.right, value, callback);
        } else {
          return null;
        }
      } else {
        return node;
      }
    }
  
    async removeWithAnimation(value, callback) {
      const result = await this._removeNodeWithAnimation(
        this.root,
        value,
        callback
      );
      if (result) {
        console.log(`Value ${value} removed from the tree!`);
      } else {
        console.log(`Value ${value} not found in the tree.`);
      }
      return result;
    }
  
    async _removeNodeWithAnimation(node, value, callback) {
      if (!node) return null;
  
      await new Promise((resolve) => setTimeout(resolve, 1000));
      callback(node, null);
  
      if (value < node.value) {
        if (node.left) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(null, { from: node, to: node.left });
          node.left = await this._removeNodeWithAnimation(
            node.left,
            value,
            callback
          );
        }
      } else if (value > node.value) {
        if (node.right) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(null, { from: node, to: node.right });
          node.right = await this._removeNodeWithAnimation(
            node.right,
            value,
            callback
          );
        }
      } else {
        if (node.count > 1) {
          node.count--;
          callback(node, null);
          return node;
        }
  
        if (!node.left && !node.right) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(null, { from: node, to: null });
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Bu satırı ekleyin
          callback(null, null); // Bu satırı ekleyin
          return null;
        }
        if (!node.left) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(null, { from: node, to: node.right });
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(null, null);
          return node.right;
        }
        if (!node.right) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(null, { from: node, to: node.left });
          await new Promise((resolve) => setTimeout(resolve, 1000));
          callback(null, null);
          return node.left;
        }
  
        const minNode = await this._findMinNodeWithAnimation(
          node.right,
          callback
        );
        node.value = minNode.value;
        node.count = minNode.count;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        callback(node, null);
        node.right = await this._removeNodeWithAnimation(
          node.right,
          minNode.value,
          callback
        );
      }
      return node;
    }
  
    async _findMinNodeWithAnimation(node, callback) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      callback(node, null);
      if (node.left) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        callback(null, { from: node, to: node.left });
        return await this._findMinNodeWithAnimation(node.left, callback);
      }
      return node;
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
  