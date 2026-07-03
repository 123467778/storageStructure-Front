import { useState} from "react";
import NodeTree from "./NodeTree";
import { useEffect } from "react";


function updateTree (nodes,nodeId,callback){
    return nodes.map((node)=>{
        if(node.id===nodeId){
            return callback(node);
        }
     
        return {
            ...node,
            children:node.children ? updateTree (node.children ,nodeId,callback):[]
        };
        
    })

    
}

function editNode(nodes,nodeId,newName){
    return updateTree(nodes,nodeId,(node)=>({
        ...node,
        name:newName
    }));
}




export default function TreeView({ data,hierarchicalName,editable}) {
           
    const[tree,setTree]=useState([]);
 
    const[selectedNodeId ,setSelectedNodeId] = useState(null);

    console.log("Data" ,JSON.stringify(data));
        console.log("Data" ,data);


        useEffect(()=>{
            setTree(data||[])
        },[data]);
 
        


    return (
        <>

            {tree.map((node) => (
                <NodeTree
                    key={node.id}
                    node={node}
                      tree={tree}
                      setTree={setTree}
                        selectedNodeId={selectedNodeId}
                    setSelectedNodeId={setSelectedNodeId}
                    //  hierarchicalName={hierarchicalName} 
                   

                      

                    editable={editable}
                    editNode={editNode}
                />

            ))}

            
        </>
    );
}




