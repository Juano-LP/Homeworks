class node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }   
}
export class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(value) {
        const newNode = new node(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
    traverse() {
        let current = this.head;
        const values = [];
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        return values;
    }
}

export const songsList = new LinkedList();
songsList.insert("Song 1");
songsList.insert("Song 2");
songsList.insert("Song 3");
songsList.insert("Song 4");
songsList.insert("Song 5");