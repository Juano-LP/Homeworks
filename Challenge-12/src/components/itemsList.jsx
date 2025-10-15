// components/ItemList.jsx
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, deleteItem, updateItem } from "../store/itemsSlice";
import { useEffect } from "react";

export default function ItemList() {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDelete = (id) => dispatch(deleteItem(id));

  const handleUpdate = (id) => {
    const newData = { name: prompt("Nuevo nombre:") };
    dispatch(updateItem({ id, data: newData }));
  };

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {list.map(item => (
          <li key={item.id}>
            {item.name}{" "}
            <button onClick={() => handleUpdate(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
