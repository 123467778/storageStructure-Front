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
            .then(res => {setStructure(res.data)})
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
            return;
        }


        // const isDuplicate = structure.some(
        //     item => item.scontainername.toLowerCase() === scontainername.toLowerCase()
        // );
        // //  const isDuplicate = structure.some(
        // //     item => item.scontainername === scontainername
        // // );

        // if (isDuplicate) {
        //     alert("Container name already exists");
        //     setContainername("");
        //     setDescription("");
        //     setSelected(null);

        //     return;
        // }







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
            // .catch(err => alert(err.response?.data?.message));
            .catch(err => {
  console.log(err);
  console.log(err.response);
  console.log(err.response?.data);
  alert(err.response?.data);
});

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



    const getAllTree = async () => {
        const res = await axios.get(
            "http://localhost:8081/structure/getNodeData"
        );
        return res.data;
    };

   

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

       

const duplicate = new Set();

for (const item of dataTree) {
    if (item.tree?.[0]?.displayName === dataItem.scontainername) continue;

    const checkNodes = (nodes) => {
        for (const node of nodes) {
            const name = node.displayName?.trim().toLowerCase();

            if (name && currentTreeNames.has(name)) {
                duplicate.add(name.toUpperCase());
            }

            if (node.children?.length) {
                checkNodes(node.children);
            }
        }
    };

    checkNodes(item.tree || []);
}

if (duplicate.size > 0) {
    alert(
        `Duplicate node found: ${[...duplicate]}`
    );
   
    return;
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
                    <GridColumn field="status" title="Status" />


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



