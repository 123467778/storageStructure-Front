// import { useState } from "react";
// // // import AllInboxIcon from '@mui/icons-material/AllInbox';
// // // import { Button } from "@progress/kendo-react-buttons";
// // <<<<<<< HEAD

// // // export default function NodeTree({ node}) {
// // //     const [open, setOpen] = useState(false);

// // //     // console.log("Node",node);
// // //     return (
// // //         <div style={{ marginLeft: 20 }}>

// // //               {/* clickable row for each node */}
// // //             <div
// // //                 style={{ cursor: "pointer" }}
// // //                 onClick={() => setOpen(!open)}
// // //             >

// // //                 {node.children.length > 0
// // //                     ? open
// // //                         ? "▼"                          
// // //                         : "▶"   
// // //                     :<AllInboxIcon/>}{" "} 

// // //                 {node.name}
// // //             </div>

// // //             {/* 
// // //                 RENDER CHILDREN ONLY IF OPEN
// // //                 (this is what makes tree expandable)
// // //             */}
// // //             {open &&
// // //                 node.children.map((child) => (

// // //                     <NodeTree                    
// // //                         key={child.id}
// // //                         node={child}
// // //                     />


// // //                 ))}
// // //         </div>
// // //     );
// // // }



// import { useState } from "react";
// import AllInboxIcon from "@mui/icons-material/AllInbox";
// import axios from "axios";
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Button } from "@progress/kendo-react-buttons";

// =======

// // export default function NodeTree({ node ,selectedNodeId,setSelectedNodeId}) {
// //     const [open, setOpen] = useState(false);

// //     const handleAddChild=()=>{
// //         alert("Child added ");
// //     }




// //     // console.log("Node",node);
// //     return (
// //         <div style={{ marginLeft: 20 }}>
            
// //               {/* clickable row for each node */}
// //             <div
// //                 style={{ cursor: "pointer" }}
// //                 onClick={() => setOpen(!open)}
               
// //             >



// //             <div onClick={() => setSelectedNodeId(node.id)}>
// //     {node.nodeName}
// // </div>

// // {selectedNodeId === node.id && (
// //     <div style={{ marginLeft: "25px", marginTop: "5px" }}>
// //         <button onClick={handleAddChild}>
// //             Add Child
// //         </button>
// //     </div>
// // )}
 


                
// //                 {node.children.length > 0
// //                     ? open
// //                         ? "▼"                          
// //                         : "▶"   
// //                     :<AllInboxIcon/>}{" "} 
                    
// //                 {node.name}
// //             </div>

// //             {/* 
// //                 RENDER CHILDREN ONLY IF OPEN
// //                 (this is what makes tree expandable)
// //             */}
// //             {open &&
// //                 node.children.map((child) => (
// //                     <>
// //                     <NodeTree                    
// //                         key={child.id}
// //                         node={child}
// //                     />
// //                     </>

// //                 ))}
// //         </div>
// //     );
// // }


// import { useState } from "react";
// import AllInboxIcon from "@mui/icons-material/AllInbox";
// >>>>>>> f490cd0951b0286e91ddbf55d5c2527d71b5d070

// export default function NodeTree({
//     node,
//     selectedNodeId,
// <<<<<<< HEAD
//     setSelectedNodeId,
//     hierarchicalName,
//     loadTree
// =======
//     setSelectedNodeId
// >>>>>>> f490cd0951b0286e91ddbf55d5c2527d71b5d070
// }) {
//     const [open, setOpen] = useState(false);

//     const hasChildren = node.children && node.children.length > 0;

// <<<<<<< HEAD

//     const handleAdd = (node) => {

       


      
//         console.log(node.id);
//         console.log(hierarchicalName);
// =======
//     const handleAddChild = (e) => {
//         e.stopPropagation();
//         alert("Add Child to " + node.name);
// >>>>>>> f490cd0951b0286e91ddbf55d5c2527d71b5d070
//     };

//     return (
//         <div style={{ marginLeft: "20px" }}>

//             <div
//                 style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px"
//                 }}
//             >

