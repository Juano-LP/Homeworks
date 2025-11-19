import React, { useEffect, useState } from 'react'
import './styles.scss'
import CitiesPanel from './components/CitiesPanel'
import GreenZoneTree from './components/GreenZoneTree'
import GraphView from './components/GraphView'
import TreeView from './components/TreeView'
import { City, GreenZone } from './components/models'

const STORAGE_KEY = 'cities_data_v1'

function serializeZones(zones) {
  if (!zones) return [];
  return zones.map(z => ({ name: z.name, children: serializeZones(z.children) }));
}

function deserializeZones(arr) {
  if (!arr) return [];
  return arr.map(a => {
    const gz = new GreenZone(a.name);
    gz.children = deserializeZones(a.children || []);
    return gz;
  });
}

function serializeCities(cities) {
  return cities.map(c => ({ name: c.name, zones: serializeZones(c.zones) }));
}

function deserializeCities(data) {
  if (!data) return [];
  return data.map(d => {
    const c = new City(d.name);
    c.zones = deserializeZones(d.zones || []);
    return c;
  });
}

function App() {
  const [connectTarget, setConnectTarget] = useState('');
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      // support legacy array saved previously
      if (Array.isArray(parsed)) return deserializeCities(parsed);
      return deserializeCities(parsed.cities || []);
    } catch (e) {
      return [];
    }
  })

  const [adj, setAdj] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (parsed && parsed.adj) return parsed.adj;
      return {};
    } catch (e) { return {}; }
  });

  const [selectedCityName, setSelectedCityName] = useState(cities[0]?.name || null)

  useEffect(() => {
    const data = { cities: serializeCities(cities), adj };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [cities, adj]);

  function addCity(name) {
    if (cities.some(c => c.name === name)) return alert('City already exists');
    const c = new City(name);
    setCities(prev => [...prev, c]);
    setSelectedCityName(name);
    setAdj(prev => ({ ...prev, [name]: [] }));
  }

  function deleteCity(name) {
    const ok = confirm(`Delete city "${name}"?`);
    if (!ok) return;
    setCities(prev => prev.filter(c => c.name !== name));
    if (selectedCityName === name) setSelectedCityName(null);
    // remove from adjacency
    setAdj(prev => {
      const copy = { ...prev };
      delete copy[name];
      for (const k of Object.keys(copy)) {
        copy[k] = (copy[k] || []).filter(n => n !== name);
      }
      return copy;
    });
  }

  function selectCity(name) {
    setSelectedCityName(name);
  }

  function onCityChange(city) {
    // ensure state update to re-render and persist
    setCities(prev => prev.map(c => c.name === city.name ? city : c));
  }

  function addEdge(a, b) {
    if (!a || !b || a === b) return;
    setAdj(prev => {
      const copy = { ...prev };
      copy[a] = Array.from(new Set([...(copy[a]||[]), b]));
      copy[b] = Array.from(new Set([...(copy[b]||[]), a]));
      return copy;
    });
  }

  const selectedCity = cities.find(c => c.name === selectedCityName) || null;

  return (
    <div className="app-layout" style={{height: '100vh'}}>
      <div style={{flex:1, display:'flex', gap:24, padding:20}}>
        {/* Left column: Add cities then GreenZone editor */}
        <div style={{width:420, display:'flex', flexDirection:'column', gap:18, paddingRight:12}}>
          <div style={{width:'100%'}}>
            <CitiesPanel cities={cities} selectedCityName={selectedCityName} onAddCity={addCity} onDeleteCity={deleteCity} onSelectCity={selectCity} />
          </div>

          <div style={{flex:1, minHeight:0, borderRadius:8, background:'transparent', overflow:'auto', padding:16}}>
            <h3 style={{marginTop:0, marginBottom:8, fontSize:16}}>{selectedCity ? `${selectedCity.name} — Green Zones` : 'Green Zones'}</h3>
            <GreenZoneTree city={selectedCity} onCityChange={onCityChange} />
          </div>

          <div style={{padding:12, borderRadius:8}}>
            <h4 style={{margin:0, marginBottom:8}}>Connections & Stats</h4>
            {selectedCity ? (
              <div style={{marginTop:8}}>
                <div style={{marginBottom:8}}>
                  <strong>Neighbors:</strong>
                  <div style={{display:'inline-flex', gap:8, marginLeft:10, verticalAlign:'middle'}}>
                    {(adj[selectedCity.name] || []).length === 0 ? '—' : (adj[selectedCity.name] || []).map(n => (
                      <span key={n} className="chip">{n}</span>
                    ))}
                  </div>
                </div>

                <div className="connect-row">
                  <div className="connect-custom" tabIndex={0} onBlur={() => setTimeout(()=>setOpen(false), 150)}>
                    <div className="connect-display" onClick={() => setOpen(o => !o)}>
                      {connectTarget || 'Select city to connect...'}
                      <span className="connect-caret">▾</span>
                    </div>
                    {open && (
                      <div className="connect-dropdown">
                        {cities.filter(c => c.name !== selectedCity.name && !(adj[selectedCity.name]||[]).includes(c.name)).map(c => (
                          <div key={c.name} className="connect-option" onClick={() => { setConnectTarget(c.name); setOpen(false); }}>{c.name}</div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="connect-btn" onClick={() => {
                    if (!connectTarget) return alert('Choose a city to connect');
                    addEdge(selectedCity.name, connectTarget);
                    setConnectTarget('');
                  }}>Connect</button>
                </div>

                <div style={{marginTop:10}}>
                  <div><strong>Max Height:</strong> {selectedCity.maxHeight()}</div>
                  <div><strong>Total Zones:</strong> {selectedCity.totalZones()}</div>
                </div>
              </div>
            ) : (
              <div style={{marginTop:8}}>Select a city to see connections and stats</div>
            )}
          </div>
        </div>

        {/* Right column: Graph above, Visual Tree below (stacked) */}
        <div style={{flex:3, display:'flex', flexDirection:'column', gap:18, minWidth:600}}>
          <div className="graph-card" style={{height:520}}>
            <div className="svg-wrapper" style={{height:'100%'}}>
              <GraphView cities={cities} adj={adj} selected={selectedCityName} onSelect={selectCity} width={1400} height={520} />
            </div>
          </div>

          <div className="tree-card" style={{height:480}}>
            <h4 style={{marginTop:0, marginBottom:8}}>Visual Tree</h4>
            <div className="svg-wrapper" style={{height: 'calc(100% - 36px)'}}>
              <TreeView city={selectedCity} width={1200} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
