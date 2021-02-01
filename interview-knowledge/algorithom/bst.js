function Node(val, left, right) {
  this.left = (left === undefined) ? null : left
  this.right = (right === undefined) ? null : right
  this.val = (val === undefined) ? 0 : val
}
class BST {
  constructor(root) {
    this.root = null
  }

  insert(value) {
    if(!this.root) {
      this.root = new Node(value)
      return
    }

    // recursion
    // innerInsert(value, this.root)
    // function innerInsert(value, node) {
    //   let current = node
    //   if(value <= current.val) {
    //     if(current.left === null) {
    //       current.left = new Node(value)
    //     } else {
    //       innerInsert(value, current.left)
    //     }
    //   } else {
    //     if(current.right === null) {
    //       current.right = new Node(value)
    //     } else {
    //       innerInsert(value, current.right)
    //     }
    //   }
    // }

    // iterating
    let current = this.root
    while(current) {
      if(value <= current.val) {
        if(current.left === null) {
          current.left = new Node(value)
          break
        } else {
          current = current.left
        }
      } else {
        if(current.right === null) {
          current.right = new Node(value)
          break
        } else {
          current = current.right
        }
      }
    }
  }

  inOrder(node) {
    if(node === null)
      return
    this.inOrder(node.left)
    console.log(node.val)
    this.inOrder(node.right)
  }

  preOrder(node) {
    if(node === null)
      return
    console.log(node.val)
    this.preOrder(node.left)
    this.preOrder(node.right)
  }

  postOrder(node) {
    if(node === null)
      return
    this.postOrder(node.left)
    this.postOrder(node.right)
    console.log(node.val)
  }

  // rootOrder(node) {
  //   let index = 1
  //   let arr = []
  //   // if(node === null)
  //   //   console.log(null)
  //   console.log(node ? node.val : null)

  //   display(node)
  //   function display(innerNode) {
  //     index++
  //     console.log(innerNode.left.val)
  //     index++
  //     console.log(innerNode.right.val)
  //     display(innerNode.left)
  //     display(innerNode.right)
  //   }
  // }

  getMinNode(parent) {
    let current = parent
    while(current) {
      if(!current.left)
        break
      current = current.left
    }
    return current
  }

  getMaxNode(parent) {
    let current = parent
    while(current) {
      if(!current.right)
        break
      current = current.right
    }
    return current
  }

  find(val) {
    let current = this.root
    while(current) {
      if(!current || current.val === val)
        break
      if(val <= current.val) {
        current = current.left
      } else {
        current = current.right
      }
    }
    return current ? current : null
  }

  findParentOf(node) {
    let current = this.root
    while(current) {
      if(!current)
        break
      if((current.left && current.left.val === node.val) || (current.right && current.right.val === node.val))
        break
      if(node.val <= current.val) {
        current = current.left
      } else {
        current = current.right
      }
    }
    return current ? current : 'sorry, no matched'
  }

  remove(val) {
    let matched = this.find(val)
    if(!matched)
      return false
    // if(!matched.left && !matched.right) {
    //   let parent = this.findParentOf(matched)
    //   if(val <= parent.val) {
    //     parent.left = null
    //   } else {
    //     parent.right = null
    //   }
    // } else if (!matched.left || !matched.right) {
    //   let parent = this.findParentOf(matched)
    //   let child = matched.left || matched.right
    //   if(val <= parent.val) {
    //     parent.left = child
    //   } else {
    //     parent.right = child
    //   }
    // } else {
    //   let minNodeAtRight = this.getMinNode(matched.right)
    //   let parent = this.findParentOf(minNodeAtRight)
    //   matched.val = minNodeAtRight.val
    //   // remove leaf, can improve
    //   if(val <= parent.val) {
    //     parent.left = null
    //   } else {
    //     parent.right = null
    //   }
    // }
  }
}

let bst = new BST()
bst.insert(23)
bst.insert(45)
bst.insert(16)
bst.insert(37)
bst.insert(3)
bst.insert(99)
bst.insert(22)

// bst.rootOrder(bst.root)
// bst.inOrder(bst.root)
// console.log("\n")
bst.remove(16)
// bst.remove(23)
bst.inOrder(bst.root)
