import React, { useState, useMemo } from "react";
import Select from "react-select";
import axios from 'axios';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import '@progress/kendo-theme-default/dist/all.css';
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ShelvesIcon from "@mui/icons-material/Shelves";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import GridViewIcon from "@mui/icons-material/GridView";
import ScienceIcon from "@mui/icons-material/Science";
import BiotechIcon from "@mui/icons-material/Biotech";
import KitchenIcon from "@mui/icons-material/Kitchen";


function AddStructure({ onClose }) {
  const [HierarchicalName, setHierarchicalName] = useState("");
  const [description, setDescription] = useState("");


  const [node, setNode] = useState({
    nodeName: "",
    displayName: "",
    // nodeCode: "",
    quantity: "",
    isLeaf: false,
    rows: "",
    columns: "",
    icon: null,
  });


  const [levels, setLevels] = useState([]);



  const resetForm = () => {
    setNode({
      nodeName: "",
      displayName: "",
      quantity: "",
      isLeaf: false,
      rows: "",
      columns: "",
      icon: null
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

    if(!node.icon){
      alert("select an icon");
      return;
    }

    const newNode = {
      level: levels.length + 1,
      nodeName: node.nodeName,
      // nodeCode: node.nodeCode,
      displayName: node.nodeName,
      quantity: Number(node.quantity),
      isLeaf: node.isLeaf,
      rows: node.isLeaf ? Number(node.rows) : null,
      columns: node.isLeaf ? Number(node.columns) : null,
      icon: node.icon?.value,
      iconLabel: node.icon?.label
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

      setHierarchicalName("");
      setDescription("");
      setLevels([]);

      resetForm();

      window.location.reload();


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






  const options = [
    {
      value: "warehouse",
      label: "Warehouse",
      icon: <WarehouseIcon />
    },
    {
      value: "rack",
      label: "Rack",
      icon: <ShelvesIcon />
    },
    {
      value: "box",
      label: "Box",
      icon: <i className="bi bi-box-seam"  />
    },
    {
      value: "shelf",
      label: "Shelf",
      icon: <ViewModuleIcon />
    },
    {
      value: "tray",
      label: "Tray",
      icon: <GridViewIcon />
    },
    {
      value: "sample",
      label: "Sample",
      icon: <ScienceIcon />
    },
    {
      value: "tube",
      label: "Tube",
      icon: <BiotechIcon />
    },
    {
      value: "Freezer",
      label: "Freezer",
      icon: <KitchenIcon />
    }
  ];



  const boxOption = options.find(
    (option) => option.value === "box"
  );

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



        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <label>
            End Node
          </label>

          <input
            type="checkbox"
            name="isLeaf"
            checked={node.isLeaf}
            onChange={(e) =>
              setNode(prev => ({
                ...prev,
                isLeaf: e.target.checked,
                 
      icon: e.target.checked ? boxOption : null
              }))
            }
          />
        </div>






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


        {/* <Select options={options} styles={{width:"300px"}}>

 </Select> */}
        {



          <Select
            options={options}
            value={node.isLeaf ? boxOption : node.icon}
            isDisabled={node.isLeaf}

            styles={{
              container: (base) => ({
                ...base,
                width: "200px"
              })
            }}
            formatOptionLabel={(option) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                {option.icon}
                <span>{option.label}</span>
              </div>
            )}
            onChange={(selected) =>
              setNode(prev => ({
                ...prev,
                icon: selected
              }))
            }
            isClearable
          />

        }

        <Button onClick={addNode}>
          Add
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


        <GridColumn
          title="Icon"
          cell={(props) => {
            const selectedIcon = options.find(
              x => x.value === props.dataItem.icon
            );

            return (
              <td>
                {selectedIcon?.icon}
              </td>
            );
          }}
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

