
export default function mergeSort(arr){
    if (arr.length==1) {return  arr } 
    //tomo las mitades
    const mid= Math.floor(arr.length/2);
    const leftArr=arr.slice(0,mid);
    const rightArr=arr.slice(mid,arr.length);
    //recursion,divido y divido
    const sorted_left_arr= mergeSort(leftArr);
    const sorted_right_arr= mergeSort(rightArr);
    //uno
    return merge(sorted_left_arr,sorted_right_arr);
}
function merge(leftArr,rightArr){
    let resultArr=[]
    //comparo cuando uno se quedo sin elementos
        while (leftArr.length > 0 && rightArr.length > 0) {
            if (leftArr[0] < rightArr[0]) { 
                resultArr.push(leftArr.shift()); //pushea a la lista y elimina el primo
            } else {
                resultArr.push(rightArr.shift());
            }
        }
    //Si un elemento se quedo con los mayores 
    //derecho
    while (leftArr.length > 0) {
        resultArr.push(leftArr.shift());
    }
    while (rightArr.length > 0) {
        resultArr.push(rightArr.shift());
    }
    return resultArr;
}
