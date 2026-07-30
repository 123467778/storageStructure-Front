import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import useStructureTree from "./useStructureTree";
import { Dialog } from "@progress/kendo-react-dialogs";
import AddIcon from "@mui/icons-material/Add";
import { uuidGeneration } from "./treeGenerator";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';




import TreeView from "./TreeView";

function StructureMapping() {

    const [scontainername, setContainername] = useState("");
    const [sdescription, setDescription] = useState("");

    const [hierarchicals, setHierarchical] = useState([]);
    const [selected, setSelected] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(5);

    const [structure, setStructure] = useState([]);

    var approval = false;

    const {
        treeData,
        showTreeDialog,

        handleStructure,
        setShowTreeDialog,
        setTreeData

    } = useStructureTree();

    const [editDialog, setEditDialog] = useState(false);
    const [selectedContainerName, setSelectedContainerName] = useState("");
    const [selectedHierarchy, setSelectedHierarchy] = useState("");

    const styles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
        },
        modal: {
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            minWidth: "450px"
        }
    };

    useEffect(() => {
        axios.get("http://localhost:8081/structure/getHierarchical")
            .then(res => setHierarchical(res.data))
            .catch(err => console.log(err));
    }, []);



    const loadStructure = () => {
        axios.get("http://localhost:8081/structure/getMap")
            .then(res => setStructure(res.data))
            .catch(err => console.log(err));
    };


    useEffect(() => {
        loadStructure();
    }, []);




    const options = hierarchicals.map(item => ({
        value: item.id,
        label: item.HierarchicalName
    }));



    const handleSave = () => {

        if (!scontainername) {
            alert("Container name is must");
            return;

        }

        if (!selected) {
            alert("select Hierarchical Name");
        }


        const isDuplicate = structure.some(
            item => item.scontainername.toLowerCase() === scontainername.toLowerCase()
        );

        if (isDuplicate) {
            alert("Container name already exists");
            return;
        }







        const data = {
            scontainername,
            sdescription,
            nhierarchicalid: selected?.value,
            nodedata: {
                tree: getDisplayTree(scontainername)
            }
        };

        console.log("treeData:", treeData);
        console.log("Payload:", JSON.stringify(data, null, 2));


        console.log("Save Payload:", JSON.stringify(data, null, 2));

        axios.post("http://localhost:8081/structure/createMap", data)
            .then(() => {
                alert("Saved Successfully");
                setIsOpen(false);
                loadStructure();
                console.log("Node data saved:", data.nodedata);
            })
            .catch(err => console.log(err));

        setContainername("");
        setDescription("");
        setSelected(null);
    };

    const getTree = async (containerName) => {
        try {
            setSelectedContainerName(containerName);

            const res = await axios.get(
                `http://localhost:8081/structure/getTree/${containerName}`
            );

            console.log("Get Tree:", res.data);


            setTreeData(res.data.tree);
        } catch (err) {
            console.error(err);
        }


    };


    const pagedData = structure.slice(skip, skip + take);

    const pageChange = (event) => {
        setSkip(event.page.skip);
        setTake(event.page.take);
    };


    const nodeNaming = (nodes, containerName) => {
        return nodes.map(node => {

            const currentName = node.name || "";

            const numberPart =
                currentName.replace(/^[^\d]+/, "");

            const newName =
                `${containerName}${numberPart}`;

            return {
                ...node,
                name: newName,
                displayName: newName,
                children: nodeNaming(node.children || [], containerName)
            };
        });
    };



    // const getDisplayTree = (containerName) => {
    //     if (!containerName || !treeData.length) return treeData;
    //     return nodeNaming(treeData, containerName);
    // };

    const getDisplayTree = (containerName) => {
        if (!containerName || !treeData.length) {
            return [];
        }

        const childNodes = nodeNaming(treeData, containerName);

        return [
            {
                id: 1,
                key: uuidGeneration(),
                name: containerName,
                displayName: containerName,
                isRoot: true,
                icon: "freezer",
                isLeaf: false,
                children: childNodes
            }
        ];
    };


    //   const getAllTree = async ()=>{
    //             const res = await axios.get( `http://localhost:8081/structure/getNodeData`);


    //             return res.data;


    //         }

    // const approveAction = async(dataItem)=>{

    //     const dataTree = await getAllTree();


    // const isDuplicateName = (nodes, naming) => {

    //   return nodes.some(node =>
    //     node.displayName?.trim().toLowerCase() ===
    //       naming.trim().toLowerCase() ||
    //     isDuplicateName(node.children || [],naming)
    //   );
    // };

    // //const data = await getTree(dataItem.scontainername);

    // // const allNames = [];
    // // const collectNames = (nodes) => {
    // // nodes.forEach(node => {
    // // allNames.push(node.displayName);
    // // collectNames(node.children || []);
    // // });

    // // };

    // // data.forEach(item => collectNames(item.tree));

    // //const data = await getTree(dataItem.scontainername);

    // const treeResponse = await axios.get(
    // `http://localhost:8081/structure/getTree/${dataItem.scontainername}`
    // );
    // const tree = treeResponse.data.tree;

    // const allNames = [];

    // const collectNames = (nodes) => {
    //   nodes.forEach(node => {
    //     allNames.push(node.displayName);
    //     collectNames(node.children || []);
    //   });
    // };

    // collectNames(tree);

    // console.log(allNames);

    // const isDuplicate = dataTree.some(item =>
    //   isDuplicateName(item.tree,tree)
    // );

    // if (isDuplicate) {
    //   alert("Node name already exists");

    //   return;
    // }


    // }

    const getAllTree = async () => {
        const res = await axios.get(
            "http://localhost:8081/structure/getNodeData"
        );
        return res.data;
    };

    // const approveAction = async (dataItem) => {
    //   const dataTree = await getAllTree();

    //   const treeResponse = await axios.get(
    //     `http://localhost:8081/structure/getTree/${dataItem.scontainername}`
    //   );

    //   const tree = treeResponse.data.tree;

    //   const allNames = [];

    //   const collectNames = (nodes) => {
    //     nodes.forEach((node) => {
    //       if (node.displayName) {
    //         allNames.push(node.displayName.trim().toLowerCase());
    //       }

    //       collectNames(node.children || []);
    //     });
    //   };

    //   collectNames(tree);

    //   const isDuplicateName = (nodes, name) => {
    //     return nodes.some(
    //       (node) =>
    //         node.displayName?.trim().toLowerCase() === name ||
    //         isDuplicateName(node.children || [], name)
    //     );
    //   };


    //  const isDuplicate = dataTree.some(
    //   item =>
    //     item.scontainername !== dataItem.scontainername &&
    //     isDuplicateName(item.tree, allNames)
    // );



    //   if (isDuplicate) {
    //     alert("Node name already exists");
    //     return;
    //   }

    //   else{
    //     alert("Approved")
    //   }
    // };

    // const approveAction = async (dataItem) => {
    //    try {
    //     const dataTree = await getAllTree();

    //     // Tree being approved
    //     const treeResponse = await axios.get(
    //       `http://localhost:8081/structure/getTree/${dataItem.scontainername}`
    //     );

    //     const currentTree = treeResponse.data.tree;

    //     // Collect all node names from current tree
    //     const currentTreeNames = new Set();

    //     const collectNames = (nodes, targetSet) => {
    //       nodes.forEach((node) => {
    //         if (node.displayName) {
    //           targetSet.add(node.displayName.trim().toLowerCase());
    //         }

    //         if (node.children?.length) {
    //           collectNames(node.children, targetSet);
    //         }
    //       });
    //     };

    //     collectNames(currentTree, currentTreeNames);

    //     // Check all other trees
    //     let duplicateFound = false;
    //     let duplicateName = "";

    //     for (const item of dataTree) {
    //       // Skip current tree
    //       if (item.root.displayName === dataItem.scontainername) {
    //         continue;
    //       }

    //       const checkDuplicates = (nodes) => {
    //         for (const node of nodes) {
    //           const nodeName = node.displayName?.trim().toLowerCase();

    //           if (nodeName && currentTreeNames.has(nodeName)) {
    //             duplicateFound = true;
    //             duplicateName = node.displayName;
    //             return;
    //           }

    //           if (node.children?.length) {
    //             checkDuplicates(node.children);
    //           }

    //           if (duplicateFound) return;
    //         }
    //       };

    //       checkDuplicates(item.tree || []);

    //       if (duplicateFound) break;
    //     }

    //     if (duplicateFound) {
    //       alert(`Node name "${duplicateName}" already exists in another tree`);
    //       return;
    //     }

    //     alert("Approved");
    //   } catch (error) {
    //     console.error(error);
    //     alert("Error while validating trees");
    //   }

    // };

    const approveAction = async (dataItem) => {
        if(dataItem.status!=="approved"){
          
             try {
            const dataTree = await getAllTree();

            const treeResponse = await axios.get(
                `http://localhost:8081/structure/getTree/${dataItem.scontainername}`
            );

            const currentTree = treeResponse.data.tree;

            const currentTreeNames = new Set();

            const collectNames = (nodes) => {
                nodes.forEach((node) => {
                    if (node.displayName) {
                        currentTreeNames.add(node.displayName.trim().toLowerCase());
                    }

                    if (node.children?.length) {
                        collectNames(node.children);
                    }
                });
            };

            collectNames(currentTree);

            for (const item of dataTree) {

                if (item.tree?.[0]?.displayName === dataItem.scontainername) continue;

                const checkNodes = (nodes) => {
                    for (const node of nodes) {

                        const name = node.displayName?.trim().toLowerCase();

                        if (name && currentTreeNames.has(name)) {
                            alert(`Duplicate node found: ${node.displayName}`);
                            return true;
                        }

                        if (node.children?.length && checkNodes(node.children)) {
                            return true;
                        }
                    }

                    return false;
                };

                if (checkNodes(item.tree || [])) {
                    return;
                }
            }



            alert("Approve");

            axios.put(

                `http://localhost:8081/structure/getApprove/${dataItem.scontainername}`);

            setStructure(prev =>

                prev.map(item =>

                    item.scontainername === dataItem.scontainername

                        ? { ...item, status: "approved" }

                        : item

                )

            );
    
            }
    
    catch (error) {
                console.error(error);
                alert("Error while validating.");
            }
        }
       
        };



        return (
            <>
                <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
                    {/* <Button onClick={() => setIsOpen(true)}>Add</Button> */}
                    <Button onClick={() => setIsOpen(true)} style={{ background: "white", cursor: "pointer" }}> <AddIcon style={{ color: "rgb(35, 122, 253)" }}></AddIcon></Button>

                </div>
                {isOpen && (
                    <div
                        style={styles.overlay}
                        onClick={() => setIsOpen(false)}
                    >
                        <div
                            style={styles.modal}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button onClick={() => setIsOpen(false)} style={{ justifyContent: "end" }}>X</Button>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Container Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={scontainername}
                                    onChange={(e) =>
                                        setContainername(e.target.value)
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={sdescription}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>

                            <div style={{ width: "300px", marginBottom: "20px" }}>
                                <label className="form-label">
                                    Select Hierarchical Name
                                </label>

                                <Select
                                    options={options}
                                    value={selected}

                                    onChange={async (option) => {
                                        setSelected(option);

                                        if (option) {
                                            await handleStructure(option.label);
                                        }
                                    }}
                                    placeholder="Select HierarchicalName"
                                    isClearable
                                />
                            </div>

                            <Button onClick={handleSave}>Save</Button>
                        </div>
                    </div>
                )}

                <Grid
                    data={pagedData}
                    skip={skip}
                    take={take}
                    total={structure.length}
                    pageable
                    onPageChange={pageChange}
                >
                    <GridColumn field="scontainername" title="Container Name" />
                    <GridColumn field="sdescription" title="Description" />
                    <GridColumn field="shierarchicalname" title="Hierarchical Name" />

                    <GridColumn
                        title="Actions"
                        cell={(props) => (
                            <td>

                                <Button
                                    style={{ margin: "5px" }}
                                    onClick={() => {

                                        getTree(props.dataItem.scontainername)
                                        setShowTreeDialog(true);
                                    }}
                                >
                                    View
                                </Button>

                                <Button
                                    onClick={() => {
                                        setSelectedHierarchy(props.dataItem.shierarchicalname);
                                        getTree(props.dataItem.scontainername);
                                        setEditDialog(true);
                                    }}
                                    style={{ marginRight: "8px" }}
                                    disabled={props.dataItem.status === "approved"}

                                >
                                    Edit
                                </Button>

                                <Button data-tooltip-id="common" data-tooltip-content={"Approve structure"} onClick={() => {
                                    approveAction(props.dataItem)
                                }} >
                                    <ThumbUpAltIcon fontSize="small" style={{ color: props.dataItem.status === "approved" ? "#2e7d32" : "#9e9e9e" }} />
                                </Button>

                            </td>
                        )}
                    />
                </Grid>

                {showTreeDialog && (
                    <Dialog
                        title="Structure Tree"
                        width={600}
                        onClose={() => setShowTreeDialog(false)}
                    >
                        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                            <TreeView
                                // data={getDisplayTree(selectedContainerName)}
                                data={treeData}
                                editable={false}
                                selectedContainerName={selectedContainerName}
                            // onEditNode={() => {}}
                            />
                        </div>
                    </Dialog>
                )}

                {editDialog && (
                    <Dialog
                        title="Structure Tree"
                        width={600}
                        onClose={() => setEditDialog(false)}
                    >
                        <div style={{ maxHeight: "500px", overflowY: "auto", border: "1px solid #ddd", }}>
                            <TreeView
                                // data={getDisplayTree(selectedContainerName)}
                                data={treeData}

                                editable={true}
                                selectedContainerName={selectedContainerName}
                                onTreeChange={setTreeData}
                                selectedHierarchy={selectedHierarchy}
                                handleStructure={handleStructure}
                                approval={approval}


                            />
                        </div>
                    </Dialog>
                )}
            </>
        );
    }

    export default StructureMapping;



