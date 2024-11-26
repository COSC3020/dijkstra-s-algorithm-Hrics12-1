
function dijkstra(graph, sourceNode) {
    if (graph.length < 2) {
        return [];
    }
    let dist = new Array(graph.length).fill(Infinity);

    dist[sourceNode] = 0;
    let visitedNodes = new Array(graph.length).fill(false);
    let visitedCount = 0;
 
    while (visitedCount != graph.length) {
        let min = Infinity;
        let currentNode = -1;

        for (let i = 0; i < graph.length; i++) { // Find the minimum unvisited node
            if (!visitedNodes[i] && dist[i] < min) {
                min = dist[i];
                currentNode = i;
            }
        }
        if (currentNode === -1) {
            break;

        }
        visitedNodes[currentNode] = true;
        visitedCount++;
        
        for (let nextNode = 0; nextNode < graph.length; nextNode++) {
            if (graph[currentNode][nextNode] > 0) {
                let tempDistance = dist[currentNode] + graph[currentNode][nextNode];
                if (dist[nextNode] > tempDistance) {
                    dist[nextNode] = tempDistance;
                }
            }
        }
    }
    return dist;
}

 
