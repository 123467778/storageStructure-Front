import { useState } from "react";
import NodeTree from "./NodeTree";

export default function TreeView({ data }) {

    const[selectedNodeId ,setSelectedNodeId] = useState("");


    console.log("Data" ,JSON.stringify(data));
        console.log("Data" ,data);

    return (
        <>

            {data.map((node) => (
                <NodeTree
                    key={node.id}
                    node={node}
                />

            ))}

            
        </>
    );
}






