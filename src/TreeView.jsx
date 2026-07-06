import { useEffect, useState } from "react";
import NodeTree from "./NodeTree";

function updateTree(nodes, nodeId, callback) {
    return nodes.map((node) => {
        if (node.id === nodeId) {
            return callback(node);
        }

        return {
            ...node,
            children: node.children
                ? updateTree(node.children, nodeId, callback)
                : []
        };
    });
}

export function editNode(nodes, nodeId, newName) {
    return updateTree(nodes, nodeId, (node) => ({
        ...node,
        name: newName
    }));
}

 function TreeView({
    data,
    editable,
    selectedContainerName
}) {
    const [tree, setTree] = useState([]);
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    useEffect(() => {
        setTree(data || []);
    }, [data]);

    const handleEdit = (id, newName) => {
        setTree((prev) => editNode(prev, id, newName));
    };

    return (
        <div>
            {tree.map((node) => (
                <NodeTree
                    key={node.id}
                    node={node}
                    tree={tree}
                    setTree={setTree}
                    selectedNodeId={selectedNodeId}
                    setSelectedNodeId={setSelectedNodeId}
                    editable={editable}
                    selectedContainerName={selectedContainerName}
                    editNode={editNode}
                    onEditNode={handleEdit}
                />
            ))}
        </div>
    );
}

export default TreeView;





