import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function CategoryDropdown() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  
  const options = categories.map((item) => ({
    value: item,
    label: item,
  }));

  return (  
    <div style={{ width: "300px" }}>
<label style={{padding:"10px"}}>Select Category :</label>

      <Select
       
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select Category"
        isClearable
      />
    </div>


  );
}

export default CategoryDropdown;