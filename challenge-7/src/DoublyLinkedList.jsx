class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  } 
}
export class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
    }
    insert(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = this.tail = this.current = newNode;
            return;
        }
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }
    forward() {
        if (this.current && this.current.next) {
            this.current = this.current.next;
        }
        return this.current ? this.current.value : null;
    }
    back() {
        if (this.current && this.current.prev) {
            this.current = this.current.prev;
        }
        return this.current ? this.current.value : null;
    }
}

export const browserHistory = new DoublyLinkedList();
browserHistory.insert("google.com");
browserHistory.insert("youtube.com");
browserHistory.insert("github.com");
browserHistory.insert("stackoverflow.com");
browserHistory.insert("linkedin.com");
browserHistory.insert("twitter.com");
browserHistory.insert("facebook.com");  