// import { useState } from "react";
// import AllInboxIcon from '@mui/icons-material/AllInbox';
// import { Button } from "@progress/kendo-react-buttons";

// export default function NodeTree({ node}) {
//     const [open, setOpen] = useState(false);

//     // console.log("Node",node);
//     return (
//         <div style={{ marginLeft: 20 }}>

//               {/* clickable row for each node */}
//             <div
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setOpen(!open)}
//             >

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

//                     <NodeTree                    
//                         key={child.id}
//                         node={child}
//                     />


//                 ))}
//         </div>
//     );
// }



import { useState } from "react";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@progress/kendo-react-buttons";


export default function NodeTree({
    node,
    selectedNodeId,
    setSelectedNodeId,
    hierarchicalName,
    loadTree
}) {
    const [open, setOpen] = useState(false);

    const hasChildren = node.children && node.children.length > 0;


    const handleAdd = (node) => {

       


      
        console.log(node.id);
        console.log(hierarchicalName);
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

                {/* Show button only for selected node
                {selectedNodeId === node.id && (
                    <>
                        <Button onClick={() => { handleAdd(node) } } style={{ color: "rgb(35, 122, 253)" }}>
                            <AddIcon/>
                        </Button>
                        <Button onClick={() => { handleAdd(node, hierarchicalName) }} style={{ color: "rgb(35, 122, 253)" }}>
                            <EditIcon/>
                        </Button>
                        <Button onClick={() => { handleAdd(node, hierarchicalName) }} style={{ color: "rgb(35, 122, 253)" }}>
                            <DeleteIcon/>
                        </Button>
                       
                        





                    </>
                )} */}

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
                        hierarchicalName={hierarchicalName}
                        loadTree={loadTree}
                    />
                ))}
        </div>
    );
}