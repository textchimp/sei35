
const traverseDOM = node => {

  // Iterative version: use a while loop!
  // - the function starts by getting node.children,
  //   adding it to an array of nodes to visit,
  //   then looping over the array, printing out the details
  //   of each node as it *removes* the node from the array (nodeName, className)
  // 6-8 lines?

};


const traverseDOMRecursive = node => {

  // Print the current node details (nodeName, className), and then
  // loop through all of node.children nodes, and
  // call the function recursively with each of the children.
  // 4 lines max!!
};

traverseDOM( document.body );
