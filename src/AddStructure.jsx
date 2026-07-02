// import { useState } from "react";

// function AddStructure() {
//     const [structure, setStructure] = useState([]);
//     const handleSubmit = (e)=>{
       
//             console.log(structure);

//     }
//     return (
//         <>
//             {/* <div style={{display:"absolute", justifyContent:"flex-start", padding:"10px",    margin :" 10px"}}>
//             <label style={{margin:"10px"}}>Structure Hiearchical</label> 
//         <input type="text" placeholder="Enter your structure "  value={structure} onChange={(e)=> setStructure(e.target.value)}/>
//         </div> */}  
//         {/* <h2>Structure Hiearchical </h2>
//             <div className="row">
                
//                 <div className="col">
//                     <label style={{margin:"8px"}}>Structure Hiearchical : </label>
//                     <input type="text" className="htmlForm-control" placeholder="Structure name" style={{width:"450px" ,margin:"10px"}} value={structure} onChange={(e)=>setStructure(e.target.value)} />
//                     <button onClick={handleSubmit}> Add </button>
//                 </div>


//             </div> */}
//             <h2>Structure Hierarchical</h2>

//             <div className="row">
//                 <div className="col">
//                     <label style={{ margin: "8px" }}>
//                         Structure Hierarchical :
//                     </label>

//                     <input
//                         type="text"
//                         className="htmlForm-control"
//                         placeholder="Structure name"
//                         style={{ width: "450px", margin: "10px" }}
//                         value={structure}
//                         onChange={(e) => setStructure(e.target.value)}
//                     />

//                     <button onClick={handleSubmit}>
//                         Add
//                     </button>

//                     <div style={{ marginTop: "20px" }}>
//                         <h4>Structures</h4>
//                         <ul>
//                             {structure.map((item, index) => (
//                                 <li key={index}>{item}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default AddStructure;


// import { useState } from "react";

// function AddStructure() {
//     const [structure, setStructure] = useState("");
//     const [structures, setStructures] = useState([]);

//     const handleSubmit = () => {
//         if (!structure.trim()) return;

//         setStructures([...structures, structure]);
//         setStructure(""); // Clear input after adding
//     };

//     return (
//         <>
//             <h2>Structure Hierarchical</h2>

//             <div className="row">
//                 <div className="col">
//                     <label style={{ margin: "8px" }}>
//                         Structure Hierarchical :
//                     </label>

//                     <input
//                         type="text"
//                         className="htmlForm-control"
//                         placeholder="Structure name"
//                         style={{ width: "450px", margin: "10px" }}
//                         value={structure}
//                         onChange={(e) => setStructure(e.target.value)}
//                     />

//                     <button onClick={handleSubmit}>
//                         Add
//                     </button>

//                     <div style={{ marginTop: "20px" }}>
//                         <h4>Structures</h4>
//                         <ul>
//                             {structures.map((item, index) => (
//                                 <li key={index}>{item}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default AddStructure;

// import { useState } from "react";
// import { Grid, GridColumn } from "@progress/kendo-react-grid";
// import "@progress/kendo-theme-default/dist/all.css";


// function AddStructure() {
//     const [structure, setStructure] = useState("");
//     const [structureNode, setStructureNode] = useState([]);
//  const [structureName, setStructureName] = useState("");



//     const handleSubmit = () => {
//         if (!structure.trim()) return;

//         setStructures([
//             ...structures,
//             {
//                 id: structures.length + 1,
//                 structureName: structure
//             }
//         ]);

//         setStructure("");
//     };

//     return (
//         <>
//          <h2>Structure Hierarchical</h2>
//          <div style={{margin:"10px" }}>
//             <label>Structure Name</label>
                

//                 <input
//                         type="text" 
//                         className="htmlForm-control"
//                         placeholder="Structure name"
//                         value={structureName}
//                         onChange={(e) => setStructureName(e.target.value)}
//                         style={{width:"300px"}}
//                     />
//          </div>



           

//             <div className="row mb-3">
//                 <div className="col">
                
//                     <label>Structure Hierarchical :</label>

//                     <input
//                         type="text"
//                         className="htmlForm-control"
//                         placeholder="Enter Node of structure"
//                         value={structure}
//                         onChange={(e) => setStructure(e.target.value)}
//                         style={{width:"300px"}}
//                     />

//                     <button
//                         className="btn btn-primary mt-2"
//                         onClick={handleSubmit}
//                     >
//                         Add
//                     </button>
//                 </div>
//             </div>


