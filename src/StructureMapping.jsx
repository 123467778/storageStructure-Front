
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function StructureMapping() {
    const [scontainername, setContainername] = useState("");
    const [sdescription, setDescription] = useState("");
    const [hierarchicals, setHierarchical] = useState([]);
    const [selected, setSelected] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
  const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(5);

    const [structure,setStructure]=useState([])

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
        axios
            .get("http://localhost:8081/structure/getHierarchical")
            .then((res) => {
                setHierarchical(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);


  

const loadStructure = ()=>{
     axios.get(`http://localhost:8081/structure/getMap`)
    .then((res)=>{
        setStructure(res.data);
        console.log(res.data);
    })
    .catch((err)=>console.log(err));
}


 useEffect(()=>{
   loadStructure();
   },[]);




    const options = hierarchicals.map((item) => ({
        value: item.id,
        label: item.HierarchicalName,
    }));

    const handleSave = () => {
        const data = {
            scontainername,
            sdescription,
            nhierarchicalid: selected?.value,
        };

        console.log(data);

       
      
        axios
            .post("http://localhost:8081/structure/createMap", data)
            .then((res) => {
                alert("Saved Successfully");
                setIsOpen(false);
                console.log(res.data);
                loadStructure();
            })
            .catch((err) => console.log(err));
           
           

            setContainername("");
            setDescription("");
            setSelected(null);
            

       
    };

        const pagedData = structure.slice(skip, skip + take);

         const pageChange = (event) => {
        setSkip(event.page.skip);
        setTake(event.page.take);
    };


    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end" ,padding:"10px" }}>
                <Button onClick={() => setIsOpen(true)}>Add</Button>
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
                        <div style={{display:"flex" ,justifyContent:"flex-end"}}>
                            <Button onClick={() => setIsOpen(false)} style={{justifyContent:"end"}}>X</Button>
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
                                onChange={setSelected}
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
    pageable={true}
    onPageChange={pageChange}
>
    <GridColumn field="scontainername" title="Container Name" />
    <GridColumn field="sdescription" title="Description" />
    <GridColumn field="shierarchicalname" title="Hierarchical Name" />
    <GridColumn
                    title="Actions"
                    width="200px"
                    cell={(props) => (
                        <td>
                            <Button
                                style={{ margin: "5px" }}
                              
                            >
                                View
                            </Button>

                            <Button>
                                Edit
                            </Button>
                        </td>
                    )}
                />


</Grid>



        </>
    );
}

export default StructureMapping;










