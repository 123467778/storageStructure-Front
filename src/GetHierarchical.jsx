// import { useEffect, useState } from "react";
// import { Grid, GridColumn } from "@progress/kendo-react-grid";
// import { Button } from "@progress/kendo-react-buttons";
// import { Dialog } from "@progress/kendo-react-dialogs";

// import axios from "axios";
// import GetStructure from "./GetStructure";

// function GetHierarchical() {
//     const [structures, setStructures] = useState([]);
//     const [skip, setSkip] = useState(0);
//     const [take, setTake] = useState(5);

//     const[showDialog,setShowDialog] = useState(false);
//     const[selectedHierarchy,setSelectedHierarchy] = useState("");


//     const fetchStructures = () => {
//         axios
//             .get("http://localhost:8081/structure/getHierarchical")
//             .then((res) => {
//                 setStructures(res.data);
//                 console.log(res.data);
//             })
//             .catch((err) => console.log(err));
//     };

//     useEffect(() => {
//         fetchStructures();
//     }, []);



//     const pageChange = (event) => {
//         setSkip(event.page.skip);
//         setTake(event.page.take);
//     };

//  const handleView = (dataItem)=>{
//     setSelectedHierarchy(dataItem.HierarchicalName);
//     setShowDialog(true);
//  }



//     const pagedData = structures.slice(skip, skip + take);





//   return (

//        <>
//        <h1>Hierarchical</h1>
//         <Grid
//             data={pagedData}
//             skip={skip}
//             take={take}
//             total={structures.length}
//             pageable={true}
//             onPageChange={pageChange}
//         >
//             <GridColumn field="HierarchicalName" title="Hierarchical Name" />
//             <GridColumn field="description" title="Description" />
//             <GridColumn
//                     title="Actions"
//                     width="200px"
//                      cell={(props) => (
//                         <td>
//                             <Button
//                                 style={{ margin: "5px" }}
//                                 onClick={() => handleView(props.dataItem)}
//                             >
//                                 View
//                             </Button>

//                             <Button>
//                                 Structure
//                             </Button>
//                         </td>
//                     )}
//                 />



//         </Grid>
//         {showDialog && (
//             <Dialog title="Structure Details" onClose={()=>setShowDialog(false)}
//             width={800} >
//                 <GetStructure hierarchicalName={selectedHierarchy}/>
//             </Dialog>
//         )}

//        </>
//     );
// }

// export default GetHierarchical;







// // import { useEffect, useState } from "react";
// // import { Grid, GridColumn } from "@progress/kendo-react-grid";
// // import { Button } from "@progress/kendo-react-buttons";
// // import { Dialog } from "@progress/kendo-react-dialogs";
// // import axios from "axios";

// // import GetStructure from "./GetStructure";
// // import Tree from "./Tree";

// // function GetHierarchical() {
// //     const [structures, setStructures] = useState([]);
// //     const [skip, setSkip] = useState(0);
// //     const [take, setTake] = useState(5);

// //     const [showDialog, setShowDialog] = useState(false);
// //     const [selectedHierarchy, setSelectedHierarchy] = useState("");

// //     const [showStructureDialog, setShowStructureDialog] =
// //         useState(false);
// //     const [treeData, setTreeData] = useState([]);

// //     useEffect(() => {
// //         fetchStructures();
// //     }, []);

// //     const fetchStructures = () => {
// //         axios
// //             .get(
// //                 "http://localhost:8081/structure/getHierarchical"
// //             )
// //             .then((res) => {
// //                 setStructures(res.data);
// //             })
// //             .catch((err) => console.log(err));
// //     };

// //     const pageChange = (event) => {
// //         setSkip(event.page.skip);
// //         setTake(event.page.take);
// //     };

// //     const handleView = (dataItem) => {
// //         setSelectedHierarchy(
// //             dataItem.HierarchicalName
// //         );
// //         setShowDialog(true);
// //     };

// //     const buildTree = (data) => {
// //         const root = [];
// //         const stack = [];

// //         data.forEach((item, index) => {
// //             const node = {
// //                 id: index + 1,
// //                 level: item.level,
// //                 name: `${item.nodeName.trim()} (${item.quantity})`,
// //                 children: []
// //             };

// //             while (
// //                 stack.length > 0 &&
// //                 stack[stack.length - 1].level >= item.level
// //             ) {
// //                 stack.pop();
// //             }

