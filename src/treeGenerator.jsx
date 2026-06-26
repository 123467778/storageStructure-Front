
let id = 1;

function createNodes(levels, currentLevel = 0, path = "") {
    // last node check with level length.,stop recu
    if (currentLevel >= levels.length) return []; 
// data of current level i.e name and quants
    const current = levels[currentLevel];
    const nodes = [];

    for (let i = 1; i <= current.quantity; i++) {
         //1 or 11 // 2 12
        const currentPath =
       
            path === "" ? `${i}` : `${path}${i}`;

        nodes.push({
            id: id++,
            name: `${current.nodeName} ${currentPath}`,
            children: createNodes(levels, currentLevel + 1, currentPath)
        });
    }

    console.log ("From treeGenerator" , nodes);

    return nodes;
}

export function generateTree(levels) {
    id = 1; 
    return createNodes(levels);
}













