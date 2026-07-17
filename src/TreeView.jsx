
import { useEffect, useState } from "react";
import NodeTree from "./NodeTree";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";


function updateTree(nodes, nodeId, callback) {

    return nodes.map((node)=>{

        if(node.id === nodeId){
            return callback(node);
        }


        return {
            ...node,
            children: node.children
                ? updateTree(node.children,nodeId,callback)
                : []
        };

    });

}


export function editNode(nodes,nodeId,newName){

    return updateTree(
        nodes,
        nodeId,
        (node)=>({
            ...node,
          
            displayName:newName
        })
    );
}

export function deleteNode(nodes,nodeId){
    return  nodes.filter(node=>node.id!==nodeId).map(node=> ({
        ...node , children:node.children ?  deleteNode(node.children,nodeId):[]
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
    onTreeChange
}){


    const [tree,setTree] = useState([]);

    const [selectedNodeId,setSelectedNodeId] = useState(null);

       

    useEffect(()=>{

        setTree(data || []);

    },[data]);



    const updateTreeData=(updated)=>{

        setTree(updated);


        if(onTreeChange){
            onTreeChange(updated);
        }

    };




    return (

        <div>


       

        {
        tree.map(node=>(

            <NodeTree

                key={node.id}

                node={node}

                tree={tree}

                setTree={updateTreeData}

                selectedNodeId={selectedNodeId}

                setSelectedNodeId={setSelectedNodeId}

                editable={editable}

                selectedContainerName={selectedContainerName}

                editNode={editNode}

                deleteNode={deleteNode}

                addChildNode={addChildNode}

            />

        ))
        }

          <Tooltip id="common"/>


        </div>

    );

}


export default TreeView;