// //             if (stack.length === 0) {
// //                 root.push(node);
// //             } else {
// //                 stack[
// //                     stack.length - 1
// //                 ].children.push(node);
// //             }

// //             stack.push(node);
// //         });

// //         return root;
// //     };

// //     const handleStructure = async (
// //         dataItem
// //     ) => {
// //         try {
// //             const res = await axios.get(
// //                 `http://localhost:8081/structure/getStructure/${dataItem.HierarchicalName}`
// //             );

// //             const tree = buildTree(res.data);

// //             setTreeData(tree);
// //             setShowStructureDialog(true);
// //         } catch (err) {
// //             console.log(err);
// //         }
// //     };

// //     const pagedData = structures.slice(
// //         skip,
// //         skip + take
// //     );

// //     return (
// //         <>
// //             <h1>Hierarchical</h1>

// //             <Grid
// //                 data={pagedData}
// //                 skip={skip}
// //                 take={take}
// //                 total={structures.length}
// //                 pageable={true}
// //                 onPageChange={pageChange}
// //             >
// //                 <GridColumn
// //                     field="HierarchicalName"
// //                     title="Hierarchical Name"
// //                 />

// //                 <GridColumn
// //                     field="description"
// //                     title="Description"
// //                 />

// //                 <GridColumn
// //                     title="Actions"
// //                     width="250px"
// //                     cell={(props) => (
// //                         <td>
// //                             <Button
// //                                 style={{
// //                                     marginRight: "5px"
// //                                 }}
// //                                 onClick={() =>
// //                                     handleView(
// //                                         props.dataItem
// //                                     )
// //                                 }
// //                             >
// //                                 View
// //                             </Button>

// //                             <Button
// //                                 onClick={() =>
// //                                     handleStructure(
// //                                         props.dataItem
// //                                     )
// //                                 }
// //                             >
// //                                 Structure
// //                             </Button>
// //                         </td>
// //                     )}
// //                 />
// //             </Grid>

// //             {/* View Dialog */}
// //             {showDialog && (
// //                 <Dialog
// //                     title="Structure Details"
// //                     width={800}
// //                     onClose={() =>
// //                         setShowDialog(false)
// //                     }
// //                 >
// //                     <GetStructure
// //                         hierarchicalName={
// //                             selectedHierarchy
// //                         }
// //                     />
// //                 </Dialog>
// //             )}

// //             {/* Tree Dialog */}
// //             {showStructureDialog && (
// //                 <Dialog
// //                     title="Structure Tree"
// //                     width={600}
// //                     onClose={() =>
// //                         setShowStructureDialog(
// //                             false
// //                         )
// //                     }
// //                 >
// //                     <Tree nodes={treeData} />
// //                 </Dialog>
// //             )}
// //         </>
// //     );
// // }

// // export default GetHierarchical;










// import { useEffect, useState } from "react";
// import { Grid, GridColumn } from "@progress/kendo-react-grid";
// import { Button } from "@progress/kendo-react-buttons";
// import { Dialog } from "@progress/kendo-react-dialogs";

// import axios from "axios";
// import GetStructure from "./GetStructure";

// import { generateTree } from "./treeGenerator";
// import TreeView from './TreeView'
// import NodeTree from "./NodeTree";


// function GetHierarchical() {
//     const [structures, setStructures] = useState([]);
//     const [skip, setSkip] = useState(0);
//     const [take, setTake] = useState(5);

//     const [showDialog, setShowDialog] = useState(false);
//     const [selectedHierarchy, setSelectedHierarchy] = useState("");


//     const [showTreeDialog, setShowTreeDialog] = useState(false);
//     const [treeData, setTreeData] = useState([]);



//     const fetchStructures = () => {
//         axios
//             .get("http://localhost:8081/structure/getHierarchical")
//             .then((res) => {
//                 setStructures(res.data);
//                 console.log(res.data);
//             })
//             .catch((err) => console.log(err));
//     };

//     useEffect(() => {
//         fetchStructures();
//     }, []);



//     const pageChange = (event) => {
//         setSkip(event.page.skip);
//         setTake(event.page.take);
//     };

//     const handleView = (dataItem) => {
//         setSelectedHierarchy(dataItem.HierarchicalName);
//         setShowDialog(true);
//     }


