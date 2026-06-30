import logo from './logo.svg';
import './App.css';
import Tree from './Tree';
import DisplayCategory from './DisplayCategory';
import AddStructure from './AddStructure';
import GetHierarchical from './GetHierarchical';
import GetStructure from './GetStructure';
import StorageStructure from './StorageStructure';
function App() {
//   const data = [
//   {
//     id: 1,
//     name: "Electronics",
//     children: [
//       {
//         id: 2,
//         name: "Computers",
//         children: [
//           { id: 3, name: "Laptops", children: [] },
//           { id: 4, name: "Desktops", children: [] }
//         ]
//       },
//       {
//         id: 5,
//         name: "Phones",
//         children: []
//       }
//     ]
//   }
// ];

  return (
   <>
   {/* <Tree data={data}/> */}
   {/* <DisplayCategory/>  */}
   {/* <AddStructure/> */}
   {/* <GetHierarchical/> */}
   {/* <GetStructure/> */}
   <StorageStructure/>
   </>
  );
}

export default App;
