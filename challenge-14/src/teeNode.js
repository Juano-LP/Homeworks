const TreeNode = ({ node, onInsert}) => {
  if (!node) return null;
    return (
        <div className="node-container">
            <div className="node">
                {node.valor}
                <div>
                    <button onClick={() => onInsert(node, 'left')}>Insert Left</button>
                    <button onClick={() => onInsert(node, 'right')}>Insert Right</button>
                </div>
            </div>
            <div className="children">
                <TreeNode node={node.left} onInsert={onInsert} />
                <TreeNode node={node.right} onInsert={onInsert} />
            </div>
        </div>
    );
}
export default TreeNode;