import { useState } from "react";

const MenuItem = ({ item, onSelect }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) setOpen(!open);
    else onSelect(item); 
  };

  return (
    <div className="ml-2">
      <div
        onClick={handleClick}
        className="flex items-center justify-between cursor-pointer px-3 py-2 hover:bg-gray-700 rounded transition-colors select-none"
      >
        <span className="text-gray-100 font-medium">{item.title}</span>
        {hasChildren && (
          <span className="text-gray-400 text-sm">{open ? "▼" : "▶"}</span>
        )}
      </div>

      {hasChildren && open && (
        <div className="ml-4 border-l border-gray-600 pl-2 mt-1">
          {item.children.map((child, index) => (
            <MenuItem key={index} item={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
