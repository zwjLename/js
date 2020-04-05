//大堆
class PriorityQueue{
    constructor(arr) {
        this.arr = arr;
    }
    /**
     * 
     * @param {*} key 入队
     */
    enQueue(key) {
        this.arr[this.arr.length] = key;
        this.upAdjust();
        return this;
    }

    deQueue() {
        if (!this.arr.length) return null;
        let head = this.arr[0];
        
        //让最后一个元素到堆顶
        this.arr[0] = this.arr[this.arr.length - 1];
        
        this.downAdjust();
        return head;
    }

    upAdjust(){
        let childIndex = this.arr.length - 1;
        let parentIndex = (childIndex - 1) / 2;
        let temp = this.arr[childIndex];
        while(childIndex > 0 && temp > this.arr[parentIndex]) {
            this.arr[childIndex] = this.arr[parentIndex];
            childIndex = parentIndex;
            parentIndex = (childIndex - 1)/ 2;
        }
        this.arr[childIndex] = temp;
        
    }

    downAdjust() {
        let parentIndex = 0;
        let temp = this.arr[parentIndex];
        let childIndex = 1;
        while(childIndex < this.arr.length) {
            if (childIndex + 1 < this.arr.length && this.arr[childIndex + 1] > this.arr[childIndex]) {
                childIndex ++ ;
            }
            if (temp >= this.arr[childIndex]) break;
            this.arr[parentIndex] = this.arr[childIndex];
            parentIndex = childIndex;
            childIndex = childIndex * 2 + 1;
        }
        this.arr[parentIndex] = temp;
        this.arr.length -= 1;
    }
}

let queue = new PriorityQueue([]);
queue.enQueue(3).enQueue(5).enQueue(1).enQueue(10).enQueue(2);
console.log(queue.arr);
console.log("出队元素："+ queue.deQueue());
console.log("出队元素："+ queue.deQueue());
console.log("出队元素："+ queue.deQueue());
console.log("出队元素："+ queue.deQueue());
console.log("出队元素："+ queue.deQueue());
console.log("出队元素："+ queue.deQueue());
