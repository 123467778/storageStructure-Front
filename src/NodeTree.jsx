import { useState } from "react";
import AllInboxIcon from "@mui/icons-material/AllInbox";

export default function NodeTree({
    node,
    selectedNodeId,
    setSelectedNodeId,
    hierarchicalName,
    editable,  
    tree,setTree, 
    editNode
}) {
    const [open, setOpen] = useState(true);

    

 const hasChildren = node.children && node.children.length > 0; 


  
  const handleAdd = ()=>{
    alert("child added..");
    console.log("node",node);
  };
    
  const editCurrentNode =()=>{

    const newName = prompt("Enter new Name");

    if(!newName){
        return;
    }

     setTree(prev =>
            editNode(prev, node.id, newName)
        );

  
  }


    return (
        <div style={{ marginLeft: "20px" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

                <span
                    onClick={(e) => {
                        // e.stopPropagation();
                        if (hasChildren) setOpen(!open);
                    }}
                    style={{
                        width: "20px",
                        cursor: hasChildren ? "pointer" : "default"
                    }}
                >
                    {hasChildren ? (open ? "▼" : "▶") : <AllInboxIcon />}
                </span>

                <span
                    onClick={(e) => {
                        setSelectedNodeId(node.id);
                        console.log("Id",selectedNodeId);
                    }}
                    style={{
                        cursor: "pointer",
                        
                    }}
                >
                    {node.name}
                </span>

                
           

                    {selectedNodeId === node.id && editable && (
                   <button
                        onClick={editCurrentNode}
                    >
                        edit 
                    </button>
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
                          editNode={editNode}
                        
                            editable={editable}

                    />
                ))}

        </div>
    );
}

