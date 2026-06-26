// function TreeNode({ node }) {
//   return (
//     <li>
//       {node.name}

//       {node.children?.length > 0 && (
//         <ul>
//           {node.children.map((child) => (
//             <TreeNode key={child.id} node={child} />
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// }

// export default TreeNode;


// import { useState } from "react";

// function TreeNode({ nodes }) {
//   const [expanded, setExpanded] = useState(false);

//   const hasChildren = node.children && node.children.length > 0;

//   return (
//     <div style={{ marginLeft: "12px" }}>
//       {/* Node header */}
//       <div
//         onClick={() => setExpanded(!expanded)}
//         style={{
//           cursor: hasChildren ? "pointer" : "default",
//           display: "flex",
//           alignItems: "center",
//           gap: "6px",
//           userSelect: "none"
//         }}
//       >
//         {/* Arrow */}
//         {hasChildren && (
//           <span>{expanded ? "📂" : "📁"}</span>
//         )}

//         {/* Leaf icon */}
//         {!hasChildren && <span>📄</span>}

//         {/* Name */}
//         <span>{node.name}</span>
//       </div>

//       {/* Children */}
//       {expanded && hasChildren && (
//         <div style={{ paddingLeft: "16px" }}>
//           {node.children.map((child) => (
//             <TreeNode key={child.id} node={child} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TreeNode;








import { useState } from "react";

function TreeNode({ node }) {
    const [expanded, setExpanded] = useState(false);

    const hasChildren =
        node.children && node.children.length > 0;

    return (
        <div style={{ marginLeft: "15px" }}>
            <div
                onClick={() => hasChildren && setExpanded(!expanded)}
                style={{
                    cursor: hasChildren ? "pointer" : "default",
                    padding: "5px 0"
                }}
            >
                {hasChildren ? (
                    expanded ? "▼" : "▶"
                ) : (
                    "•"
                )}{" "}
                {node.name}
            </div>

            {expanded &&
                hasChildren &&
                node.children.map((child) => (
                    <TreeNode
                        key={child.id}
                        node={child}
                    />
                ))}
        </div>
    );
}

export default TreeNode;