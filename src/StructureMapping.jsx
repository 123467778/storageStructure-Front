// import { Button } from "@progress/kendo-react-buttons";
// import { Grid, GridColumn } from "@progress/kendo-react-grid";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Select from "react-select";
// import useStructureTree from "./useStructureTree";
// import { Dialog } from "@progress/kendo-react-dialogs";
// import TreeView from "./TreeView";

// function StructureMapping() {
//     const [scontainername, setContainername] = useState("");
//     const [sdescription, setDescription] = useState("");

//     const [hierarchicals, setHierarchical] = useState([]);
//     const [selected, setSelected] = useState(null);

//     const [isOpen, setIsOpen] = useState(false); 

//     const [skip, setSkip] = useState(0);
//     const [take, setTake] = useState(5);

//     const [structure, setStructure] = useState([]);

//     const { treeData,showTreeDialog,selectedHierarchy ,handleStructure,setShowTreeDialog} = useStructureTree();

//     const [editDialog, setEditDialog] = useState(false);

//     const [selectedContainerName, setSelectedContainerName] = useState("");


//      const styles = {
//         overlay: {
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: "rgba(0,0,0,0.5)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 9999
//         },
//         modal: {
//             background: "white",
//             padding: "20px",
//             borderRadius: "8px",
//             minWidth: "450px"
//         }
//     };


//     useEffect(() => {
//         axios
//             .get("http://localhost:8081/structure/getHierarchical")
//             .then((res) => setHierarchical(res.data))    
//             .catch((err) => console.log(err));
//     }, []);

//             console.log("Hierarchical Response ",hierarchicals); 

//     const loadStructure = () => {
//         axios
//             .get("http://localhost:8081/structure/getMap")
//             .then((res) => setStructure(res.data))
//             .catch((err) => console.log(err));
//     };

//     useEffect(() => {
//         loadStructure();
//     }, []);

//     const options = hierarchicals.map((item) => ({
//         value: item.id,
//         label: item.HierarchicalName,
//     }));

//     const handleSave = () => {
//         const data = {
//             scontainername,
//             sdescription,
//             nhierarchicalid: selected?.value,
//             nodedata: {
//                 tree: treeData
//             }
//         };

//         axios
//             .post("http://localhost:8081/structure/createMap", data)
//             .then(() => {
//                 alert("Saved Successfully");
//                 setIsOpen(false);
//                 loadStructure();
//             })
//             .catch((err) => console.log(err));

//         setContainername("");
//         setDescription("");
//         setSelected(null);
//     };











//     const pagedData = structure.slice(skip, skip + take);

//     const pageChange = (event) => {
//         setSkip(event.page.skip);
//         setTake(event.page.take);
//     };

//     const nodeNaming = (nodes, containerName) => {
//         return nodes.map(node => ({
//             ...node,
//             name: `${containerName}${node.name.replace(/\D/g, "")}`,
//             children: nodeNaming(node.children || [], containerName)
//         }));
//     };

//     const getDisplayTree = (containerName) => {
//         if (!containerName || !treeData.length) return treeData;
//         return nodeNaming(treeData, containerName);
//     };

//     return (
//         <>
//             <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
//                 <Button onClick={() => setIsOpen(true)}>Add</Button>
//             </div>

//             {/* {isOpen && (
//                 <div
//                     style={

//                        styles.overlay
//                     }
//                     onClick={() => setIsOpen(false)}
//                 >
//                     <div
//                         style={

//                             styles.modal
//                         }
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <Button onClick={() => setIsOpen(false)}>X</Button>

//                         <input
//                             placeholder="Container Name"
//                             value={scontainername}
//                             onChange={(e) => setContainername(e.target.value)}
//                         />

//                         <input
//                             placeholder="Description"
//                             value={sdescription}
//                             onChange={(e) => setDescription(e.target.value)}
//                         />

//                         <Select
//                             options={options}
//                             value={selected}
//                             onChange={setSelected}
//                             isClearable
//                         />

//                         <Button onClick={handleSave}>Save</Button>
//                     </div>
//                 </div>
//             )} */}


//   {isOpen && (
//                 <div
//                     style={styles.overlay}
//                     onClick={() => setIsOpen(false)}
//                 >
//                     <div
//                         style={styles.modal}
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <div style={{display:"flex" ,justifyContent:"flex-end"}}>
//                             <Button onClick={() => setIsOpen(false)} style={{justifyContent:"end"}}>X</Button>
//                         </div>