// const handleStructure = (dataItem) => {
//     axios
//         .get(
//             `http://localhost:8081/structure/getStructure/${dataItem.HierarchicalName}`
//         )
//         .then((res) => {
//             const tree = generateTree(res.data);
            
//             setTreeData(tree);

//             setShowTreeDialog(true);
//         })
//         .catch(console.error);

   
// };










//     const pagedData = structures.slice(skip, skip + take);





//     return (

//         <>
//             <h1>Hierarchical</h1>
//             <Grid
//                 data={pagedData}
//                 skip={skip}
//                 take={take}
//                 total={structures.length}
//                 pageable={true}
//                 onPageChange={pageChange}
//             >
//                 <GridColumn field="HierarchicalName" title="Hierarchical Name" />
//                 <GridColumn field="description" title="Description" />
//                 <GridColumn
//                     title="Actions"
//                     width="200px"
//                     cell={(props) => (
//                         <td>
//                             <Button
//                                 style={{ margin: "5px" }}
//                                 onClick={() => handleView(props.dataItem)}
//                             >
//                                 View
//                             </Button>

//                             <Button  onClick={() => handleStructure(props.dataItem)}>
//                                 Structure
//                             </Button>
//                         </td>
//                     )}
//                 />



//             </Grid>
//             {showDialog && (
//                 <Dialog title="Structure Details" onClose={() => setShowDialog(false)}
//                     width={800} >
//                     <GetStructure hierarchicalName={selectedHierarchy} />
//                 </Dialog>
//             )}
//             {showTreeDialog && (
//     <Dialog
//         title="Structure Tree"
//         width={600}
//         onClose={() => setShowTreeDialog(false)}
//     >
//         <TreeView data={treeData}   />
//     </Dialog>
// )}

//         </>
//     );
// }

// // export default GetHierarchical;

// import { useEffect, useState } from "react";
// import { Grid, GridColumn } from "@progress/kendo-react-grid";
// import { Button } from "@progress/kendo-react-buttons";
// import { Dialog } from "@progress/kendo-react-dialogs";

// import axios from "axios";
// import GetStructure from "./GetStructure";

// import { generateTree } from "./treeGenerator";
// import TreeView from './TreeView'
// import NodeTree from "./NodeTree";
// import StructureMapping from "./StructureMapping";
// import useStructureTree from "./useStructureTree";


// function GetHierarchical() {
//     const [structures, setStructures] = useState([]);
//     const [skip, setSkip] = useState(0);
//     const [take, setTake] = useState(5);

//     const [showDialog, setShowDialog] = useState(false);

// const {treeData,showTreeDialog,selectedHierarchy,handleStructure,setShowTreeDialog}=useStructureTree();

//     const [selectedHierarchyName, setSelectedHierarchyName] = useState("");


//     // const [showTreeDialog, setShowTreeDialog] = useState(false);
//     // const [treeData, setTreeData] = useState([]);



//     const fetchStructures = () => {
//         axios
//             .get("http://localhost:8081/structure/getHierarchical")
//             .then((res) => {
//                 setStructures(res.data);
//                 console.log(res.data);
//             })
//             .catch((err) => console.log(err));
//     };

//     useEffect(() => {
//         fetchStructures();
//     }, []);



//     const pageChange = (event) => {
//         setSkip(event.page.skip);
//         setTake(event.page.take);
//     };

//     const handleView = (dataItem) => {
//         setSelectedHierarchyName(dataItem.HierarchicalName);
//         setShowDialog(true);
//     }


// // const handleStructure = (dataItem) => {
// //     axios
// //         .get(
// //             `http://localhost:8081/structure/getStructure/${dataItem.HierarchicalName}`
// //         )
// //         .then((res) => {
// //             const tree = generateTree(res.data);
            
// //             setTreeData(tree);

// //         setSelectedHierarchy(dataItem.HierarchicalName);


// //             setShowTreeDialog(true);
// //         })
// //         .catch(console.error);

   
// // };

// // const handleStructure = (dataItem) => {
// //     setSelectedHierarchy(dataItem.HierarchicalName);
// //     loadTree(dataItem.HierarchicalName);
// //     setShowTreeDialog(true);
// // };



// // const loadTree = (hierarchicalName) => {
// //     axios
// //         .get(`http://localhost:8081/structure/getStructure/${hierarchicalName}`)
// //         .then((res) => {
// //             // setTreeData(generateTree(res.data));
// //             // console.log("RAW DATA FROM BACKEND:", res.data);

             

