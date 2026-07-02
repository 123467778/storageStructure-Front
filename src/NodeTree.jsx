import { useState } from "react";
import AllInboxIcon from "@mui/icons-material/AllInbox";

export default function NodeTree({
    node,
    selectedNodeId,
    setSelectedNodeId,
    hierarchicalName,
    editable,   
}) {
    const [open, setOpen] = useState(true);

 const hasChildren = node.children && node.children.length > 0; 


  
  const handleAdd = ()=>{
    alert("child added..");
    console.log("node",node);
  };
    
  


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

                
            </div>

                    {selectedNodeId === node.id && editable && (
                   <button
                        onClick={handleAdd}
                    >
                        + 
                    </button>
                )}
 



            {open &&
                hasChildren &&
                node.children.map((child) => (
                    <NodeTree
                        key={child.id}
                        node={child}
                        selectedNodeId={selectedNodeId}
                        setSelectedNodeId={setSelectedNodeId}
                        
                        
                            editable={editable}

                    />
                ))}

        </div>
    );
}

