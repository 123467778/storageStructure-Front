import { useState, useEffect } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import axios from "axios";

function GetStructure({ hierarchicalName }) {
    const [nodes, setNodes] = useState([]);
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(5);

    useEffect(() => {
        if (!hierarchicalName) return;

        const fetchNodes = async () => {
            try {

                const response = await axios.get(
                    `http://localhost:8081/structure/getStructure/${hierarchicalName}`
                );
                console.log("API Response:", response.data);
                console.log(hierarchicalName);

                setNodes(response.data);
            } catch (error) {
                console.error("Error fetching structure:", error);
            } 
        };

        fetchNodes();
    }, [hierarchicalName]);

    const pageChange = (event) => {
        setSkip(event.page.skip);
        setTake(event.page.take);
    };

    const pagedData = nodes.slice(skip, skip + take);

    return (
        <>
            
                <Grid
                    data={pagedData}
                    skip={skip}
                    take={take}
                    total={nodes.length}
                    pageable={true}
                    onPageChange={pageChange}
                >
                    <GridColumn
                        field="nodeName"
                        title="Node Name"
                    />

                    <GridColumn
                        field="quantity"
                        title="Count"
                    />

                    <GridColumn
                        field="level"
                        title="Level"
                    />

                     <GridColumn
                        field="isLeaf"
                        title="End Node"
                    />


                    <GridColumn
                        field="rows"
                        title="Rows"
                    />

                    <GridColumn
                        field="columns"
                        title="Columns"
                    />
                </Grid>
            
        </>
    );
}

export default GetStructure;

