import { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import AddIcon from "@mui/icons-material/Add"
import { Dialog } from "@progress/kendo-react-dialogs";
import AddStructure from "./AddStructure";
import axios from "axios";

import GetStructure from "./GetStructure";
import TreeView from "./TreeView";
import useStructureTree from "./useStructureTree";

function GetHierarchical() {
    const [structures, setStructures] = useState([]);
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(5);

    const [showDialog, setShowDialog] = useState(false);
    const [selectedHierarchyName, setSelectedHierarchyName] = useState("");

    const { treeData, showTreeDialog, selectedHierarchy, handleStructure, setShowTreeDialog } = useStructureTree();


    const [showAddStructure, setShowAddStructure] = useState(false);



    useEffect(() => {
        axios
            .get("http://localhost:8081/structure/getHierarchical")
            .then((res) => setStructures(res.data))
            .catch(console.error);
    }, []);



    const pageChange = (event) => {
        setSkip(event.page.skip);
        setTake(event.page.take);
    };

    const handleView = (dataItem) => {
        setSelectedHierarchyName(dataItem.HierarchicalName);
        setShowDialog(true);
    };

    const pagedData = structures.slice(skip, skip + take);


    const handleAddStructure = () => {
        setShowAddStructure(true);
    }

    return (
        <>

            <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }} >
                {/* <button type="button" className="btn btn-light" onClick={handleAddStructure} >+</button> */}
                                <Button onClick={handleAddStructure} style={{ background: "white", cursor: "pointer" }}> <AddIcon style={{ color: "rgb(35, 122, 253)" }}></AddIcon></Button>


            </div>



            <h1>Hierarchical</h1>

            <Grid
                data={pagedData}
                skip={skip}
                take={take}
                total={structures.length}
                pageable={true}
                onPageChange={pageChange}
            >
                <GridColumn
                    field="HierarchicalName"
                    title="Hierarchical Name"
                />

                <GridColumn
                    field="description"
                    title="Description"
                />

                <GridColumn
                    title="Actions"
                    width="200px"
                    cell={(props) => (
                        <td>
                            <Button
                                style={{ margin: "5px" }}
                                onClick={() => handleView(props.dataItem)}
                            >
                                View
                            </Button>

                            <Button
                            
                                onClick={ () =>
                                         
                                    handleStructure(

                                        props.dataItem.HierarchicalName
                                    )
                                }
                            >
                                Structure
                            </Button>
                        </td>
                    )}
                />
            </Grid>

            {showDialog && (
                <Dialog
                    title="Structure Details"
                    width={800}
                    onClose={() => setShowDialog(false)}
                >
                    <GetStructure
                        hierarchicalName={selectedHierarchyName}
                    />
                </Dialog>
            )}

            {showTreeDialog && (
                <Dialog
                    title="Structure Tree"
                    width={600}
                    onClose={() => setShowTreeDialog(false)}
                >
                    <div
                        style={{
                            height: "400px",
                            overflowY: "auto",
                            overflowX: "auto",
                            padding: "10px",
                            border: "1px solid #ddd",
                        }}
                    >
                        <TreeView
                            data={treeData}
                            hierarchicalName={selectedHierarchy}
                            editable={false}
                        />
                    </div>
                </Dialog>
            )}


            {showAddStructure && (
                <Dialog
                    title="Structure Details"
                    width={800}
                    height={700}
                    onClose={() => setShowAddStructure(false)}
                >
                    <AddStructure
                        onClose={() => setShowAddStructure(false)}
                    />
                </Dialog>
            )}
        </>
    );
}

export default GetHierarchical;