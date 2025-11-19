import React, { useRef, useState } from 'react';

function circleLayout(n, w, h, radiusRatio = 0.35) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * radiusRatio;
  const positions = [];
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2;
    positions.push({ x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r });
  }
  return positions;
}

export default function GraphView({ cities = [], adj = {}, selected, onSelect, width = 600, height = 300 }) {
  const n = cities.length;
  const idToIndex = {};
  cities.forEach((c, i) => idToIndex[c.name] = i);
  const pos = circleLayout(n, width, height, 0.35);

  const edges = [];
  for (const a of Object.keys(adj || {})) {
    const neighbors = adj[a] || [];
    for (const b of neighbors) {
      const ia = idToIndex[a];
      const ib = idToIndex[b];
      if (ia == null || ib == null) continue;
      if (ia < ib) edges.push([ia, ib]);
    }
  }

  function nodeRadius(name, isSelected) {
    const base = 10;
    const extra = Math.min(14, Math.max(0, name.length * 2));
    return isSelected ? base + extra + 6 : base + extra;
  }

  function fontSizeForName(name) {
    if (name.length <= 6) return 12;
    if (name.length <= 10) return 10;
    return 8;
  }

  // pan / zoom state
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [scale, setScale] = useState(1);
  const svgRef = useRef(null);
  const dragging = useRef(false);
  const lastPos = useRef([0, 0]);


  function onWheel(e) {
    e.preventDefault();
    const delta = -e.deltaY;
    const factor = delta > 0 ? 1.1 : 0.9;
    const newScale = Math.max(0.2, Math.min(4, scale * factor));
    // zoom to mouse position (approx)
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
      <svg ref={svgRef} onWheel={onWheel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} width="100%" viewBox={`0 0 ${width} ${height}`} className="svg-card-dark" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>
        <g transform={`translate(${tx},${ty}) scale(${scale})`}>
          {edges.map(([ia, ib], idx) => (
            <line key={idx} x1={pos[ia].x} y1={pos[ia].y} x2={pos[ib].x} y2={pos[ib].y} stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
          ))}

          {cities.map((c, i) => {
            const p = pos[i] || { x: 50 + i * 30, y: 50 };
            const isSel = selected === c.name;
            const r = nodeRadius(c.name, isSel);
            const fs = fontSizeForName(c.name);
            const fill = isSel ? '#2b8aef' : '#66c2a5';
            return (
              <g key={c.name} transform={`translate(${p.x},${p.y})`} style={{cursor:'pointer'}} onClick={() => onSelect && onSelect(c.name)}>
                  <circle r={r} fill={fill} stroke="#1f1f1f" strokeWidth={1} filter="url(#shadow)" />
                  <text x={0} y={fs/3} fontSize={fs} textAnchor="middle" fill="#fff" style={{pointerEvents:'none', paintOrder: 'stroke fill', stroke:'#000', strokeWidth:0.8}}>{c.name}</text>
                </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
