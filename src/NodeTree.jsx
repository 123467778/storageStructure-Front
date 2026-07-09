// import { useState } from "react";
// import AllInboxIcon from "@mui/icons-material/AllInbox";
// import { Button } from "@progress/kendo-react-buttons";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import axios from "axios";

// export default function NodeTree({
//     node,
//     selectedNodeId,
//     setSelectedNodeId,
//     editable,
//     tree,
//     setTree,
//     selectedContainerName,
//     editNode,
//     onEditNode
// }) {
//     const [open, setOpen] = useState(true);

//     const hasChildren = node.children && node.children.length > 0;

//     const handleSelect = () => {
//         setSelectedNodeId(node.id);
//     };

//     const editCurrentNode = async (e) => {
//         e.stopPropagation();

//         const newName = prompt("Enter new Name");
//         if (!newName) return;

//         const updatedTree = editNode(tree, node.id, newName);

//         setTree(updatedTree);
//         // onEditNode(node.id, newName);

//         if (!selectedContainerName) {
//     console.error("Container name not foumd");
//     return;
// }

//         try {
//             await axios.put(
//                 `http://localhost:8081/structure/editNode/${selectedContainerName}`,
//                 {
//                     nodedata: {
//                         tree: updatedTree
//                     }
//                 }
//             );

//             alert("Node updated successfully");
//         } catch (err) {
//             console.log(err);
//             alert("Update failed");
//         }
//     };

//     return (
//         <div style={{ marginLeft: 20 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 8,     fontFamily: "IBM Plex Mono, monospace",fontSize:"17px"}}>

//                 <span
//                     onClick={() => hasChildren && setOpen(!open)}
//                     style={{ cursor: hasChildren ? "pointer" : "default" }}
//                 >
//                     {hasChildren ? (open ? <i class="bi bi-caret-down-fill"></i> : <i class="bi bi-caret-right"></i>) :<i className="bi bi-box-seam"></i>}


//                 </span>

//                 <span onClick={handleSelect} style={{ cursor: "pointer" }}>
//                     {node.name}
//                 </span>

//                 {selectedNodeId === node.id && editable && (
//                     <>
//                         <Button onClick={editCurrentNode}>
//                             <EditIcon />
//                         </Button>

//                         <Button onClick={(e) => e.stopPropagation()}>
//                             <AddIcon />
//                         </Button>
//                     </>
//                 )}
//             </div>

//             {open &&
//                 hasChildren &&
//                 node.children.map((child) => (
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
//                         onEditNode={onEditNode}
//                     />
//                 ))}
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


export default function NodeTree({
    node, tree, setTree, selectedNodeId, setSelectedNodeId, editable, selectedContainerName, editNode,deleteNode,addChildNode

}) {


    const [open, setOpen] = useState(true);


    const [isEditing, setIsEditing] = useState(false);


    const [editName, setEditName] = useState(node.name);


    const iconMap = {
        warehouse: <WarehouseIcon  fontSize="small"/>,
        rack: <ShelvesIcon  fontSize="small" />,
        box: <Inventory2Icon   fontSize="small"/>,
        shelf: <ViewModuleIcon  fontSize="small"/>,
        tray: <GridViewIcon  fontSize="small"/>,
        sample: <ScienceIcon  fontSize="small"/>,
        tube: <BiotechIcon  fontSize="small"/>,
        freezer: <KitchenIcon  fontSize="small" />
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
        if (editName.trim() === node.name) {
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





  const handleDelete =async(e)=>{
      e.stopPropagation();
      const updatedTree = deleteNode(tree,node.id);
      setTree(updatedTree);


      try{
        await axios.put(`http://localhost:8081/structure/editNode/${selectedContainerName}`,
            {

               nodedata :{
                tree:updatedTree
               }

        });
        
      }
       catch(err){
    console.log(err);
    alert("Delete failed...");
  }

  }
 


const handleAddChild = async (e)=>{

    e.stopPropagation();


    let childName;

    let childIcon;



    if(node.children && node.children.length > 0){


        const lastChild =
            node.children[node.children.length - 1];


        childIcon = lastChild.icon;


        const number =
            parseInt(
                lastChild.name.match(/\d+$/)[0],
                10
            );


        childName =
            `${childIcon} ${number+1}`;


    }
    
    else {

    childIcon = <i className="bi bi-box-seam" />;

    
    const parentNumber = node.name.match(/\d+$/)?.[0] || "";

    
    childName = `${childIcon} ${parentNumber}+1`;

}



    const child={


        name:childName,

        icon:childIcon,

        children:[]

    };



    const updatedTree =
        addChildNode(
            tree,
            node.id,
            child
        );



    setTree(updatedTree);



    await axios.put(

        `http://localhost:8081/structure/editNode/${selectedContainerName}`,

        {
            nodedata:{
                tree:updatedTree
            }
        }

    );

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
                        <i className="bi bi-box-seam" fontSize="small" />
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

                            // autoFocus

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
                                    gap: "8px"
                                }}
                            >

                                {node.name}
                            </span>

                            {
                                selectedNodeId === node.id
                                &&
                                editable
                                &&

                              <>
                                <Button
                                    onClick={(e) => {

                                        e.stopPropagation();
                                        setIsEditing(true);

                                    }}
                                >
                                     <EditIcon fontSize="small" />
                                    
                                </Button>

                                <Button onClick={handleDelete}><DeleteIcon  fontSize="small"/></Button>

                                <Button onClick={handleAddChild}><AddIcon fontSize="small"/></Button>

                              </>
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