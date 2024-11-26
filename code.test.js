const fs = require('fs');
const jsc = require('jsverify');

// Evaluate the Dijkstra function
eval(fs.readFileSync('code.js') + '');

// Property-based test for Dijkstra's algorithm
const testDijkstra = jsc.forall("array array nat", function(graph) {
    // Handle invalid graphs with fewer than 2 nodes or non-square adjacency matrices
    if (graph.length < 2 || graph.some(row => row.length !== graph.length)) {
        return true; // Skip invalid graphs
    }

    // Choose a random source node (0-based index)
    const sourceNode = Math.floor(Math.random() * graph.length);

    // Run Dijkstra's algorithm
    const result = dijkstra(graph, sourceNode);

    // Ensure the result is an array of distances
    if (result.length !== graph.length) {
        return false; // If the result length doesn't match the graph length, fail the test
    }

    // Check that the distances are non-negative (or Infinity for unreachable nodes)
    return result.every(dist => dist >= 0 || dist === Infinity);
});

// Run the test
jsc.assert(testDijkstra);