//             <Grid
//                 data={structures}
//                 style={{ height: "400px" }}
//             >
//                 <GridColumn
//                     field="id"
//                     title="ID"
//                     width="100px"
//                 />
//                  <GridColumn
//                 field="structureName"
//                 title="structureName"
//                 />
//                 <GridColumn
//                     field="structureNode"
//                     title="StructureNode"
//                 />
               
//             </Grid>
//         </>
//     );
// }

// export default AddStructure;





// import { Grid, GridColumn } from "@progress/kendo-react-grid";
// import "@progress/kendo-theme-default/dist/all.css";
// import axios from "axios";
// import { useReducer } from "react";



// const initialState = {
   
//   "structureName": "",
//   "category_code": "",
//   "data": {
//     "id": "",
//     "nodeName": "",
//     "quantity": "",
//     "children": [
//       {
//         "id": "",
//         "nodeName": "",
//         "quantity": "",
//         "children": [
//           {
//             "id": "",
//             "nodeName": "",
//             "quantity": "",
//             "children": []
//           }
//         ]
//       }
//     ]
//   }

// }


// function reducer(state,action){
//     switch(action.type){
//         case "SET_FIELD":
//            return  {
//                 ...state,
//                 [action.field]:action.value

//             }

//         case "SET_DATA_FIELD":
//             return {
//                  ...state,
//                 data: {
//             ...state.data,
//             [action.field]: action.value
//         }
//             }
//         case "RESET":
//             return initialState;
        
//         default:
//             return state;
            
//     }

// }

// function AddStructure(){

//     const [state,dispatch] =useReducer(reducer,initialState);


//     const handleChange = (e)=>{
//         dispatch(
//             {
//                 type:"SET_FIELD",
//                 field:e.target.name,
//                 value:e.target.value
//             }
//         )
//     }

//     const handleDataChange =(e)=>{
//         dispatch({
//             type:"SET_DATA_FIELD",
//              field:e.target.name,
//              value:e.target.value
//         })
//     }

//     const handleSubmit = async (e)=>{
//         e.preventDefault();
       

//         try{
//            await axios.post("http://localhost:8081/create",state)
          
//         console.log(state);
//            alert("Structure Created....");
//            dispatch({type:"RESET"});

//            console.log(typeof state.data.nodeName);

//         }
//         catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     }
//     };



//     return (
//    <>
//    <h1>Add Structure</h1>
//   <form onSubmit={handleSubmit}>
//   <div
//     className="form-group"
//     style={{ width: "350px", margin: "15px" }}
//   >
//     <label htmlFor="structureName">Structure Name</label>
//     <input
//       type="text"
//       className="form-control"
//       id="structureName"
//       name="structureName"
//       value={state.structureName}
//       placeholder="Enter Structure Name"
//       onChange={handleChange}
//     />
//   </div>

//   {/* <div
//     className="form-group"
//     style={{ width: "350px", margin: "15px" }}
//   >
//     <label htmlFor="structureNode">Structure Node</label>
//     <input
//       type="text"
//       className="form-control"
//       id="structureNode"
//       name="nodeName"
//       value={state.data.nodeName}
//       onChange={handleDataChange}
//       placeholder="Enter Structure Node"


//     />
//   </div> */}
//   <div
//     className="form-group"
//     style={{ width: "350px", margin: "15px" }}
//   >
//     <label htmlFor="structureNode">Category Code</label>
//     <input
//       type="number"
//       className="form-control"
//       id="category_code"
//       name="category_code"
//       value={state.category_code}
//       onChange={handleChange}
//       placeholder="Enter Category code "


//     />
//   </div>

//   <button type="submit" className="btn btn-primary" >
//     Submit
//   </button>
// </form>
   
   
//    </>
//     );
// }
// export default AddStructure ;