//                 {/* Expand / Collapse */}
//                 <span
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         if (hasChildren) {
//                             setOpen(!open);
//                         }
//                     }}
//                     style={{
//                         width: "20px",
//                         cursor: hasChildren ? "pointer" : "default"
//                     }}
//                 >
//                     {hasChildren
//                         ? (open ? "▼" : "▶")
//                         : <AllInboxIcon fontSize="small" />
//                     }
//                 </span>

//                 {/* Node Name */}
//                 <span
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         setSelectedNodeId(node.id);
//                     }}
//                     style={{
//                         cursor: "pointer",
//                         fontWeight:
//                             selectedNodeId === node.id ? "bold" : "normal"
//                     }}
//                 >
//                     {node.name}
//                 </span>

// <<<<<<< HEAD
//                 {/* Show button only for selected node
//                 {selectedNodeId === node.id && (
//                     <>
//                         <Button onClick={() => { handleAdd(node) } } style={{ color: "rgb(35, 122, 253)" }}>
//                             <AddIcon/>
//                         </Button>
//                         <Button onClick={() => { handleAdd(node, hierarchicalName) }} style={{ color: "rgb(35, 122, 253)" }}>
//                             <EditIcon/>
//                         </Button>
//                         <Button onClick={() => { handleAdd(node, hierarchicalName) }} style={{ color: "rgb(35, 122, 253)" }}>
//                             <DeleteIcon/>
//                         </Button>
                       
                        





//                     </>
//                 )} */}
// =======
//                 {/* Show button only for selected node */}
//                 {selectedNodeId === node.id && (
//                    <>
//                     <button
//                         onClick={handleAddChild}
//                     >
//                         + 
//                     </button>
//                     <button
//                         onClick={handleAddChild}
//                     >
//                         + 
//                     </button>
//                      <button
//                         onClick={handleAddChild}
//                     >
//                         + 
//                     </button>
//                     <button
//                         onClick={handleAddChild}
//                     >
//                         + 
//                     </button>
                     
                   
//                    </>
//                 )}
// >>>>>>> f490cd0951b0286e91ddbf55d5c2527d71b5d070

//             </div>

//             {/* Children */}
//             {open &&
//                 hasChildren &&
//                 node.children.map((child) => (
//                     <NodeTree
//                         key={child.id}
//                         node={child}
//                         selectedNodeId={selectedNodeId}
//                         setSelectedNodeId={setSelectedNodeId}
// <<<<<<< HEAD
//                         hierarchicalName={hierarchicalName}
//                         loadTree={loadTree}
// =======
// >>>>>>> f490cd0951b0286e91ddbf55d5c2527d71b5d070
//                     />
//                 ))}
//         </div>
//     );
//}

import { useState } from "react";
import AllInboxIcon from "@mui/icons-material/AllInbox";

export default function NodeTree({
    node,
    selectedNodeId,
    setSelectedNodeId,
    hierarchicalName,
    editable
}) {
    const [open, setOpen] = useState(false);

    const hasChildren = node.children && node.children.length > 0;


  const handleAddChild =()=>{
    alert("Child added ...");
  }



   

    return (
        <div style={{ marginLeft: "20px" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        if (hasChildren) setOpen(!open);
                    }}
                    style={{
                        width: "20px",
                        cursor: hasChildren ? "pointer" : "default"
                    }}
                >
                    {hasChildren ? (open ? "▼" : "▶") : <AllInboxIcon fontSize="small" />}
                </span>

                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNodeId(node.id);
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
                        onClick={handleAddChild}
                    >
                        + 
                    </button>
                )}




            {/* Children */}
            {open &&
                hasChildren &&
                node.children.map((child) => (
                    <NodeTree
                        key={child.id}
                        node={child}
                        selectedNodeId={selectedNodeId}
                        setSelectedNodeId={setSelectedNodeId}
                        // hierarchicalName={hierarchicalName}
                        // loadTree={loadTree}
                            editable={editable}

                    />
                ))}

        </div>
    );
}