import { Button } from "@progress/kendo-react-buttons";
import GetHierarchical from "./GetHierarchical";
import StructureMapping from "./StructureMapping";
import { useState } from "react";
function StorageStructure(){
 
    const [view,setView] = useState("hierarchy");
   


    return (
        <>
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
      
        </>
    );
}
export default StorageStructure;