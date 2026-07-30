
import { useEffect, useState, useRef } from "react";
import NodeTree from "./NodeTree";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Button } from "@progress/kendo-react-buttons";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import axios from 'axios';
import { generateTree } from "./treeGenerator";
import { uuidGeneration } from "./treeGenerator";




function updateTree(nodes, nodeId, callback) {

    return nodes.map((node) => {

        if (node.id === nodeId) {
            return callback(node);
        }


        return {
            ...node,
            children: node.children
                ? updateTree(node.children, nodeId, callback)
                : []
        };

    });

}


export function editNode(nodes, nodeId, newName) {

    return updateTree(
        nodes,
        nodeId,
        (node) => ({
            ...node,

            displayName: newName
        })
    );
}

export function deleteNode(nodes, nodeId) {
    return nodes.filter(node => node.id !== nodeId).map(node => ({
        ...node, children: node.children ? deleteNode(node.children, nodeId) : []
    }));

}



export function addChildNode(nodes = [], parentId, child) {

    return nodes.map((node) => {

        if (node.id === parentId) {


            return {
                ...node,
                children: [...(node.children || []), child]
            };
        }

        return {
            ...node,
            children: addChildNode(node.children || [], parentId, child)
        };

    });

}




function TreeView({
    data,
    editable,
    selectedContainerName,
    onTreeChange, selectedHierarchy,
    originalTree, handleStructure,approval
}) {


    const [tree, setTree] = useState([]);

    const [selectedNodeId, setSelectedNodeId] = useState(0);

    const [search, setSearch] = useState(null);

    const [activeMatch, setActiveMatch] = useState(0);

    const matchRefs = useRef({});

    const matches = [];





    const collectMatches = (nodes) => {

        nodes.forEach(node => {

            const name =
                node.displayName || node.name;


            if (
                search &&
                name.toLowerCase()
                    .includes(search.toLowerCase())
            ) {

                matches.push(node.id);

            }


            if (node.children && node.children.length) {
                collectMatches(node.children);
            }

        });

    };


    collectMatches(tree);



    const registerMatchRef = (id, element) => {

        if (element) {
            matchRefs.current[id] = element;
        }

    };


    const scrollToMatch = (index) => {

        const nodeId = matches[index];

        const element =
            matchRefs.current[nodeId];


        if (element) {

            element.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

       

    };


    const nextMatch = () => {

        if (matches.length === 0)
            return;


        const next =
            activeMatch + 1 >= matches.length
                ? 0
                : activeMatch + 1;


        setActiveMatch(next);

        scrollToMatch(next);

         
    };



    const previousMatch = () => {

        if (matches.length === 0)
            return;


        const previous =
            activeMatch - 1 < 0
                ? matches.length - 1
                : activeMatch - 1;


        setActiveMatch(previous);

        scrollToMatch(previous);

         

    };





    useEffect(() => {

        setTree(data || []);

    }, [data]);



    const updateTreeData = (updated) => {

        setTree(updated);


        if (onTreeChange) {
            onTreeChange(updated);
        }

    };



    const reset = async () => {

        const res = await axios.get(
            `http://localhost:8081/structure/getStructure/${selectedHierarchy}`
        );;

        const tree = generateTree(res.data);

        if (!tree) return;

        const renameNodes = (nodes) =>
            nodes.map(node => {

                const numberPart =
                    (node.name || "").replace(/^[^\d]+/, "");

                //  const numberPart = (node.name || "").match(/\d+$/)?.[0] || "";


                const newName =
                    `${selectedContainerName}${numberPart}`;


                return {
                    ...node,
                    name: newName,
                    displayName: newName,
                    children: renameNodes(node.children || [])
                };
            });





        const resetTree = renameNodes(tree);

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


        setTree(finalTree);


        onTreeChange?.(finalTree);


        // axios.put(
        //     `http://localhost:8081/structure/editNode/${selectedContainerName}`,
        //     {
        //         nodedata: {
        //             tree: finalTree
        //         }
        //     }
        // ).catch(err => {
        //     console.log(err);
        //     alert("clone failed");
        // });

        try {
           axios.put(
            `http://localhost:8081/structure/editNode/${selectedContainerName}`,
            {
                nodedata: {
                    tree: finalTree
                }
            });

          const res = await  axios.get( `http://localhost:8081/structure/getTree/${selectedContainerName}`);

          setTree(res.data.tree);
        }
        catch(e){
            console.log(e);
            alert("clone failed");
        }
    };





    return (

        <div>

            <div style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                background: "#fff",
                padding: "8px",
            }}
            >


                <SearchIcon data-tooltip-id="common" data-tooltip-content={"Search"}   />

                <input
                    type="text"
                    placeholder="  search"
                    value={search || ""}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setActiveMatch(0);
                    }}
                    style={{
                        width: "200px",
                    
                        marginRight: "15px",
                        border: "none",
                        borderBottom: "2px solid #b8a9a9",




                    }}
                />



                <Button onClick={previousMatch} data-tooltip-id="common" data-tooltip-content={"previous"} style={{ border: "none", background: "white" }}>
                    <ArrowUpwardIcon fontSize="small" />
                </Button>


                <span style={{ padding: "8px" }}>
                    {
                        matches.length
                            ?
                            `${activeMatch + 1}/${matches.length}`
                            :
                            "0/0"
                    }
                </span>


                <Button onClick={nextMatch} style={{ marginRight: '10px', border: "none", background: "white" }} data-tooltip-id="common" data-tooltip-content={"next"}>
                    <ArrowDownwardIcon fontSize="small" />
                </Button>

                {

                    editable && (


                        <Button onClick={reset} data-tooltip-id="common" data-tooltip-content={"Reset structure"}><RestartAltIcon fontSize="small" /></Button>



                    )



                }

              

            </div>




            {/* <div style={{ padding:"8px", textAlign:"right" }}> */}



        <div style={{gap:"5px"}}>
                {
                tree.map(node => (

                    <NodeTree

                        key={node.id}

                        node={node}

                        tree={tree}

                        setTree={updateTreeData}

                        selectedNodeId={selectedNodeId}

                        setSelectedNodeId={setSelectedNodeId}

                        editable={editable}

                        selectedHierarchy={selectedHierarchy}

                        selectedContainerName={selectedContainerName}

                        editNode={editNode}

                        deleteNode={deleteNode}

                        addChildNode={addChildNode}
                        search={search}
                        registerMatchRef={registerMatchRef}
                        activeMatch={activeMatch}
                        matches={matches}
                        approval={approval}
                 
                       
                    />

                ))
            }
        </div>






            <Tooltip id="common" />


        </div>

    );

}


export default TreeView;