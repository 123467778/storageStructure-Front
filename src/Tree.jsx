// import TreeNode from "./TreeNode";

// function Tree({ data = [] }) {
//   return (
//     <ul>
//       {data.map((node) => (
//         <TreeNode key={node.id} node={node} />
//       ))}
//     </ul>
//   );
// }

// export default Tree;


import TreeNode from "./TreeNode";

function Tree({ nodes = [] }) {
  return (
    <div className="tree">
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
}

export default Tree;