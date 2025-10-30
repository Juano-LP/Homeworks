import MenuItem from "./MenuItem";
import { menuTree } from "./MenuTree";

const Sidebar = ({ onSelect }) => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 p-4 shadow-lg border-r border-gray-700">
      <h2 className="text-gray-100 text-2xl mb-5 font-semibold tracking-wide">
        Menu
      </h2>
      <div className="space-y-1">
        {menuTree.map((item, index) => (
          <MenuItem key={index} item={item} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