//                         <div className="mb-3">
//                             <label className="form-label">
//                                 Container Name
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={scontainername}
//                                 onChange={(e) =>
//                                     setContainername(e.target.value)
//                                 }
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label className="form-label">
//                                 Description
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={sdescription}
//                                 onChange={(e) =>
//                                     setDescription(e.target.value)
//                                 }
//                             />
//                         </div>

//                         <div style={{ width: "300px", marginBottom: "20px" }}>
//                             <label className="form-label">
//                                 Select Hierarchical Name
//                             </label>

//                             <Select
//                                 options={options}
//                                 value={selected}
//                                 onChange={setSelected}
//                                 placeholder="Select HierarchicalName"
//                                 isClearable
//                             />
//                         </div>

//                         <Button onClick={handleSave}>Save</Button>
//                     </div>
//                 </div>
//             )}





//             <Grid
//                 data={pagedData}
//                 skip={skip}
//                 take={take}
//                 total={structure.length}
//                 pageable
//                 onPageChange={pageChange}
//             >
//                 <GridColumn field="scontainername" title="Container Name" />
//                 <GridColumn field="sdescription" title="Description" />
//                 <GridColumn field="shierarchicalname" title="Hierarchical Name" />

//                 <GridColumn
//                     title="Actions"
//                     cell={(props) => (
//                         <td>
//                             <Button
//                                 style={{ margin: "5px" }}
//                                 onClick={() => {
//                                     setSelectedContainerName(props.dataItem.scontainername);
//                                     handleStructure(props.dataItem.shierarchicalname);
//                                     setShowTreeDialog(true);
//                                 }}
//                             >
//                                 View
//                             </Button>

//                             <Button
//                                 onClick={async () => {
//                                     setSelectedContainerName(props.dataItem.scontainername);
//                                     await handleStructure(props.dataItem.shierarchicalname);
//                                     setShowTreeDialog(false);
//                                     setEditDialog(true);
//                                 }}
//                             >
//                                 Edit
//                             </Button>
//                         </td>
//                     )}
//                 />
//             </Grid>

//             {showTreeDialog && (
//                 <Dialog
//                     title="Structure Tree"
//                     width={600}
//                     onClose={() => setShowTreeDialog(false)}
//                 >
//                     <div style={{maxHeight:"500px",overflowY:"auto"}}>
//                         <TreeView
//                         data={getDisplayTree(selectedContainerName)}
//                         selectedContainerName={selectedContainerName}

//                         hierarchicalName={selectedHierarchy}
//                         editable={false}
//                     />
//                     </div>
//                 </Dialog>
//             )}

//             {editDialog && (
//                 <Dialog
//                     title="Structure Tree"
//                     width={600}
//                     onClose={() => setEditDialog(false)}
//                 >
//                         <div style={{maxHeight:"500px",overflowY:"auto"}}>
//                             <TreeView
//                         data={getDisplayTree(selectedContainerName)}
//                       selectedContainerName={selectedContainerName}
//                         hierarchicalName={selectedHierarchy}
//                         editable={true}
//                     />
//                         </div>

//                 </Dialog>
//             )}
//         </>
//     );
// }

// export default StructureMapping;







// import { Button } from "@progress/kendo-react-buttons";
// import { Grid, GridColumn } from "@progress/kendo-react-grid";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Select from "react-select";
// import useStructureTree from "./useStructureTree";
// import { Dialog } from "@progress/kendo-react-dialogs";
// import TreeView from "./TreeView";

// function StructureMapping() {
//     const [scontainername, setContainername] = useState("");
//     const [sdescription, setDescription] = useState("");

//     const [hierarchicals, setHierarchical] = useState([]);
//     const [selected, setSelected] = useState(null);

//     const [isOpen, setIsOpen] = useState(false);

//     const [skip, setSkip] = useState(0);
//     const [take, setTake] = useState(5);

//     const [structure, setStructure] = useState([]);

//     const { treeData, showTreeDialog, selectedHierarchy, handleStructure, setShowTreeDialog ,setTreeData} = useStructureTree();

//     const [editDialog, setEditDialog] = useState(false);

