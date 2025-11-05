export class Graph {
    constructor() {
        this.nodes = [];
        this.adjList = {};
    }

    addNode(node) {
        if (!this.nodes.includes(node)) {
            this.nodes.push(node);
            this.adjList[node] = [];
        }
    }

    addEdge(node1, node2) {
        if (!this.adjList[node1] || !this.adjList[node2]) return;
        this.adjList[node1].push(node2);
        this.adjList[node2].push(node1);
    }

    searchNode(node) {
        return this.nodes.find(n => n === node);
    }

    printAdjacencyList(node) {
        if (this.searchNode(node)) console.log(this.adjList[node]);
    }

    printGraph() {
        console.log(this.adjList);
    }
}
