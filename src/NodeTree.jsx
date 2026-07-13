// // import { useState } from "react";
// // import AllInboxIcon from "@mui/icons-material/AllInbox";
// // import { Button } from "@progress/kendo-react-buttons";
// // import EditIcon from "@mui/icons-material/Edit";
// // import AddIcon from "@mui/icons-material/Add";
// // import axios from "axios";

// // export default function NodeTree({
// //     node,
// //     selectedNodeId,
// //     setSelectedNodeId,
// //     editable,
// //     tree,
// //     setTree,
// //     selectedContainerName,
// //     editNode,
// //     onEditNode
// // }) {
// //     const [open, setOpen] = useState(true);

// //     const hasChildren = node.children && node.children.length > 0;

// //     const handleSelect = () => {
// //         setSelectedNodeId(node.id);
// //     };

// //     const editCurrentNode = async (e) => {
// //         e.stopPropagation();

// //         const newName = prompt("Enter new Name");
// //         if (!newName) return;

// //         const updatedTree = editNode(tree, node.id, newName);

// //         setTree(updatedTree);
// //         // onEditNode(node.id, newName);

// //         if (!selectedContainerName) {
// //     console.error("Container name not foumd");
// //     return;
// // }

// //         try {
// //             await axios.put(
// //                 `http://localhost:8081/structure/editNode/${selectedContainerName}`,
// //                 {
// //                     nodedata: {
// //                         tree: updatedTree
// //                     }
// //                 }
// //             );

// //             alert("Node updated successfully");
// //         } catch (err) {
// //             console.log(err);
// //             alert("Update failed");
// //         }
// //     };

// //     return (
// //         <div style={{ marginLeft: 20 }}>
// //             <div style={{ display: "flex", alignItems: "center", gap: 8,     fontFamily: "IBM Plex Mono, monospace",fontSize:"17px"}}>

// //                 <span
// //                     onClick={() => hasChildren && setOpen(!open)}
// //                     style={{ cursor: hasChildren ? "pointer" : "default" }}
// //                 >
// //                     {hasChildren ? (open ? <i class="bi bi-caret-down-fill"></i> : <i class="bi bi-caret-right"></i>) :<i className="bi bi-box-seam"></i>}


// //                 </span>

// //                 <span onClick={handleSelect} style={{ cursor: "pointer" }}>
// //                     {node.name}
// //                 </span>

// //                 {selectedNodeId === node.id && editable && (
// //                     <>
// //                         <Button onClick={editCurrentNode}>
// //                             <EditIcon />
// //                         </Button>

// //                         <Button onClick={(e) => e.stopPropagation()}>
// //                             <AddIcon />
// //                         </Button>
// //                     </>
// //                 )}
// //             </div>

// //             {open &&
// //                 hasChildren &&
// //                 node.children.map((child) => (
// //                     <NodeTree
// //                         key={child.id}
// //                         node={child}
// //                         tree={tree}
// //                         setTree={setTree}
// //                         selectedNodeId={selectedNodeId}
// //                         setSelectedNodeId={setSelectedNodeId}
// //                         editable={editable}
// //                         selectedContainerName={selectedContainerName}
// //                         editNode={editNode}
// //                         onEditNode={onEditNode}
// //                     />
// //                 ))}
// //         </div>
// //     );
// // }







// import { useState } from "react";
// import axios from "axios";

// import { Button } from "@progress/kendo-react-buttons";
// import EditIcon from "@mui/icons-material/Edit";
// import WarehouseIcon from "@mui/icons-material/Warehouse";
// import ShelvesIcon from "@mui/icons-material/Shelves";
// import Inventory2Icon from "@mui/icons-material/Inventory2";
// import ViewModuleIcon from "@mui/icons-material/ViewModule";
// import GridViewIcon from "@mui/icons-material/GridView";
// import ScienceIcon from "@mui/icons-material/Science";
// import BiotechIcon from "@mui/icons-material/Biotech";
// import KitchenIcon from "@mui/icons-material/Kitchen";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from '@mui/icons-material/Add';


// export default function NodeTree({
//     node, tree, setTree, selectedNodeId, setSelectedNodeId, editable, selectedContainerName, editNode, deleteNode, addChildNode

// }) {


//     const [open, setOpen] = useState(true);


//     const [isEditing, setIsEditing] = useState(false);


//     const [editName, setEditName] = useState(node.displayName||node.name);


