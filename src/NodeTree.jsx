import { useState } from "react";
import AllInboxIcon from '@mui/icons-material/AllInbox';
import { Button } from "@progress/kendo-react-buttons";

export default function NodeTree({ node}) {
    const [open, setOpen] = useState(false);

    // console.log("Node",node);
    return (
        <div style={{ marginLeft: 20 }}>
            
              {/* clickable row for each node */}
            <div
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(!open)}
            >
                
                {node.children.length > 0
                    ? open
                        ? "▼"                          
                        : "▶"   
                    :<AllInboxIcon/>}{" "} 
                    
                {node.name}
            </div>

            {/* 
                RENDER CHILDREN ONLY IF OPEN
                (this is what makes tree expandable)
            */}
            {open &&
                node.children.map((child) => (
                    <>
                    <NodeTree                    
                        key={child.id}
                        node={child}
                    />
                    </>

                ))}
        </div>
    );
}



