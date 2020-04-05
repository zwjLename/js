/**
 * 二叉堆以数组的方式存储
 * 父：parent
 * 左子: 2*parent + 1
 * 右子: 2*parent + 2
 */

 //小堆
 class Heap{

     upAdjust(arr){
         let childIndex = arr.length - 1;
         let parentIndex = (childIndex - 1) / 2;
         let temp = arr[childIndex];
         while(childIndex > 0 && temp < arr[parentIndex]) {
             arr[childIndex] = arr[parentIndex];
             childIndex = parentIndex;
             parentIndex = (parentIndex - 1) / 2;
         }
         arr[childIndex] = temp;
         return arr;
     }

     /**
      * 
      * @param {*} arr 待调整的堆
      * @param {*} parentIndex 要下沉的父节点
      * @param {*} length 堆的有效大小
      */
     downAdjust(arr, parentIndex, length){
         let temp = arr[parentIndex];
         let childIndex = 2*parentIndex + 1;
         while(childIndex < length) {
             //有右孩子，且右孩子小于左孩子，则定位到右孩子
             if (childIndex + 1 < length && arr[childIndex + 1] < arr[childIndex]) {
                 childIndex++;
             }
             //如果父节点小于任何一个孩子的值，则直接跳出
             if (temp <= arr[childIndex]) break;
             arr[parentIndex] = arr[childIndex];
             parentIndex = childIndex;
             childIndex = 2 * parentIndex + 1;
         }
         arr[parentIndex] = temp;
         return arr;
     }

     //构造堆
     buildHeap(arr) {
        //从最后一个非叶子节点开始，往下沉
        for (let i = (arr.length - 2) / 2; i >= 0; i--) {
            return this.downAdjust(arr, i, arr.length);
        }
     }

 }

 let arr = [1,3, 2, 6,5,7,8,9,10,0];
 let resultUp = new Heap().upAdjust(arr);
 console.log('resultUp: ', resultUp);
 let build = new Heap().buildHeap(arr);
 console.log('build: ', build);
