let id = 1;
// const key = crypto.randomUUID();
export function uuidGeneration() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 || 0x8);
    return v.toString(16);
  });
}

function createNodes(levels, currentLevel = 0, path = "") {
    console.log(levels.length);
    // last node check with level length.,stop recu
    if (currentLevel >= levels.length) return []; 
// data of current level i.e name and quants
    const current = levels[currentLevel];

    const nodes = [];


    for (let i = 1; i <= current.quantity; i++) {
         //1 or 11 // 2 12
        const currentPath = path === "" ? `${i}` : `${path}${i}`;

        nodes.push({
            id: id++,
            name: `${current.nodeName} ${currentPath}`,
            displayName:`${current.displayName} ${currentPath}`,
               icon: current.icon, 
               isLeaf:current.isLeaf,
               key:uuidGeneration(),


            children: createNodes(levels, currentLevel + 1, currentPath)
        });
    }

    console.log ("From treeGenerator" , nodes);

    return nodes;
}

export function generateTree(levels) {
    id = 2; 
    return createNodes(levels);
}

export function getNextId() {
        console.log("from next Id" ,id);

    return id++;
}