//     const [selectedContainerName, setSelectedContainerName] = useState("");


//     const styles = {
//         overlay: {
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: "rgba(0,0,0,0.5)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 9999
//         },
//         modal: {
//             background: "white",
//             padding: "20px",
//             borderRadius: "8px",
//             minWidth: "450px"
//         }
//     };


//     useEffect(() => {
//         axios
//             .get("http://localhost:8081/structure/getHierarchical")
//             .then((res) => setHierarchical(res.data))
//             .catch((err) => console.log(err));
//     }, []);

//     console.log("Hierarchical Response ", hierarchicals);

//     const loadStructure = () => {
//         axios
//             .get("http://localhost:8081/structure/getMap")
//             .then((res) => setStructure(res.data))
//             .catch((err) => console.log(err));
//     };

//     useEffect(() => {
//         loadStructure();
//     }, []);

//     const options = hierarchicals.map((item) => ({
//         value: item.id,
//         label: item.HierarchicalName,
//     }));

//     const handleSave = () => {
//         const data = {
//             scontainername,
//             sdescription,
//             nhierarchicalid: selected?.value,
//             nodedata: {
//                 tree: treeData
//             }
//         };

//         axios
//             .post("http://localhost:8081/structure/createMap", data)
//             .then(() => {
//                 alert("Saved Successfully");
//                 setIsOpen(false);
//                 loadStructure();
//             })
//             .catch((err) => console.log(err));

//         setContainername("");
//         setDescription("");
//         setSelected(null);
//     };


//     const normalizeTree = (data) => {

//         // Case 1: original backend (List<Level>)
//         if (Array.isArray(data)) {
//             return data;
//         }

//         // Case 2: edited backend (Map with "tree")
//         if (data && data.tree) {
//             return data.tree;
//         }

//         return [];
//     };




//     const loadTree = async (containerName, hierarchicalName) => {

//         const res = await axios.get(
//             `http://localhost:8081/structure/getEditNode/${containerName}/${hierarchicalName}`
//         );

//         const normalized = normalizeTree(res.data);

//         setTreeData(normalized);
//     };







//     const pagedData = structure.slice(skip, skip + take);

//     const pageChange = (event) => {
//         setSkip(event.page.skip);
//         setTake(event.page.take);
//     };

//     const nodeNaming = (nodes, containerName) => {
//         return nodes.map(node => ({
//             ...node,
//             name: `${containerName}${node.name.replace(/\D/g, "")}`,
//             children: nodeNaming(node.children || [], containerName)
//         }));
//     };

//     const getDisplayTree = (containerName) => {
//         if (!containerName || !treeData.length) return treeData;
//         return nodeNaming(treeData, containerName);
//     };

//     return (
//         <>
//             <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
//                 <Button onClick={() => setIsOpen(true)}>Add</Button>
//             </div>




//             {isOpen && (
//                 <div
//                     style={styles.overlay}
//                     onClick={() => setIsOpen(false)}
//                 >
//                     <div
//                         style={styles.modal}
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                             <Button onClick={() => setIsOpen(false)} style={{ justifyContent: "end" }}>X</Button>
//                         </div>

//                         <div className="mb-3">
//                             <label className="form-label">
//                                 Container Name
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={scontainername}
//                                 onChange={(e) =>
//                                     setContainername(e.target.value)
//                                 }
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <label className="form-label">
//                                 Description
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={sdescription}
//                                 onChange={(e) =>
//                                     setDescription(e.target.value)
//                                 }
//                             />
//                         </div>

//                         <div style={{ width: "300px", marginBottom: "20px" }}>
//                             <label className="form-label">
//                                 Select Hierarchical Name
//                             </label>

//                             <Select
//                                 options={options}
//                                 value={selected}
//                                 onChange={setSelected}
//                                 placeholder="Select HierarchicalName"
//                                 isClearable
//                             />
//                         </div>

//                         <Button onClick={handleSave}>Save</Button>
//                     </div>
//                 </div>
//             )}





//             <Grid
//                 data={pagedData}
//                 skip={skip}
//                 take={take}
//                 total={structure.length}
//                 pageable
//                 onPageChange={pageChange}
//             >
//                 <GridColumn field="scontainername" title="Container Name" />
//                 <GridColumn field="sdescription" title="Description" />
//                 <GridColumn field="shierarchicalname" title="Hierarchical Name" />

