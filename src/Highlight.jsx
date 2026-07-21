// import React from "react";

// const HighLight = ({ text, search }) => {

//   if (!search || search.trim() === "") {
//     return <>{text}</>;
//   }

  

//   const regex = new RegExp(`(${search})`, "gi");

//   // Split text while keeping matched words
//   const parts = text.split(regex);

//   return (
//     <>
//       {parts.map((part, index) =>
//         part.toLowerCase() === search.toLowerCase() ? (
//           <span
//             key={index}
//             style={{
//               backgroundColor: "#DCDCDC"
//             }}
//           >
//             {part}
//           </span>
//         ) : (
//           <span key={index}>{part}</span>
//         )
//       )}
//     </>
//   );
// };

// export default HighLight;
