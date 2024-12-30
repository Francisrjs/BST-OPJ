export default class Node {
    constructor(data){
        data=data;
        left=this.left;
        right=this.right;
    }
    addLeft(data){
        this.left=new Node(data);
    }
    addRight(data){
        this.right=new Node(data);
    }
}