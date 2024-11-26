const fs = require('fs');
const jsc = require('jsverify');

// Load the `dijkstra` function from 'code.js' (assumed to be in the same directory)
eval(fs.readFileSync('code.js') + '');

// Test case for Dijkstra’s algorithm
const testDijkstra = jsc.forall('array (array nat) nat', function (graph, sourceNode) {
    // Ensure that graph is a valid adjacency matrix and sourceNode is within bounds
    if (graph.length < 2 || sourceNode < 0 || sourceNode >= graph.length) {
        return true; // Skip this test case if invalid graph or source node
    }

    // Calculate the expected distances using a brute-force approach (e.g., Bellman-Ford)
    function bellmanFord(graph, sourceNode) {
        const dist = new Array(graph.length).fill(Infinity);
        dist[sourceNode] = 0;

        for (let i = 0; i < graph.length - 1; i++) {
            for (let u = 0; u < graph.length; u++) {
                for (let v = 0; v < graph.length; v++) {
                    if (graph[u][v] > 0 && dist[u] !== Infinity && dist[u] + graph[u][v] < dist[v]) {
                        dist[v] = dist[u] + graph[u][v];
                    }
                }
            }
        }
        return dist;
    }

    // Run the dijkstra algorithm on the graph
    const resultDijkstra = dijkstra(graph, sourceNode);
    
    // Run the bellmanFord (or other reference algorithm) on the graph for comparison
    const resultBellmanFord = bellmanFord(graph, sourceNode);

    // Check if the results are the same
    return JSON.stringify(resultDijkstra) === JSON.stringify(resultBellmanFord);
});

// Run the test
jsc.assert(testDijkstra);