//     const iconMap = {
//         warehouse: <WarehouseIcon fontSize="small" />,
//         rack: <ShelvesIcon fontSize="small" />,
//         box: <Inventory2Icon fontSize="small" />,
//         shelf: <ViewModuleIcon fontSize="small" />,
//         tray: <GridViewIcon fontSize="small" />,
//         sample: <ScienceIcon fontSize="small" />,
//         tube: <BiotechIcon fontSize="small" />,
//         freezer: <KitchenIcon fontSize="small" />
//     };



//     const hasChildren =
//         node.children &&
//         node.children.length > 0;




//     const saveNode = async (e) => {

//         e.stopPropagation();


//         const updatedTree = editNode(tree, node.id, editName);

//         setTree(updatedTree);

//         setIsEditing(false);



//         if (!selectedContainerName) {

//             console.log("Container name must be ");

//             return;

//         }


//         try {


//             await axios.put(

//                 `http://localhost:8081/structure/editNode/${selectedContainerName}`,

//                 {
//                     nodedata: {
//                         tree: updatedTree
//                     }
//                 }

//             );

//             const res = await axios.get(

//                 `http://localhost:8081/structure/getTree/${selectedContainerName}`

//             );
//             setTree(res.data.tree);
//         }
//         catch (err) {

//           console.log(err);
//           alert("Update failed");

//         }

//     };


//     const handleBlur = () => {
//         if (editName.trim() === node.displayName) {
//             setIsEditing(false);
//             return;
//         }

//     }


//     const handleEditBlur = () => {

//         if (selectedNodeId) {
//             setSelectedNodeId(null);
//             return;
//         }
//     }





//     const handleDelete = async (e) => {
//         e.stopPropagation();
//         const updatedTree = deleteNode(tree, node.id);
//         setTree(updatedTree);


//         try {
//             await axios.put(`http://localhost:8081/structure/editNode/${selectedContainerName}`,
//                 {

//                     nodedata: {
//                         tree: updatedTree
//                     }

//                 });

//         }
//         catch (err) {
//             console.log(err);
//             alert("Delete failed...");
//         }

//     }


// // const handleAddChild = async (e) => {
// //     e.stopPropagation();

// //     const parentName = node.name;

// //     const parentNumber = parentName.match(/\d+$/)?.[0] || "";

// //     const prefix = parentName.replace(/\d+$/, "");

// //     let nextNumber;

// //     if (node.children && node.children.length > 0) {
// //         const lastChild = node.children[node.children.length - 1];
// //         const lastNumber =
// //             lastChild.name.match(/\d+$/)?.[0] || "";

// //         nextNumber = String(Number(lastNumber) + 1);
// //     } else {
// //         nextNumber = `${parentNumber}1`;
// //     }

// //     const child = {
// //         name: `${prefix}${nextNumber}`,
// //         displayName: `${prefix}${nextNumber}`,
// //         children: []
// //     };

// //     const updatedTree = addChildNode(tree, node.id, child);

// //     setTree(updatedTree);

// //     try {
// //         await axios.put(
// //             `http://localhost:8081/structure/editNode/${selectedContainerName}`,
// //             {
// //                 nodedata: {
// //                     tree: updatedTree
// //                 }
// //             }
// //         );
// //     } catch (err) {
// //         console.log(err);
// //         alert("Failed to add child");
// //     }
// // };

// //    const handleAddChild = async (e) => {
// //     e.stopPropagation();

// //     let childName = "";
// //     let childIcon = "";



// //     if (node.children && node.children.length > 0) {

// //         childIcon = node.children[0].icon;

// //     } 
// //     else {


// //         const currentLevel = node.level;

// //         childIcon =
// //             hierarchyLevels[currentLevel + 1]?.icon || "box";
// //     }


// //     let childNumber = "";


// //     if (node.children && node.children.length > 0) {

// //         const lastChild =
// //             node.children[node.children.length - 1];


// //         const lastNumber =
// //             lastChild.name.match(/\d+$/)?.[0] || "";


// //         childNumber =
// //             String(Number(lastNumber) + 1);

// //     }
// //     else {

// //         const parentNumber =
// //             node.name.match(/\d+$/)?.[0] || "";


// //         childNumber =
// //             `${parentNumber}1`;
// //     }


// //     const prefix =
// //         node.name.replace(/\d+$/, "");


// //     childName =
// //         `${prefix}${childNumber}`;


// //     const child = {


// //         icon: childIcon,

