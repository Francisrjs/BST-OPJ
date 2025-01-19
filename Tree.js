import mergeSort from "./mergeSort.js";
import Node from "./node.js";
export default class Tree {
  constructor(array){
      const processArray= this.eliminateDuplicates(array);
      const sortedArray= mergeSort(processArray);
      console.log(sortedArray);
      this.root=this.buildTree(sortedArray);
  }
  buildTree(array) {
    if (array.length == 0) return null;
    const mid = Math.floor(array.length / 2); 
    const node = new Node(array[mid]);

    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));

    return node;
}
  eliminateDuplicates(array) {
      return [...new Set(array)];
  }
  prettyPrint() { 
    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
      prettyPrint(this.root);
  }
  insert(value, current= this.root){
    if (this.root==null) { //C. Base
      this.root=new Node(value);
      return;
    }
    if (value<= current.data){ 
      if (current.left==null) {
        current.left= new Node(value);
        console.log(`Valor ${value} insertado.`);
      } else {
        this.insert(value,current.left);
      }
    }else{ // value >= current.data
      if (current.right==null){
        current.right= new Node(value);
        console.log(`Valor ${value} insertado.`);
      } else{
        this.insert(value,current.right);
      }
    }
  
}
  find(value,current=this.root){
    //C. Base
    if (current==null){
      return null
    }
    if (current.data==value) { 
      return current;
    }
   
    // Value <>
    if (value < current.data) {
      return this.find(value, current.left); 
  } else { 
      return this.find(value, current.right); 
  }
}
  delete(value){
    const nodeToDelete = this.find(value); 
  if (nodeToDelete === null) return false; 


  // Case 1: Node with out children's
  if (nodeToDelete.left === null && nodeToDelete.right === null) {
    this.deleteParent(value,nodeToDelete);
    return true;
  }
  //  Case 2: Node with one children
  if ((nodeToDelete.left === null && nodeToDelete.right !== null) ||
        (nodeToDelete.right === null && nodeToDelete.left !== null)) {
    const childNode = nodeToDelete.left || nodeToDelete.right; // Hijo no nulo
    this.deleteParent(value,nodeToDelete,childNode);
  }
  // Case 3: Node with two Children's
  if (nodeToDelete.right,nodeToDelete.left !==null){

    const childRightNode= nodeToDelete.right;
    const childLeftNode= nodeToDelete.left;

    if (childRightNode.value>childLeftNode.value){
      childRightNode.right=childLeftNode;
      this.deleteParent(value,nodeToDelete,childRightNode);
    } else{
      childLeftNode.right=childRightNode;
      this.deleteParent(value,nodeToDelete,childLeftNode);
    }
    
  }
  return false;
    
  }
  findParent(value, current = this.root) {
    // C. Base: si el árbol está vacío o es el nodo raíz
    if (current === null || current.left === null && current.right === null) {
      return null;
    }
  
    // Si el nodo actual es padre del nodo buscado
    if ((current.left && current.left.data === value) || 
        (current.right && current.right.data === value)) {
      return current;
    }
  
    // Buscar recursivamente en la izquierda o derecha según el valor
    if (value < current.data) {
      return this.findParent(value, current.left);
    } else {
      return this.findParent(value, current.right);
    }
  }
  deleteParent(value, nodeToDelete, Child=null){
    const parent = this.findParent(value); // Encuentra el padre del nodo a eliminar
    if (parent){
      if (parent.left === nodeToDelete) {
        parent.left = Child;
      } else if (parent.right === nodeToDelete) {
        parent.right = Child;
      }
    }else{
      this.root = Child;
    }
    console.log(`Nodo ${value} eliminado. Hijo asignado: ${Child ? Child.data : "ninguno"}`);
  }
  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Se requiere un callback para ejecutar levelOrder.");
    }
    const queque=[];
    if (this.root) queque.push(this.root);
    while(queque.length>0){
        const currentNode= queque.shift();
        callback(currentNode);
        if (currentNode.left) queque.push(currentNode.left);
        if (currentNode.right) queque.push(currentNode.right);
    }
}
//recursion
  preOrder(callback,node=this.root) {
    if (typeof callback !== "function") {
      throw new Error("Se requiere un callback para ejecutar levelOrder.");
    }
    if (node === null) return;
    callback(node);
    this.preOrder(callback,node.left);
    this.preOrder(callback,node.right);
  }
  inOrder(callback,node=this.root){
    if (typeof callback !== "function") {
      throw new Error("Se requiere un callback para ejecutar levelOrder.");
    }
    if (node === null) return;
    this.inOrder(callback,node.left);
    callback(node);
    this.inOrder(callback,node.right);
  }
  postOrder(callback,node=this.root){
    if (typeof callback !== "function") {
      throw new Error("Se requiere un callback para ejecutar levelOrder.");
    }
    if (node === null) return;
    this.inOrder(callback,node.left);
    this.inOrder(callback,node.right);
    callback(node);
  }
  depth(value,current=this.root,level=0){
    //C. Base
    if (current==null){
      return -1
    }
    if (current.data==value) { 
      return level;
    }
   
    // Value <>
    if (value < current.data) {
      return this.depth(value, current.left,level+1); 
  } else { 
      return this.depth(value, current.right,level+1); 
  }
}
height(node) {
  // Caso base: un nodo inexistente tiene altura -1
  if (node === null || node === undefined) {
    return -1;
  }

  // Calcular la altura de los hijos izquierdo y derecho
  const leftHeight = this.height(node.left);
  const rightHeight = this.height(node.right);

  // La altura del nodo actual es 1 + la altura máxima de sus hijos
  return 1 + Math.max(leftHeight, rightHeight);
}

//balanced= heighR(tree)-highL(tree)
isBalanced(node = this.root) {
  // Función auxiliar para calcular la altura y verificar balance
  const checkHeight = (node) => {
    if (node === null) return 0; // Caso base: un nodo nulo tiene altura 0

    // Calcular la altura de los subárboles izquierdo y derecho
    const leftHeight = checkHeight(node.left);
    const rightHeight = checkHeight(node.right);

    // Si cualquiera de los subárboles está desequilibrado, propaga -1
    if (leftHeight === -1 || rightHeight === -1) return -1;

    // Verificar si el nodo actual está balanceado
    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    // Si está balanceado, devolver la altura del nodo actual
    return Math.max(leftHeight, rightHeight) + 1;
  };

  // Llamada inicial: si devuelve -1, no está balanceado
  return checkHeight(node) !== -1;
}

rebalancedTree(){
  const values = []; // Array para almacenar los valores

  const collectValues = (data) => values.push(data.data);

  // Llamar a inOrder con el callback
  this.inOrder(collectValues, this.root);

  // Reconstruir el árbol balanceado
  this.root = this.buildTree(values);
 }
 
}