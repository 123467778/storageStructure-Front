import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import useStructureTree from "./useStructureTree";
import { Dialog } from "@progress/kendo-react-dialogs";
import AddIcon from "@mui/icons-material/Add";

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

    const {
        treeData,
        showTreeDialog,
        selectedHierarchy,
        handleStructure,
        setShowTreeDialog,
        setTreeData
    } = useStructureTree();

    const [editDialog, setEditDialog] = useState(false);
    const [selectedContainerName, setSelectedContainerName] = useState("");

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

       if(!scontainername){
        alert("Container name is must");
        return;
        
       }

       if(!selected){
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





    // const normalizeTree = (data) => {
    //     if (Array.isArray(data)) return data;
    //     if (data && data.tree) return data.tree;
    //     return [];
    // };

    // const loadTree = async (containerName, hierarchicalName) => {

    //     setSelectedContainerName(containerName);

    //     const res = await axios.get(
    //         `http://localhost:8081/structure/getEditNode/${containerName}`
    //     );

    //     console.log("LoadTree", res.data);

    //     setTreeData(res.data);
    // };


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

    // const nodeNaming = (nodes, containerName) => {
    //     return nodes.map(node => ({
    //         ...node,
    //          name: `${containerName}${node.name.replace(/\D/g, "")}`,
    //         displayName: `${containerName}${node.name.replace(/\D/g, "")}`,

    //         children: nodeNaming(node.children || [], containerName)
    //     }));
    // };



    // const nodeNaming = (nodes, containerName) => {
    //     return nodes.map(node => ({
    //         ...node,

    //         name: `${containerName}${node.name.replace(/\D/g, "")}`,

    //         displayName: `${containerName}${node.name.replace(/\D/g, "")}`,

    //         children: nodeNaming(
    //             node.children || [],
    //             containerName
    //         )
    //     }));
    // };

// const nodeNaming = (nodes, containerName) => {

//     return nodes.map(node => {

//         const CurrentName = node.nodeName || node.name;

//         return {
//             ...node,

//             displayName: CurrentName,

//             children: nodeNaming(
//                 node.children || [],
//                 containerName
//             )
//         };

//     });

// };


// const nodeNaming = (nodes, containerName) => {

//     return nodes.map(node => {

//         const currentName =
//             node.nodeName || node.name || "";


//         const numberPart =
//             currentName.match(/\d+$/)?.[0] || "";


//         return {
//             ...node,
//             name:`${containerName}${numberPart}`,
//             displayName:
//                 `${containerName}${numberPart}`,

//             children: nodeNaming(
//                 node.children || [],
//                 containerName
//             )
//         };

//     });

// };


// const nodeNaming = (nodes, containerName) => {

//     return nodes.map(node => {

//         const currentName =
//             node.nodeName || node.name || "";


//         const numberPart =
//             currentName.match(/\d+$/)?.[0] || "";


//         const newName =
//             `${containerName}${numberPart}`;


//         return {
//             ...node,

//             name: newName,

//             displayName: newName,

//             children: nodeNaming(
//                 node.children || [],
//                 containerName
//             )
//         };

//     });

// };




// const nodeNaming = (nodes, containerName) => {

//     return nodes.map(node => {

//         const currentName = node.name || "";

//         // extract only numeric hierarchy
//         const numberPart =
//             currentName.match(/\d+/g)?.join("") || "";


//         const newName =
//             `${containerName}${numberPart}`;


//         return {

//             ...node,

//             name: newName,

//             displayName: newName,


//             children: nodeNaming(
//                 node.children || [],
//                 containerName
//             )
//         };

//     });

// };




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










    const getDisplayTree = (containerName) => {
        if (!containerName || !treeData.length) return treeData;
        return nodeNaming(treeData, containerName);
    };


    console.log("treeData:", treeData);
    console.log("displayTree:", getDisplayTree(selectedContainerName));


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

                                    getTree(props.dataItem.scontainername);
                                    setEditDialog(true);
                                }}
                            >
                                Edit
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
                    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <TreeView
                            // data={getDisplayTree(selectedContainerName)}
                                                        data={treeData}

                            editable={true}
                            selectedContainerName={selectedContainerName}
                            onTreeChange={setTreeData}

                        />
                    </div>
                </Dialog>
            )}
        </>
    );
}

export default StructureMapping;