//                 <GridColumn
//                     title="Actions"
//                     cell={(props) => (
//                         <td>
//                             <Button
//                                 style={{ margin: "5px" }}
//                                 onClick={() => {
//                                     loadTree(
//                                         props.dataItem.scontainername,
//                                         props.dataItem.shierarchicalname
//                                     );
//                                     setShowTreeDialog(true);
//                                 }}
//                             >
//                                 View
//                             </Button>

//                             <Button
//                                 onClick={() => {
//                                     loadTree(
//                                         props.dataItem.scontainername,
//                                         props.dataItem.shierarchicalname
//                                     );
//                                     setEditDialog(true);
//                                 }}
//                             >
//                                 Edit
//                             </Button>
//                         </td>
//                     )}
//                 />
//             </Grid>

//             {showTreeDialog && (
//                 <Dialog
//                     title="Structure Tree"
//                     width={600}
//                     onClose={() => setShowTreeDialog(false)}
//                 >
//                     <div style={{ maxHeight: "500px", overflowY: "auto" }}>
//                         <TreeView
//                             data={getDisplayTree(selectedContainerName)}
//                             selectedContainerName={selectedContainerName}

//                             hierarchicalName={selectedHierarchy}
//                             editable={false}
//                         />
//                     </div>
//                 </Dialog>
//             )}

//             {editDialog && (
//                 <Dialog
//                     title="Structure Tree"
//                     width={600}
//                     onClose={() => setEditDialog(false)}
//                 >
//                     <div style={{ maxHeight: "500px", overflowY: "auto" }}>
//                         <TreeView
//                             data={getDisplayTree(selectedContainerName)}
//                             selectedContainerName={selectedContainerName}
//                             hierarchicalName={selectedHierarchy}
//                             editable={true}
//                         />
//                     </div>

//                 </Dialog>
//             )}
//         </>
//     );
// }

// export default StructureMapping;









import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import useStructureTree from "./useStructureTree";
import { Dialog } from "@progress/kendo-react-dialogs";
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
        const data = {
            scontainername,
            sdescription,
            nhierarchicalid: selected?.value,
            nodedata: {
                tree: treeData
            }
        };

        axios.post("http://localhost:8081/structure/createMap", data)
            .then(() => {
                alert("Saved Successfully");
                setIsOpen(false);
                loadStructure();
            })
            .catch(err => console.log(err));

        setContainername("");
        setDescription("");
        setSelected(null);
    };

    const normalizeTree = (data) => {
        if (Array.isArray(data)) return data;
        if (data && data.tree) return data.tree;
        return [];
    };

    const loadTree = async (containerName, hierarchicalName) => {

        setSelectedContainerName(containerName); 

        const res = await axios.get(
            `http://localhost:8081/structure/getEditNode/${containerName}/${hierarchicalName}`
        );

        const normalized = normalizeTree(res.data);
        setTreeData(normalized);
    };

    const pagedData = structure.slice(skip, skip + take);

    const pageChange = (event) => {
        setSkip(event.page.skip);
        setTake(event.page.take);
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
                <Button onClick={() => setIsOpen(true)}>Add</Button>
            </div>

            {isOpen && (
                <div style={styles.overlay} onClick={() => setIsOpen(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

                        <input
                            placeholder="Container Name"
                            value={scontainername}
                            onChange={(e) => setContainername(e.target.value)}
                        />

                        <input
                            placeholder="Description"
                            value={sdescription}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <Select
                            options={options}
                            value={selected}
                            onChange={setSelected}
                        />

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
                                    loadTree(
                                        props.dataItem.scontainername,
                                        props.dataItem.shierarchicalname
                                    );
                                    setShowTreeDialog(true);
                                }}
                            >
                                View
                            </Button>

                            <Button
                                onClick={() => {
                                    loadTree(
                                        props.dataItem.scontainername,
                                        props.dataItem.shierarchicalname
                                    );
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
                            data={treeData}
                            editable={false}
                            selectedContainerName={selectedContainerName}
                            onEditNode={() => {}}
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
                            data={treeData}
                            editable={true}
                            selectedContainerName={selectedContainerName}
                        />
                    </div>
                </Dialog>
            )}
        </>
    );
}

export default StructureMapping;



