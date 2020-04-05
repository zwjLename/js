class TreeNode{
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree{
    constructor(props) {
        this.root = null;

    }
    // 创建二叉树（二叉排序树）
    createBinaryTree(data){
        let node = new TreeNode(data);
        if (!this.root) {
            this.root = node;
        } else {
            this.insertNode(this.root, node);
        }
    }

    //插入节点(左<根<右)
    insertNode(parentNode, node) {
        if (parentNode.data > node.data) {
            if (!parentNode.left) {
                parentNode.left = node;
            } else {
                this.insertNode(parentNode.left, node);
            }
        } else {
            if (!parentNode.right) {
                parentNode.right = node;
            } else {
                this.insertNode(parentNode.right, node);
            }
        }
    }

    /**
     * 前序遍历（根左右）
     * node: 二叉树结点
     *  */ 
    preOrderTraveral(node = this.root) {
        if (!node) {
            return null;
        }
        console.log(node.data);
        this.preOrderTraveral(node.left);
        this.preOrderTraveral(node.right);
    }

    /**
     * 中序遍历(左根右)
     * node: 二叉树节点
     */
    inOrderTraveral(node = this.root) {
        if (!node) {
            return null;
        }
        this.inOrderTraveral(node.left);
        console.log(node.data);
        this.inOrderTraveral(node.right);
    }

    /**
     * 后序bianli
     * @param node 二叉树结点
     */
    postOrderTraveral(node = this.root) {
        if (!node) return null;
        this.postOrderTraveral(node.left);
        this.postOrderTraveral(node.right);
        console.log(node.data);
    }

    /**
     * 二叉树广度优先的遍历(层序遍历)
     */
    levelOrderTraveral(root = this.root){
        let queue = [];
        let result = [];
        if (root) queue.push(root);
        while(queue.length) {
            let level = [];
            let len = queue.length;
            for (let i = 0; i < len; i++) {
                let node = queue.shift();
                level.push(node.data);
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            result.push(level);
        }
        console.log('result',result);
    }
}


let tree = new BinaryTree();
let arr = [3,2,8,9,10,4];
for (let i = 0; i < arr.length; i++) {
    let datas = arr[i];
    tree.createBinaryTree(datas);
}
console.log('tree', tree.root);
// 前序遍历
console.log("=============")
console.log('前序遍历');
tree.preOrderTraveral();
console.log("=============");
// 中序遍历
console.log("中序遍历");
tree.inOrderTraveral();
console.log("=======");
//后序遍历
console.log("后续遍历");
tree.postOrderTraveral();
console.log("========");
//广度优先遍历
console.log("广度优先遍历");
tree.levelOrderTraveral();
