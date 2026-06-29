// import { useState } from "react";
// import AllInboxIcon from '@mui/icons-material/AllInbox';
// import { Button } from "@progress/kendo-react-buttons";

// export default function NodeTree({ node ,selectedNodeId,setSelectedNodeId}) {
//     const [open, setOpen] = useState(false);

//     const handleAddChild=()=>{
//         alert("Child added ");
//     }




//     // console.log("Node",node);
//     return (
//         <div style={{ marginLeft: 20 }}>
            
//               {/* clickable row for each node */}
//             <div
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setOpen(!open)}
               
//             >



//             <div onClick={() => setSelectedNodeId(node.id)}>
//     {node.nodeName}
// </div>

// {selectedNodeId === node.id && (
//     <div style={{ marginLeft: "25px", marginTop: "5px" }}>
//         <button onClick={handleAddChild}>
//             Add Child
//         </button>
//     </div>
// )}
 


                
//                 {node.children.length > 0
//                     ? open
//                         ? "▼"                          
//                         : "▶"   
//                     :<AllInboxIcon/>}{" "} 
                    
//                 {node.name}
//             </div>

//             {/* 
//                 RENDER CHILDREN ONLY IF OPEN
//                 (this is what makes tree expandable)
//             */}
//             {open &&
//                 node.children.map((child) => (
//                     <>
//                     <NodeTree                    
//                         key={child.id}
//                         node={child}
//                     />
//                     </>

//                 ))}
//         </div>
//     );
// }


import { useState } from "react";
import AllInboxIcon from "@mui/icons-material/AllInbox";

export default function NodeTree({
    node,
    selectedNodeId,
    setSelectedNodeId
}) {
    const [open, setOpen] = useState(false);

    const hasChildren = node.children && node.children.length > 0;

    const handleAddChild = (e) => {
        e.stopPropagation();
        alert("Add Child to " + node.name);
    };

    return (
        <div style={{ marginLeft: "20px" }}>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                }}
            >

                {/* Expand / Collapse */}
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        if (hasChildren) {
                            setOpen(!open);
                        }
                    }}
                    style={{
                        width: "20px",
                        cursor: hasChildren ? "pointer" : "default"
                    }}
                >
                    {hasChildren
                        ? (open ? "▼" : "▶")
                        : <AllInboxIcon fontSize="small" />
                    }
                </span>

                {/* Node Name */}
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNodeId(node.id);
                    }}
                    style={{
                        cursor: "pointer",
                        fontWeight:
                            selectedNodeId === node.id ? "bold" : "normal"
                    }}
                >
                    {node.name}
                </span>

                {/* Show button only for selected node */}
                {selectedNodeId === node.id && (
                   <>
                    <button
                        onClick={handleAddChild}
                    >
                        + 
                    </button>
                    <button
                        onClick={handleAddChild}
                    >
                        + 
                    </button>
                     <button
                        onClick={handleAddChild}
                    >
                        + 
                    </button>
                    <button
                        onClick={handleAddChild}
                    >
                        + 
                    </button>
                     
                   
                   </>
                )}

            </div>

            {/* Children */}
            {open &&
                hasChildren &&
                node.children.map((child) => (
                    <NodeTree
                        key={child.id}
                        node={child}
                        selectedNodeId={selectedNodeId}
                        setSelectedNodeId={setSelectedNodeId}
                    />
                ))}
        </div>
    );
}