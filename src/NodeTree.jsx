import { useState } from "react";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { Button } from "@progress/kendo-react-buttons";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

export default function NodeTree({
    node,
    selectedNodeId,
    setSelectedNodeId,
    editable,
    tree,
    setTree,
    selectedContainerName,
    editNode,
    onEditNode
}) {
    const [open, setOpen] = useState(true);

    const hasChildren = node.children && node.children.length > 0;

    const handleSelect = () => {
        setSelectedNodeId(node.id);
    };

    const editCurrentNode = async (e) => {
        e.stopPropagation();

        const newName = prompt("Enter new Name");
        if (!newName) return;

        const updatedTree = editNode(tree, node.id, newName);

        setTree(updatedTree);
        // onEditNode(node.id, newName);

        if (!selectedContainerName) {
    console.error("Container name not foumd");
    return;
}

        try {
            await axios.put(
                `http://localhost:8081/structure/editNode/${selectedContainerName}`,
                {
                    nodedata: {
                        tree: updatedTree
                    }
                }
            );

            alert("Node updated successfully");
        } catch (err) {
            console.log(err);
            alert("Update failed");
        }
    };

    return (
        <div style={{ marginLeft: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8,     fontFamily: "IBM Plex Mono, monospace",fontSize:"17px"}}>

                <span
                    onClick={() => hasChildren && setOpen(!open)}
                    style={{ cursor: hasChildren ? "pointer" : "default" }}
                >
                    {hasChildren ? (open ? <i class="bi bi-caret-down-fill"></i> : <i class="bi bi-caret-right"></i>) :<i className="bi bi-box-seam"></i>}
                  

                </span>

                <span onClick={handleSelect} style={{ cursor: "pointer" }}>
                    {node.name}
                </span>

                {selectedNodeId === node.id && editable && (
                    <>
                        <Button onClick={editCurrentNode}>
                            <EditIcon />
                        </Button>

                        <Button onClick={(e) => e.stopPropagation()}>
                            <AddIcon />
                        </Button>
                    </>
                )}
            </div>

            {open &&
                hasChildren &&
                node.children.map((child) => (
                    <NodeTree
                        key={child.id}
                        node={child}
                        tree={tree}
                        setTree={setTree}
                        selectedNodeId={selectedNodeId}
                        setSelectedNodeId={setSelectedNodeId}
                        editable={editable}
                        selectedContainerName={selectedContainerName}
                        editNode={editNode}
                        onEditNode={onEditNode}
                    />
                ))}
        </div>
    );
}







