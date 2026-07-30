
import { useState, useRef, useEffect } from "react";
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
import { uuidGeneration } from './treeGenerator';
import { Tooltip } from "react-tooltip";
import Highlight from "./Highlight";
import Highlighter from "react-highlight-words";
import { generateTree } from "./treeGenerator";




export default function NodeTree({
    node, tree, setTree, selectedNodeId, setSelectedNodeId, editable, selectedContainerName, editNode, deleteNode, addChildNode, search, registerMatchRef, activeMatch, matches,
    selectedHierarchy,approval

}) {


    const [open, setOpen] = useState(true);



    const [isEditing, setIsEditing] = useState(false);


    const [editName, setEditName] = useState(node.displayName);

    const[treeDatas,setTreeDatas] =useState([]);

    

    

    const nodeRef = useRef(null);

    

    const originalTree = tree;


    const matchIndex = matches
        ? matches.indexOf(node.id)
        : -1;


    const iconMap = {
        warehouse: <WarehouseIcon fontSize="small" color="primary" />,
        rack: <ShelvesIcon fontSize="small" color="info" />,
        box: <i className="bi bi-box-seam" style={{ color: "#1976d2" }} />,
        shelf: <ViewModuleIcon fontSize="small" color="success" />,
        tray: <GridViewIcon fontSize="small" color="error" />,
        sample: <ScienceIcon fontSize="small" color="warning" />,
        tube: <BiotechIcon fontSize="small" color="action" />,
        freezer: <KitchenIcon fontSize="small" color="primary" />
    };



    const hasChildren =
        node.children &&
        node.children.length > 0;





      






    const saveNode = async (e) => {

        e.stopPropagation();

        if(!editName ||  "")
        {
            alert("edit Name should not be empty");
            setIsEditing(false);
            return;
              
        }

     if(/[^a-zA-Z0-9]/.test(editName) ||  editName.length>25){
    alert("node name should not contain special character or lenght should not exit more than 25")
    setIsEditing(false);
    return;
  }
     

//const dataTree = await getAllTree();


const isDuplicateName = (nodes, editName) => {

  return nodes.some(node =>
    node.displayName?.trim().toLowerCase() ===
      editName.trim().toLowerCase() ||
    isDuplicateName(node.children || [], editName)
  );
};


const isDuplicate = isDuplicateName(tree,editName);

if (isDuplicate) {
  alert("Node name already exists");
  setIsEditing(false);
  
  return;
}


console.log("tree data's" ,treeDatas);


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



    

    function getMaxId(tree) {
        let maxId = 0;

        function traverse(nodes = []) {
            for (const node of nodes) {
                maxId = Math.max(maxId, node.id);

                if (node.children?.length) {
                    traverse(node.children);
                }
            }
        }

        traverse(tree);
        return maxId;
    }

    let nextId = getMaxId(tree) + 1;

    // console.log(getMaxId(tree)); // 15








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

        const res = await axios.get(`http://localhost:8081/structure/getTree/${selectedContainerName}`);

        setTree(res.data.tree);



        }
        catch (err) {
            console.log(err);
            alert("Delete failed...");
        }

    }



    function findReferenceChild(nodes, currentNode) {
        for (const item of nodes) {
            if (item.id !== currentNode.id &&
                item.icon === currentNode.icon &&
                item.children?.length) {
                return item.children[0];
            }

            if (item.children?.length) {
                const result = findReferenceChild(item.children, currentNode);
                if (result) return result;
            }
        }

        return null;



    }


    function getReferenceChild(nodes, currentNode) {
        for (const item of nodes) {
            if (item.id === currentNode.id &&

                item.children?.length) {
                return item.children[0];
            }

            if (item.children?.length) {
                const result = getReferenceChild(item.children, currentNode);
                if (result) return result;
            }
        }

        return null;
    }




    const handleAddChild = async (e) => {
        e.stopPropagation();

        let childNode = "";
        let childId = getMaxId(tree) + 1;
        let ChildIcon = null;
        let isLeaf = true;

        // let existingTree = originalTree;

        console.log("Original Tree", originalTree);

        //   //  const hasOnlyRoot =
        //         tree &&
        //         tree.length === 1 &&
        //         (!tree[0].children || tree[0].children.length === 0);

        // if (!hasOnlyRoot) {

        if (node.children && node.children.length > 0) {

            const lastNode = node.children[node.children.length - 1];

            let num = Number(lastNode.name.match(/\d+$/)?.[0] || 0);

            childNode = lastNode.name.replace(/\d+$/, ++num);

            ChildIcon = lastNode.icon;
            isLeaf = lastNode.isLeaf;

        } else {

            const parentNumber = node.name.match(/\d+$/)?.[0] || "";

            const sampleChild = findReferenceChild(tree, node);

            if (sampleChild) {
                ChildIcon = sampleChild.icon;
                isLeaf = sampleChild.isLeaf;
                childNode = node.name.replace(/\d+$/, `${parentNumber}1`);
            }
            else {

                const res = await axios.get(
                    `http://localhost:8081/structure/getStructure/${selectedHierarchy}`
                );

                const newTree = generateTree(res.data);

                if (!newTree) return;

                const renameNodes = (nodes) =>
                    nodes.map((item) => {
                        const numberPart = (item.name || "").replace(/^[^\d]+/, "");

                        const newName = `${selectedContainerName}${numberPart}`;

                        return {
                            ...item,
                            name: newName,
                            displayName: newName,
                            children: renameNodes(item.children || [])
                        };
                    });

                const resetTree = renameNodes(newTree);

                const finalTree = [
                    {
                        id: 1,
                        key: uuidGeneration(),
                        name: selectedContainerName,
                        displayName: selectedContainerName,
                        isRoot: true,
                        icon: "freezer",
                        isLeaf: false,
                        children: resetTree
                    }
                ];




                const parentNumber = node.name.match(/\d+$/)?.[0] || "";


                const sampleChild = getReferenceChild(finalTree, node);
                console.log("Sample Child", sampleChild)

                if (sampleChild) {
                    ChildIcon = sampleChild.icon;
                    isLeaf = sampleChild.isLeaf;
                }

                // childNode = node.name.replace(/\d+$/, `${parentNumber}1`);

                childNode = parentNumber
                    ? node.name.replace(/\d+$/, `${parentNumber}1`)
                    : `${node.name}1`;
            }
        }



        const newChild = {
            id: childId,
            name: childNode,
            displayName: childNode,
            icon: ChildIcon,
            isLeaf,
            key: uuidGeneration(),
            children: []
        };

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

            const res = await axios.get(

                `http://localhost:8081/structure/getTree/${selectedContainerName}`

            );


            setTree(res.data.tree);

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
            id: nextId++ ,
            
            name: newName,
            displayName: newName,
            icon: node.icon,
            isLeaf: node.isLeaf,
            key: uuidGeneration(),
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


    const handleClone = async(e) => {
        e.stopPropagation();

        const parent = findParent(tree, node.id);

        let cloned;

        if (parent) {
            const newName = getNextNodeName(parent);
            cloned = cloneNode(node, newName);
        }

        else {
            const nodename = node.name.replace(/\d+$/, '');



            const newName = `${nodename}${tree.length + 1}`;
            cloned = cloneNode(node, newName);
        }

        console.log("Clone Tree" , cloned);

        const updatedTree = parent
            ? addChildToParent(tree, parent.id, cloned)
            : [...tree, cloned];

        setTree(updatedTree);



        try {
          await  axios.put(
                `http://localhost:8081/structure/editNode/${selectedContainerName}`,
                {
                    nodedata: {
                        tree: updatedTree
                    }
                }
            );

            const res = await axios.get(`http://localhost:8081/structure/getTree/${selectedContainerName}`);
            setTree(res.data.tree);



        } catch (err) {
            console.log(err);
            alert("clone Failed");
        }



        // .catch(err => {
        //     console.log(err);
        //     alert("clone failed");
        // });


    };

function findNodeById(nodes, id) {
    for (const node of nodes) {
        if (node.id === id) return node;

        const data = findNodeById(node.children || [], id);
        if (data) return data;
    }
    return null;
}
const nextNode=findNodeById(tree,node.id+1);


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

                <span
                    onClick={() => hasChildren && setOpen(!open)}
                    style={{
                        cursor: hasChildren ? "pointer" : "default",
                        display: "flex",
                        alignItems: "center"
                    }}

                    data-tooltip-id="common"
                    data-tooltip-content={node.icon}
                    data-tooltip-place="left"
                >
                    {
                        iconMap[node.icon] ||
                        <i className="bi bi-box-seam" fontSize="small" style={{ color: "#5582af" }} />
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
                                    cursor: "pointer",

                                    // transition: "0.2s",
                                    backgroundColor:
                                        selectedNodeId === node.id ? "	#D0D0D0" : "transparent",


                                }}


                            >

                                {/* {node.displayName || node.name} */}
                                {/* <Highlight
                                    text={node.displayName || node.name}
                                    search={search}
                                /> */}
                                {/* <div>
                                 <Highlighter
                                    searchWords={[search]}
                                    autoEscape={true}
                                    textToHighlight={node.displayName || node.name}
                                    highlightStyle={{
                                        backgroundColor: "#DCDCDC",
                                    }}

                                    
                                />
                               </div> */}


                                <div
                                    ref={(element) => {

                                        nodeRef.current = element;

                                        const isMatch =
                                            search &&
                                            (node.displayName)
                                                .toLowerCase()
                                                .includes(search.toLowerCase());


                                        if (isMatch && registerMatchRef) {

                                            registerMatchRef(
                                                node.id,
                                                element
                                            );

                                        }

                                    }}




                                >

                                    <Highlighter
                                        searchWords={[search]}
                                        autoEscape={true}
                                        textToHighlight={node.displayName||node.name}                                        highlightStyle={{
                                            backgroundColor:
                                                matchIndex === activeMatch
                                                    ? "#ADD8E6"
                                                    : "#DCDCDC",

                                        }}
                                        data-tooltip-id="common"
                                        data-tooltip-content={node.displayName}
                                        data-tooltip-place="left"

                                    />

                                </div>






                            </span>

                            {
                                selectedNodeId === node.id
                                &&
                                editable
                                &&
                                !approval
                                &&
                               
                                

                                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                    {
                                        selectedNodeId !== 1 && (
                                            <Button
                                                onClick={(e) => {

                                                    e.stopPropagation();
                                                    setEditName(node.displayName || node.name);
                                                    setIsEditing(true);

                                                }}
                                                style={{ border: "none" }}
                                                data-tooltip-id="common"
                                                data-tooltip-content={`Edit ${node.icon}`}
                                                data-tooltip-place="bottom"

                                            >
                                                <EditIcon fontSize="small" />

                                            </Button>
                                        )
                                    }

                                    {
                                        selectedNodeId !== 1 && (

                                            <Button onClick={handleDelete} style={{ border: "none" }} data-tooltip-id="common"
                                            data-tooltip-content={`Delete ${node.icon}`} data-tooltip-place="bottom" 
                                            >


                                                <DeleteIcon fontSize="small" /> </Button>
                                        )
                                    }

                                    {
                                        !node.isLeaf && (

                                            <Button onClick={handleAddChild} style={{ border: "none" }} data-tooltip-id="common"
                                                 data-tooltip-content={nextNode?.icon ? `Add ${nextNode.icon}` : "Add Child"} data-tooltip-place="bottom"
                                            >


                                                <AddIcon />


                                            </Button>
                                        )
                                    }


                                    {
                                        selectedNodeId !== 1 && (
                                            <Button onClick={handleClone} style={{ border: "none" }} data-tooltip-id="common"
                                                data-tooltip-content={` Clone ${node.icon}`} data-tooltip-place="bottom"><FileCopyIcon fontSize="small" /></Button>
                                        )
                                    }
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

                        search={search}

                        registerMatchRef={registerMatchRef}

                        activeMatch={activeMatch}
                        matches={matches}

                        selectedHierarchy={selectedHierarchy}
                        approval={approval}
                   
                        

                    />


                ))

            }



        </div>

    );

}













