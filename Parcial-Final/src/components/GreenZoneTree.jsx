import React, { useState } from 'react';
import { GreenZone } from './models';

export default function GreenZoneTree({ city, onCityChange }) {
  const [newRootName, setNewRootName] = useState('');

  if (!city) return <div style={{padding:12}}>Select a city to manage green zones.</div>;

  // Helpers to collect zones with their path labels, detect descendants, remove and move
  function collectZones(zones, prefix = '') {
    const out = [];
    for (const z of zones) {
      const path = prefix ? `${prefix} / ${z.name}` : z.name;
      out.push({ zone: z, path });
      if (z.children && z.children.length) out.push(...collectZones(z.children, path));
    }
    return out;
  }

  function isDescendant(root, target) {
    if (!root || !root.children) return false;
    if (root.children.includes(target)) return true;
    for (const c of root.children) if (isDescendant(c, target)) return true;
    return false;
  }

  function removeZoneFromList(list, target) {
    const idx = list.indexOf(target);
    if (idx !== -1) { list.splice(idx, 1); return true; }
    for (const z of list) {
      if (z.children && removeZoneFromList(z.children, target)) return true;
    }
    return false;
  }

  function moveZone(zone, newParent) {
    // remove from wherever it currently is
    removeZoneFromList(city.zones, zone);
    // insert into new parent or as root
    if (!newParent) {
      city.zones = city.zones || [];
      city.zones.push(zone);
    } else {
      newParent.children = newParent.children || [];
      newParent.children.push(zone);
    }
    onCityChange && onCityChange(city);
  }

  function addRoot() {
    const name = newRootName.trim();
    if (!name) return;
    const gz = new GreenZone(name);
    if (typeof city.addRootZone === 'function') city.addRootZone(gz);
    else {
      city.zones = city.zones || [];
      city.zones.push(gz);
    }
    setNewRootName('');
    onCityChange && onCityChange(city);
  }

  // Render a node recursively
  function ZoneNode({ zone }) {
    const [expanded, setExpanded] = useState(true);
    const [adding, setAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [editing, setEditing] = useState(false);
    const [editNameVal, setEditNameVal] = useState(zone.name);
    const [moving, setMoving] = useState(false);
    const [selectedParentIdx, setSelectedParentIdx] = useState(-1);

    function addChild() {
      const name = newName.trim();
      if (!name) return;
      const child = new GreenZone(name);
      if (typeof zone.addChild === 'function') zone.addChild(child);
      else zone.children = zone.children || [], zone.children.push(child);
      setNewName('');
      setAdding(false);
      onCityChange && onCityChange(city);
    }

    function saveEdit() {
      const nm = editNameVal.trim();
      if (!nm) return;
      if (typeof zone.editName === 'function') zone.editName(nm);
      else zone.name = nm;
      setEditing(false);
      onCityChange && onCityChange(city);
    }

    function startMove() {
      // build options excluding this zone and its descendants
      const all = collectZones(city.zones).filter(o => o.zone !== zone && !isDescendant(zone, o.zone));
      // find current parent
      let parent = null;
      function findParent(list) {
        for (const z of list) {
          if (z.children && z.children.includes(zone)) return z;
          const r = findParent(z.children || []);
          if (r) return r;
        }
        return null;
      }
      parent = findParent(city.zones);
      const idx = parent ? all.findIndex(a => a.zone === parent) : -1;
      setSelectedParentIdx(idx);
      setMoving(true);
    }

    return (
      <div style={{marginLeft: 12, borderLeft: '2px dashed rgba(255,255,255,0.06)', paddingLeft:12, marginTop:10}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <button onClick={()=>setExpanded(e=>!e)} style={{width:30, height:30, borderRadius:6}}>{expanded? '▾':'▸'}</button>
          {editing ? (
            <>
              <input value={editNameVal} onChange={e=>setEditNameVal(e.target.value)} style={{padding:'8px 10px', borderRadius:6, minWidth:160}} />
              <button onClick={saveEdit} style={{padding:'6px 10px', borderRadius:6}}>Save</button>
              <button onClick={()=>{ setEditing(false); setEditNameVal(zone.name); }} style={{padding:'6px 10px', borderRadius:6}}>Cancel</button>
            </>
          ) : (
            <>
              <span style={{fontWeight:600}}>{zone.name}</span>
              <button onClick={()=>{ setEditing(true); setEditNameVal(zone.name); }} style={{padding:'6px 10px', borderRadius:6}}>Edit</button>
              <button onClick={()=>setAdding(a=>!a)} style={{padding:'6px 10px', borderRadius:6}}>Add Subzone</button>
              <button onClick={startMove} style={{padding:'6px 10px', borderRadius:6}}>Move</button>
            </>
          )}
        </div>

        {adding && (
          <div style={{marginTop:8, display:'flex', gap:8}}>
            <input placeholder="Subzone name" value={newName} onChange={e=>setNewName(e.target.value)} style={{flex:1, padding:'8px 10px', borderRadius:6}} />
            <button onClick={addChild} style={{padding:'6px 10px', borderRadius:6}}>Add</button>
            <button onClick={()=>setAdding(false)} style={{padding:'6px 10px', borderRadius:6}}>Cancel</button>
          </div>
        )}

        {moving && (
          <div style={{marginTop:8, display:'flex', gap:8, alignItems:'center'}}>
            <select value={selectedParentIdx} onChange={e=>setSelectedParentIdx(parseInt(e.target.value, 10))} style={{padding:'8px 10px', borderRadius:6}}>
              <option value={-1}>(root)</option>
              {collectZones(city.zones).filter(o => o.zone !== zone && !isDescendant(zone, o.zone)).map((o, idx) => (
                <option key={idx} value={idx}>{o.path}</option>
              ))}
            </select>
            <button onClick={() => {
              const opts = collectZones(city.zones).filter(o => o.zone !== zone && !isDescendant(zone, o.zone));
              const parent = selectedParentIdx === -1 ? null : opts[selectedParentIdx].zone;
              moveZone(zone, parent);
              setMoving(false);
            }} style={{padding:'6px 10px', borderRadius:6}}>Confirm Move</button>
            <button onClick={()=>setMoving(false)} style={{padding:'6px 10px', borderRadius:6}}>Cancel</button>
          </div>
        )}

        {expanded && zone.children && zone.children.length>0 && (
          <div style={{marginTop:10}}>
            {zone.children.map((ch, idx) => <ZoneNode key={idx + ch.name} zone={ch} />)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{padding:12, flex:1}}>
      <h3 style={{marginTop:0}}>{city.name} — Green Zones</h3>

      <div className="root-zone-add">
        <input className="root-zone-input" placeholder="New root zone" value={newRootName} onChange={e=>setNewRootName(e.target.value)} />
        <button className="root-zone-btn" onClick={addRoot}>Add Root Zone</button>
      </div>

      <div>
        {(!city.zones || city.zones.length===0) ? (
          <div style={{color:'#999'}}>No green zones yet.</div>
        ) : (
          city.zones.map((z, i) => <ZoneNode key={i + z.name} zone={z} />)
        )}
      </div>
    </div>
  );
}
