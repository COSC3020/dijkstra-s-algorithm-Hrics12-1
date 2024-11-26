const fs = require('fs');
const jsc = require('jsverify');

// Load the code file that contains the Dijkstra function
eval(fs.readFileSync('code.js') + '');

// Test for Dijkstra's algorithm
const testDijkstra =
    jsc.forall("array (array nat) nat", function (graph, sourceNode) {
        // Ensure the graph is valid (non-negative weights and square)
        if (graph.length < 2 || !graph.every(row => row.length === graph.length) || !graph.every(row => row.every(cell => cell >= 0))) {
            return true;  // Skip invalid graphs
        }

        // Run Dijkstra's algorithm
        let result = dijkstra(graph, sourceNode);

        // Check that the distances are non-negative
        if (result.some(dist => dist < 0)) {
            return false;
        }

        // Check that for each node, the distance is not greater than any alternative path
        for (let i = 0; i < graph.length; i++) {
            if (i === sourceNode) continue;
            for (let j = 0; j < graph.length; j++) {
                if (graph[i][j] > 0) {
                    // Check if any direct path gives a shorter distance than the shortest found path
                    let altDist = result[i] + graph[i][j];
                    if (result[j] > altDist) {
                        return false;  // If we find a shorter alternative, the result is wrong
                    }
                }
            }
        }

        return true;  // If all checks pass, the test is successful
    });

// Assert the Dijkstra test
jsc.assert(testDijkstra);

// Test for specific edge cases, like a graph with one or two nodes
const testEdgeCases =
    jsc.forall("array nat", function (arr) {
        if (arr.length === 1) {
            // Graph with only one node should return zero distance for that node
            let graph = [[0]];
            let result = dijkstra(graph, 0);
            return result[0] === 0;
        }
        if (arr.length === 2) {
            // A graph with two nodes: one with no edge and another with an edge between them
            let graph = [[0, 1], [1, 0]];
            let result = dijkstra(graph, 0);
            return result[0] === 0 && result[1] === 1;
        }
        return true;
    });

// Assert the edge case test
jsc.assert(testEdgeCases);
