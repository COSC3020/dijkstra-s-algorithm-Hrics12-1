function dijkstra(graph, sourceNode) {
    let distances = {};
    let visited = new Set();
    
    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[sourceNode] = 0;

    while (Object.keys(graph).length !== visited.size) {
        let unvisitedNodes = Object.keys(graph).filter(node => !visited.has(node));
        let closestNode = unvisitedNodes.reduce((a, b) => distances[a] < distances[b] ? a : b);

        visited.add(closestNode);

        for (let neighbor in graph[closestNode]) {
            let alternatePathDistance = distances[closestNode] + graph[closestNode][neighbor];
            if (alternatePathDistance < distances[neighbor]) {
                distances[neighbor] = alternatePathDistance;
            }
        }
    }

    return distances;
}

module.exports = dijkstra;
