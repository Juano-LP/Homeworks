class Grafo {
  constructor() {
    this.nodos = new Map();
    this.adjList = new Map();
  }
  agregarNodo(valor) {
    const nodo = { valor };
    this.nodos.set(valor, nodo);
    this.adjList.set(valor, []);
  }
  addEdge(nodo1, nodo2) {
    this.adjList.get(nodo1).push(nodo2);
    this.adjList.get(nodo2).push(nodo1); // Para grafo no dirigido
  }
  searchNode(nodo) {
    if (!this.nodos.length) return null;
    return this.nodos.find(n => n == nodo);
  }
  printAdjacency(nodo) {
    if (this.searchNode(nodo)){
        console.log(this.adjList.get(nodo));
    }
    }
    printGrafo() {
        console.log(this.adjList);
    }

}