// //             const tree = generateTree(res.data);
           

// //             // console.log("GENERATED TREE:", tree);

// //             setTreeData(tree);
// //         })
// //         .catch(console.error);
// // };









//     const pagedData = structures.slice(skip, skip + take);





//     return (

//         <>
//             <h1>Hierarchical</h1>
//             <Grid
//                 data={pagedData}
//                 skip={skip}
//                 take={take}
//                 total={structures.length}
//                 pageable={true}
//                 onPageChange={pageChange}
//             >
//                 <GridColumn field="HierarchicalName" title="Hierarchical Name" />
//                 <GridColumn field="description" title="Description" />
//                 <GridColumn
//                     title="Actions"
//                     width="200px"
//                     cell={(props) => (
//                         <td>
//                             <Button
//                                 style={{ margin: "5px" }}
//                                 onClick={() => handleView(props.dataItem)}
//                             >
//                                 View
//                             </Button>

//                             <Button  onClick={() => handleStructure(props.dataItem)}>
//                                 Structure
//                             </Button>
//                         </td>
//                     )}
//                 />



//             </Grid>
//             {showDialog && (
//                 <Dialog title="Structure Details" onClose={() => setShowDialog(false)}
//                     width={800} >
//                     <GetStructure hierarchicalName={selectedHierarchy} />
//                 </Dialog>
//             )}
//             {showTreeDialog && (
//     <Dialog
//         title="Structure Tree"
//         width={600}
//         onClose={() => setShowTreeDialog(false)}
//     >
//         <TreeView data={treeData}   hierarchicalName={selectedHierarchy}  />
//     </Dialog>
// )}

 

//         </>
//     );
// }

// export default GetHierarchical;

import { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog } from "@progress/kendo-react-dialogs";
import axios from "axios";

import GetStructure from "./GetStructure";
import TreeView from "./TreeView";
import useStructureTree from "./useStructureTree";

function GetHierarchical() {
    const [structures, setStructures] = useState([]);
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(5);

    const [showDialog, setShowDialog] = useState(false);
    const [selectedHierarchyName, setSelectedHierarchyName] = useState("");

    const {treeData,showTreeDialog,selectedHierarchy,handleStructure,setShowTreeDialog} = useStructureTree();

    useEffect(() => {
        axios
            .get("http://localhost:8081/structure/getHierarchical")
            .then((res) => setStructures(res.data))
            .catch(console.error);
    }, []);

    const pageChange = (event) => {
        setSkip(event.page.skip);
        setTake(event.page.take);
    };

    const handleView = (dataItem) => {
        setSelectedHierarchyName(dataItem.HierarchicalName);
        setShowDialog(true);
    };

    const pagedData = structures.slice(skip, skip + take);

    return (
        <>
            <h1>Hierarchical</h1>

            <Grid
                data={pagedData}
                skip={skip}
                take={take}
                total={structures.length}
                pageable={true}
                onPageChange={pageChange}
            >
                <GridColumn
                    field="HierarchicalName"
                    title="Hierarchical Name"
                />

                <GridColumn
                    field="description"
                    title="Description"
                />

                <GridColumn
                    title="Actions"
                    width="200px"
                    cell={(props) => (
                        <td>
                            <Button
                                style={{ margin: "5px" }}
                                onClick={() => handleView(props.dataItem)}
                            >
                                View
                            </Button>

                            <Button
                                onClick={() =>
                                    handleStructure(
                                        props.dataItem.HierarchicalName
                                    )
                                }
                            >
                                Structure
                            </Button>
                        </td>
                    )}
                />
            </Grid>

            {showDialog && (
                <Dialog
                    title="Structure Details"
                    width={800}
                    onClose={() => setShowDialog(false)}
                >
                    <GetStructure
                        hierarchicalName={selectedHierarchyName}
                    />
                </Dialog>
            )}

            {showTreeDialog && (
                <Dialog
                    title="Structure Tree"
                    width={600}
                    onClose={() => setShowTreeDialog(false)}
                >
                    <TreeView
                        data={treeData}
                        hierarchicalName={selectedHierarchy}
                        editable={false}
                        
                    />
                </Dialog>
            )}
        </>
    );
}

export default GetHierarchical;