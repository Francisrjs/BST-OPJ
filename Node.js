export default class Node {
    constructor(data){
        this.data=data;
        this.left=null;
        this.right=null;
    }
    addLeft(data){
        this.left=new Node(data);
    }
    addRight(data){
        this.right=new Node(data);
    }
}