// //         name: childName,

// //         displayName: childName,

// //         level: (node.level || 0) + 1,

// //         children: []
// //     };


// //     const updatedTree =
// //         addChildNode(
// //             tree,
// //             node.id,
// //             child
// //         );


// //     setTree(updatedTree);


// //     try {

// //         await axios.put(
// //             `http://localhost:8081/structure/editNode/${selectedContainerName}`,
// //             {
// //                 nodedata: {
// //                     tree: updatedTree
// //                 }
// //             }
// //         );

// //     }
// //     catch(err){

// //         console.log(err);
// //         alert("Add child failed");

// //     }

// // };


// const handleAddChild = ()=>{
//     let childNode ="";

//     const childLen = node.children.length;
//     const lastNode = node.children[childLen-1];
//     console.log("Children Node" ,lastNode);




// }

//     return (

//         <div style={{ marginLeft: 20 }}>


//             <div
//                 style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 8,
//                     fontFamily: "IBM Plex Mono, monospace",
//                     fontSize: "17px"
//                 }} >





//                 {/* <span
//                     onClick={() =>
//                         hasChildren && setOpen(!open)
//                     }

//                     style={{
//                         cursor: hasChildren
//                             ? "pointer"
//                             : "default"
//                     }}

//                 >

//                     {
//                         hasChildren ?

//                             (
//                                 open
//                                     ?
//                                     <i className="bi bi-caret-down-fill" />
//                                     :
//                                     <i className="bi bi-caret-right" />
//                             )

//                             :

//                             <i className="bi bi-box-seam" />

//                     }


//                 </span> */}


//                 <span
//                     onClick={() => hasChildren && setOpen(!open)}
//                     style={{
//                         cursor: hasChildren ? "pointer" : "default",
//                         display: "flex",
//                         alignItems: "center"
//                     }}
//                 >
//                     {
//                         iconMap[node.icon] ||
//                         <i className="bi bi-box-seam" fontSize="small" />
//                     }
//                 </span>


//                 {
//                     isEditing

//                         ?

//                         <>


//                             <input

//                                 value={editName}

//                                 onChange={(e) =>
//                                     setEditName(e.target.value)
//                                 }

//                                 onBlur={handleBlur}

//                             // autoFocus

//                             />



//                             <Button

//                                 onClick={saveNode}

//                             >

//                                 Save

//                             </Button>

//                         </>

//                         :


//                         <>



//                             <span
//                                 onClick={() => setSelectedNodeId(node.id)}
//                                 style={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: "8px"
//                                 }}
//                             >

//                                 {node.displayName || node.name}
//                             </span>

//                             {
//                                 selectedNodeId === node.id
//                                 &&
//                                 editable
//                                 &&

//                                 <>
//                                     <Button
//                                         onClick={(e) => {

//                                             e.stopPropagation();
//                                             setIsEditing(true);

//                                         }}
//                                     >
//                                         <EditIcon fontSize="small" />

//                                     </Button>

//                                     <Button onClick={handleDelete}><DeleteIcon fontSize="small" /></Button>

//                                     <Button onClick={handleAddChild}><AddIcon fontSize="small" /></Button>

//                                 </>
//                             }

//                         </>

//                 }

//             </div>

//             {
//                 open
//                 &&
//                 hasChildren
//                 &&
//                 node.children.map(child => (


//                     <NodeTree

//                         key={child.id}

//                         node={child}

//                         tree={tree}

//                         setTree={setTree}

//                         selectedNodeId={selectedNodeId}

//                         setSelectedNodeId={setSelectedNodeId}


//                         editable={editable}

//                         selectedContainerName={selectedContainerName}


//                         editNode={editNode}

//                         deleteNode={deleteNode}

//                         addChildNode={addChildNode}

//                     />


//                 ))

//             }



//         </div>

//     );

// }






import { useState } from "react";
import axios from "axios";

import { Button } from "@progress/kendo-react-buttons";
import EditIcon from "@mui/icons-material/Edit";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ShelvesIcon from "@mui/icons-material/Shelves";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import GridViewIcon from "@mui/icons-material/GridView";
import ScienceIcon from "@mui/icons-material/Science";
import BiotechIcon from "@mui/icons-material/Biotech";
import KitchenIcon from "@mui/icons-material/Kitchen";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { getNextId } from "./treeGenerator";


