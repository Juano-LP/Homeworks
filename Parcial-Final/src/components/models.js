export class GreenZone {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
  }

  editName(newName) {
    this.name = newName;
  }

  // Height of this node: 1 for the node itself, plus max child height
  height() {
    if (!this.children || this.children.length === 0) return 1;
    let maxChild = 0;
    for (const c of this.children) {
      const h = c.height();
      if (h > maxChild) maxChild = h;
    }
    return 1 + maxChild;
  }

  // Count nodes in this subtree (including this)
  count() {
    let total = 1;
    for (const c of this.children) total += c.count();
    return total;
  }
}

export class City {
  constructor(name) {
    this.name = name;
    // root green zones (forest of zone trees)
    this.zones = [];
  }

  addRootZone(zone) {
    this.zones.push(zone);
  }

  // For stats: max height across root zones, and total zone count
  maxHeight() {
    if (!this.zones || this.zones.length === 0) return 0;
    let maxH = 0;
    for (const z of this.zones) {
      const h = z.height();
      if (h > maxH) maxH = h;
    }
    return maxH;
  }

  totalZones() {
    if (!this.zones || this.zones.length === 0) return 0;
    let total = 0;
    for (const z of this.zones) total += z.count();
    return total;
  }
}
