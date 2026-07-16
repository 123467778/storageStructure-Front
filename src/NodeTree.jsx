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
import {uuidGeneration} from './treeGenerator'



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

       // setTree(updatedTree);

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
            childId = getNextId();

            

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
            childId = getNextId();


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
            
            key:uuidGeneration(),

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


function getNextNodeName(parent) {
    const children = parent?.children || [];
    const prefix = parent.name;

    let max = 0;

    children.forEach(child => {
        const suffix = child.name.replace(prefix, "");
        if (/^\d+$/.test(suffix)) {
            max = Math.max(max, Number(suffix));
        }
    });

    return `${prefix}${max + 1}`;
}



function cloneNode(node, newName) {
    return {
        id: getNextId(),
        name: newName,
        displayName: newName,
        icon: node.icon,
        isLeaf: node.isLeaf,
        key:uuidGeneration(),
        children: node.children?.map((child, index) => 
            cloneNode(child, `${newName}${index + 1}`)
        ) || []
    };
}



    function findParent(tree, targetId, parent = null) {
    for (const node of tree) {
        if (node.id === targetId) {
            return parent;
        }

        if (node.children?.length) {
            const result = findParent(node.children, targetId, node);
            if (result) return result;
        }
    }

    return null;
}

const addChildToParent = (nodes, parentId, child) => {
    return nodes.map(node => {
        if (node.id === parentId) {
            return {
                ...node,
                children: [...(node.children || []), child]
            };
        }

        if (node.children) {
            return {
                ...node,
                children: addChildToParent(node.children, parentId, child)
            };
        }

        return node;
    });
};


const handleClone = (e) => {
    e.stopPropagation();

    const parent = findParent(tree, node.id);

    let cloned;

    if (parent) {
        const newName = getNextNodeName(parent);
        cloned = cloneNode(node, newName);
     } 

    else {
        const nodename= node.name.replace(/\d+$/, '');
        const newName = `${nodename}${tree.length + 1}`;
        cloned = cloneNode(node, newName);
    }


    const updatedTree = parent
        ? addChildToParent(tree, parent.id, cloned)
        : [...tree, cloned];

    setTree(updatedTree);


    axios.put(
        `http://localhost:8081/structure/editNode/${selectedContainerName}`,
        {
            nodedata: {
                tree: updatedTree
            }
        }
    ).catch(err => {
        console.log(err);
        alert("clone failed");
    });
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
















