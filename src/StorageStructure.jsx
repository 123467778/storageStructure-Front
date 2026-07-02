import { Button } from "@progress/kendo-react-buttons";
import GetHierarchical from "./GetHierarchical";
import StructureMapping from "./StructureMapping";
import { useState } from "react";
import AddStructure from "./AddStructure";
import { Dialog } from "@progress/kendo-react-dialogs";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

function StorageStructure(){
 
    const [view,setView] = useState("hierarchy");
    const[showAddStructure,setShowAddStructure] = useState(false);
   
    const handleAddStructure=()=>{
        setShowAddStructure(true);
    }


    return (
        <>
       
        <Button onClick={handleAddStructure} ><ControlPointIcon/></Button>
    
       <Button onClick={()=>setView("hierarchy")} style={{margin:"5px" ,padding:"5px"}}>
        Hierarchical
       </Button>
       <Button onClick={()=>setView("structureMap")} style={{margin:"10px"}}> Structure Mapping </Button>

      

       {
        view==="hierarchy" && <GetHierarchical/>
       }

       {
        view==="structureMap" && <StructureMapping/>
       }


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
export default StorageStructure;