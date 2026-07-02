import { useState } from "react";
import axios from "axios";
import { generateTree } from "./treeGenerator";

const useStructureTree = () => {
    const [treeData, setTreeData] = useState([]);
    const [showTreeDialog, setShowTreeDialog] = useState(false);
    const [selectedHierarchy, setSelectedHierarchy] = useState("");


    const handleStructure = async (HierarchicalName) => {
        try {
            const res = await axios.get(
                `http://localhost:8081/structure/getStructure/${HierarchicalName}`
            );

            const tree = generateTree(res.data);

            console.log("Tree Data" ,tree);

            setTreeData(tree);

            setSelectedHierarchy(HierarchicalName);
            setShowTreeDialog(true);
        } catch (err) {
            console.error(err);
        }
    };

    return {
        treeData,
        showTreeDialog,
        selectedHierarchy,
        handleStructure,
        setShowTreeDialog
        
    };
};

export default useStructureTree;