import React, { useState, useMemo } from "react";
import axios from 'axios';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import '@progress/kendo-theme-default/dist/all.css';
function AddStructure ({ onClose })  {
  const [HierarchicalName, setHierarchicalName] = useState("");
  const [description , setDescription] = useState("");


  const [node, setNode] = useState({
    nodeName: "",
    // nodeCode: "",
    quantity: "",
    isLeaf: false,
    rows: "",
    columns: ""
  });


  const [levels, setLevels] = useState([]);

 

  const resetForm = () => {
    setNode({
      nodeName: "",
      nodeCode: "",
      quantity: "",
      isLeaf: false,
      rows: "",
      columns: ""
    });
  };

  const addNode = () => {
    if (!node.nodeName.trim()) {
      alert("Node Name required");
      return;
    }

    if (!node.quantity || Number(node.quantity) <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

   
    const newNode = {
      id: Date.now(),
      level: levels.length + 1,
      nodeName: node.nodeName,
      // nodeCode: node.nodeCode,
      quantity: Number(node.quantity),
      isLeaf: node.isLeaf,
      rows: node.isLeaf ? Number(node.rows) : null,
      columns: node.isLeaf ? Number(node.columns) : null
    };

    setLevels([...levels, newNode]);

    resetForm();
  };

 

const capacity = levels.reduce(
  (acc, level) => acc * Number(level.quantity || 1),
  1
);

const leafNode = levels.find((l) => l.isLeaf);

const totalCapacity =
  leafNode?.rows && leafNode?.columns
    ? capacity *
      Number(leafNode.rows) *
      Number(leafNode.columns)
    : capacity;



const handleSave = async () => {
  if (!HierarchicalName.trim()) {
    alert("hierarchical Name required");
    return;
  }

 

  if (levels.length === 0) {
    alert("Add at least one node");
    return;
  }

  const payload = {
    HierarchicalName: HierarchicalName,
    description: description,
    data: {
      levels: levels
    }
  };

  console.log(
    "Payload Sent To Backend:",
    JSON.stringify(payload, null, 2)
  );

  try {
    const response = await axios.post(
      "http://localhost:8081/structure/getNode",
      payload
    );
   console.log(payload)
    console.log(response.data);

    alert("Structure Saved Successfully");

    // Clear form after save
    setHierarchicalName("");
    setDescription("");
    setLevels([]);

    resetForm();

  } catch (err) {
    console.error(err);

    if (err.response) {
      console.log(err.response.data);
      alert(err.response.data.message || "Save Failed");
    } else {
      alert("Something went wrong");
    }
  }
};

  return (
    <div style={{ padding: "20px" }}>
        
      <h2>Add Storage Structure</h2>
    

      <div style={{ marginBottom: "15px" }}>
        <label>
           Hierarchical Name
        </label>
        <br />
        <input
          value={HierarchicalName}
          onChange={(e) =>
            setHierarchicalName(e.target.value)
          }
          style={{ width: "300px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label> 
          Description
        </label>
        <br />
         <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows={4}
    cols={40}
  />
      </div>

      <hr />

      <h3>Add Node</h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >
        <input
          name="nodeName"
          placeholder="Node Name"
          value={node.nodeName}
          onChange={(e) =>
  setNode(prev => ({
    ...prev,
    nodeName: e.target.value
  }))
}
        />

        {/* <input
          name="nodeCode"
          placeholder="Node Code"
          value={node.nodeCode}
          onChange={handleChange}
        /> */}

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={node.quantity}
            onChange={(e) =>
  setNode(prev => ({
    ...prev,
    quantity: e.target.value
  }))
}
        />

        <label>
          <input
            type="checkbox"
            name="isLeaf"
            checked={node.isLeaf}
            onChange={(e) =>
  setNode(prev => ({
    ...prev,
    isLeaf: e.target.checked
  }))
}
          />
         End Node
        </label>

        {node.isLeaf && (
          <>
            <input
              name="rows"
              type="number"
              placeholder="Rows"
              value={node.rows}
              onChange={(e) =>
  setNode(prev => ({
    ...prev,
   rows: e.target.value
  }))
}
            />

            <input
              name="columns"
              type="number"
              placeholder="Columns"
              value={node.columns}
             onChange={(e) =>
  setNode(prev => ({
    ...prev,
    columns: e.target.value
  }))
}
            />
          </>
        )}

        <Button onClick={addNode}>
          Add Node
        </Button>
      </div>

      <hr />

      <Grid
        data={levels}
        style={{ height: "400px" }}
      >
        <GridColumn
          field="level"
          title="Level"
          width="90px"
        />

        <GridColumn
          field="nodeName"
          title="Node Name"
        />

       
        <GridColumn
          field="quantity"
          title="Quantity"
        />

        <GridColumn
          field="isLeaf"
          title="Leaf"
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

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ddd"
        }}
      >
        <h3>
          Total Capacity :
          {" "}
          {totalCapacity}
        </h3>
      </div>

      {levels.length > 0 && (
        <Button
          onClick={handleSave}
          style={{
            marginTop: "20px"
          }}
        >
          Save Structure
        </Button>
      )}
    </div>
  );
};

export default AddStructure;