export default function NodeTree({
    node, tree, setTree, selectedNodeId, setSelectedNodeId, editable, selectedContainerName, editNode, deleteNode, addChildNode

}) {


    const [open, setOpen] = useState(true);


    const [isEditing, setIsEditing] = useState(false);


    const [editName, setEditName] = useState(node.displayName);



    const iconMap = {
        warehouse: <WarehouseIcon fontSize="small"  color="primary"/>,
        rack: <ShelvesIcon fontSize="small"  color="info"/>,
        box: <i className="bi bi-box-seam" style={{ color: "#1976d2" }} />,
        shelf: <ViewModuleIcon fontSize="small" color="success" />,
        tray: <GridViewIcon fontSize="small" color="error"/>,
        sample: <ScienceIcon fontSize="small" color="warning" />,
        tube: <BiotechIcon fontSize="small" color="action"/>,
        freezer: <KitchenIcon fontSize="small" color="disabled" />
    };



    const hasChildren =
        node.children &&
        node.children.length > 0;



    const saveNode = async (e) => {

        e.stopPropagation();


        const updatedTree = editNode(tree, node.id, editName);

        setTree(updatedTree);

        setIsEditing(false);



        if (!selectedContainerName) {

            console.log("Container name must be ");

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

            const res = await axios.get(

                `http://localhost:8081/structure/getTree/${selectedContainerName}`

            );
            setTree(res.data.tree);
        }
        catch (err) {

            console.log(err);
            alert("Update failed");

        }

    };


    const handleBlur = () => {
        if (editName.trim() === node.displayName) {
            setIsEditing(false);
            return;
        }

    }


    const handleEditBlur = () => {

        if (selectedNodeId) {
            setSelectedNodeId(null);
            return;
        }
    }





    const handleDelete = async (e) => {
        e.stopPropagation();
        const updatedTree = deleteNode(tree, node.id);
        setTree(updatedTree);


        try {
            await axios.put(`http://localhost:8081/structure/editNode/${selectedContainerName}`,
                {

                    nodedata: {
                        tree: updatedTree
                    }

                });

        }
        catch (err) {
            console.log(err);
            alert("Delete failed...");
        }

    }





    // const handleAddChild = async(e)=>{
    //     let childNode ="";
    //     let childId=0;
    //     let ChildIcon="";
    //     let isLeaf=false;

    //     const childLen = node.children.length-1;
    //     // const lastNode = node.children[0];
    //     // console.log("Children Node" ,lastNode);
    //     // console.log("Leaf",node.isLeaf);
    //     // console.log("node",node);
    //     console.log("Last Node" ,node.children[childLen]);
    //     if(node.children.length>0){
    //         const lastLen=Number(node.children.length-1);

    //         const lastNode = node.children[lastLen];
    //          childId = lastNode.id + 1;
    //         let num = lastNode.name.match(/\d+/)?.[0];

    //         let incre =++num;
    //         console.log(incre);

    //          childNode = node.name.replace(/\d+$/,incre);
    //         console.log(childNode);

    //         ChildIcon =lastNode.icon;

    //         isLeaf=lastNode.isLeaf;

    //     }

    //     else{
    //        const parentNumber = node.name.match(/\d+$/)?.[0];
    //        childId=node.id +1;
    //        ChildIcon=iconMap.box;
    //        isLeaf=true;
    //     childNode = node.name.replace(/\d+$/, `${parentNumber}1`);
    //     }



    //    const newChild = {
    //       id:childId,
    //       name:childNode,
    //       displayName:childNode,
    //       icon:ChildIcon,
    //       isLeaf:isLeaf
    //    }

    //    console.log(newChild);


    //    const updatedTree =addChildNode(tree,node.id,newChild);
    //    setTree(updatedTree);

    //     try {

    //         await axios.put(
    //             `http://localhost:8081/structure/editNode/${selectedContainerName}`,
    //             {
    //                 nodedata: {
    //                     tree: updatedTree
    //                 }
    //             }
    //         );

    //     } catch (err) {
    //         console.log(err);
    //     }


    // }




    const handleAddChild = async (e) => {

        e.stopPropagation();

        let childNode = "";
        let childId = 0;
        let ChildIcon = "";
        let isLeaf = false;

        if (node.children && node.children.length > 0) {

            const childLen = node.children.length - 1;

            console.log("Last Node", node.children[childLen]);

            const lastNode = node.children[childLen];

            // childId = lastNode.id + 1;
            childId = getNextId()+1;

            console.log("Tree from node", tree);


            let num = Number(lastNode.name.match(/\d+$/)?.[0]);

            let incre = ++num;

            console.log(incre);

            childNode = lastNode.name.replace(/\d+$/, incre);

            console.log(childNode);

            ChildIcon = lastNode.icon;

            isLeaf = lastNode.isLeaf;

        } else {

            const parentNumber = node.name.match(/\d+$/)?.[0];

            //  childId = node.id + 1;
            childId = getNextId()+1;


            ChildIcon = "box";

            isLeaf = true;

            childNode = node.name.replace(/\d+$/, `${parentNumber}1`);
        }

        const newChild = {

            id: childId,

            name: childNode,

            displayName: childNode,

            icon: ChildIcon,

            isLeaf: isLeaf,

            children: []
        };

        console.log("New Child", newChild);

        const updatedTree = addChildNode(tree, node.id, newChild);

        setTree(updatedTree);

        try {

            await axios.put(
                `http://localhost:8081/structure/editNode/${selectedContainerName}`,
                {
                    nodedata: {
                        tree: updatedTree
                    }
                }
            );

        } catch (err) {

            console.log(err);
            alert("Add Child Failed");

        }
    };



    function cloneNode(node) {
        return {
            id: getNextId()+1,
            name: node.name,
            displayName: node.displayName,
            icon: node.icon,
            isLeaf: node.isLeaf,
            children: node.children?.map(cloneNode) || []
        };
    }

    const handleClone = (e) => {
        e.stopPropagation();

        const cloned = cloneNode(node);

        const updatedTree = [...tree, cloned];
        setTree(updatedTree);
   

        try {

            axios.put(
                `http://localhost:8081/structure/editNode/${selectedContainerName}`,
                {
                    nodedata: {
                        tree: updatedTree
                    }
                }
            );

        } catch (err) {

            console.log(err);
            alert("clone failed");

        }


    };



    return (

        <div style={{ marginLeft: 20 }}>


            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "17px"
                }} >





                {/* <span
                    onClick={() =>
                        hasChildren && setOpen(!open)
                    }

                    style={{
                        cursor: hasChildren
                            ? "pointer"
                            : "default"
                    }}

                >

                    {
                        hasChildren ?

                            (
                                open
                                    ?
                                    <i className="bi bi-caret-down-fill" />
                                    :
                                    <i className="bi bi-caret-right" />
                            )

                            :

                            <i className="bi bi-box-seam" />

                    }


                </span> */}


                <span
                    onClick={() => hasChildren && setOpen(!open)}
                    style={{
                        cursor: hasChildren ? "pointer" : "default",
                        display: "flex",
                        alignItems: "center"
                    }}

                >
                    {
                        iconMap[node.icon] ||
                        <i className="bi bi-box-seam" fontSize="small" style={{color:"#5582af"}} />
                    }
                </span>


                {
                    isEditing

                        ?

                        <>


                            <input

                                value={editName}

                                onChange={(e) =>
                                    setEditName(e.target.value)
                                }

                                onBlur={handleBlur}

                                autoFocus

                            />



                            <Button

                                onClick={saveNode}

                            >

                                Save

                            </Button>

                        </>

                        :


                        <>



                            <span
                                onClick={() => setSelectedNodeId(node.id)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    cursor: "pointer"
                                }}

                            >

                                {node.displayName || node.name}
                            </span>

                            {
                                selectedNodeId === node.id
                                &&
                                editable
                                &&

                                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }} >
                                    <Button
                                        onClick={(e) => {

                                            e.stopPropagation();
                                            console.log("id", selectedNodeId);
                                            setIsEditing(true);

                                        }}
                                        style={{border:"none"}}
                                    >
                                        <EditIcon fontSize="small" />

                                    </Button>

                                    <Button onClick={handleDelete} style={{border:"none"}}><DeleteIcon fontSize="small"  /></Button>

                                    {
                                        !node.isLeaf && (

                                            <Button onClick={handleAddChild} style={{border:"none"}}><AddIcon /></Button>
                                        )
                                    }




                                    <Button onClick={handleClone} style={{border:"none"}}><FileCopyIcon fontSize="small" /></Button>

                                </div>
                            }

                        </>

                }

            </div>

            {
                open
                &&
                hasChildren
                &&
                node.children.map(child => (


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

                        deleteNode={deleteNode}

                        addChildNode={addChildNode}

                    />


                ))

            }



        </div>

    );

}
















