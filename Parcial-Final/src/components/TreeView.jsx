import React, { useRef, useState } from 'react';

function layoutForest(roots, levelHeight = 70, nodeWidth = 100) {
  let nextX = 0;
  const items = [];

  function dfs(node, depth) {
    const item = { node, depth, children: [] };
    items.push(item);
    if (!node.children || node.children.length === 0) {
      item.x = nextX * nodeWidth + nodeWidth / 2;
      nextX++;
    } else {
      const childItems = [];
      for (const ch of node.children) {
        const ci = dfs(ch, depth + 1);
        childItems.push(ci);
      }
      const minX = childItems[0].x;
      const maxX = childItems[childItems.length - 1].x;
      item.x = (minX + maxX) / 2;
    }
    item.y = depth * levelHeight + 20;
    return item;
  }

  for (const r of roots) dfs(r, 0);
  return items;
}

export default function TreeView({ city, width = 600, height = 480 }) {
  const zones = (city && city.zones) || [];

  // increase spacing between levels and columns for readability
  const items = layoutForest(zones, 110, 160);
  const nodeByRef = new Map();
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const it of items) {
    nodeByRef.set(it.node, it);
    if (it.x < minX) minX = it.x;
    if (it.x > maxX) maxX = it.x;
    if (it.y < minY) minY = it.y;
    if (it.y > maxY) maxY = it.y;
  }

  if (minX === Infinity) {
    minX = 0; maxX = width; minY = 0; maxY = height;
  }

  const contentW = Math.max(1, maxX - minX + 80);
  const contentH = Math.max(240, maxY - minY + 100);

  // initial pan/zoom state computed from content bounds — fit to both width and height
  const margin = 40;
  const initialFit = (() => {
    if (!isFinite(minX)) return { fitScale: 1, initTx: 0, initTy: 0 };
    const scaleByWidth = (width - margin) / contentW;
    const scaleByHeight = (height - margin) / contentH;
    const fitScale = Math.min(1, scaleByWidth, scaleByHeight);
    const centerX = (minX + maxX) / 2;
    const initTx = width / 2 - centerX * fitScale;
    // center vertically inside available height
    const contentHeightScaled = contentH * fitScale;
    const initTy = (height - contentHeightScaled) / 2 - minY * fitScale;
    return { fitScale, initTx, initTy };
  })();

  const svgRef = useRef(null);
  const [tx, setTx] = useState(initialFit.initTx);
  const [ty, setTy] = useState(initialFit.initTy);
  const [scale, setScale] = useState(initialFit.fitScale);
  const dragging = useRef(false);
  const lastPos = useRef([0,0]);

  function nodeRadius(name) {
    const base = 18;
    const extra = Math.min(18, Math.max(0, name.length - 6));
    return base + extra;
  }

  function fontSizeForName(name) {
    if (name.length <= 8) return 14;
    if (name.length <= 14) return 12;
    return 10;
  }

  function onWheel(e) {
    e.preventDefault();
    const delta = -e.deltaY;
    const factor = delta > 0 ? 1.08 : 0.92;
    const newScale = Math.max(0.2, Math.min(4, scale * factor));
    // zoom to mouse
    const rect = svgRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const sx = (mx - tx) / scale;
    const sy = (my - ty) / scale;
    const newTx = mx - sx * newScale;
    const newTy = my - sy * newScale;
    setScale(newScale);
    setTx(newTx);
    setTy(newTy);
  }

  function onPointerDown(e) {
    dragging.current = true;
    lastPos.current = [e.clientX, e.clientY];
    svgRef.current.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!dragging.current) return;
    const [lx, ly] = lastPos.current;
    const dx = e.clientX - lx;
    const dy = e.clientY - ly;
    setTx(t => t + dx);
    setTy(t => t + dy);
    lastPos.current = [e.clientX, e.clientY];
  }

  function onPointerUp(e) {
    dragging.current = false;
    try {
      svgRef.current.releasePointerCapture(e.pointerId);
    } catch (err) {
      console.debug('releasePointerCapture failed', err);
    }
  }

  return (
    <div className="svg-wrapper">
      <svg ref={svgRef} onWheel={onWheel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} width="100%" viewBox={`0 0 ${width} ${contentH}`} className="svg-card-dark" preserveAspectRatio="xMidYMid meet">
        <g transform={`translate(${tx},${ty}) scale(${scale})`}>
          {/* draw links: for each item, draw lines to its children */}
          {items.map((it, idx) => (
            it.node.children && it.node.children.map((ch, cidx) => {
              const childItem = nodeByRef.get(ch);
              if (!childItem) return null;
              return <line key={`${idx}-${cidx}`} x1={it.x} y1={it.y + nodeRadius(it.node.name)} x2={childItem.x} y2={childItem.y - nodeRadius(childItem.node.name)} stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />;
            })
          ))}

          {/* draw nodes */}
          {items.map((it, idx) => (
            <g key={idx} transform={`translate(${it.x},${it.y})`}>
              <circle r={nodeRadius(it.node.name)} fill="#66c2a5" stroke="#0b0f12" strokeWidth={1.5} />
                <text x={0} y={6} fontSize={fontSizeForName(it.node.name)} textAnchor="middle" fill="#fff" style={{paintOrder: 'stroke fill', stroke:'#000', strokeWidth:1}}>{it.node.name}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
