# Dijkstra's Algorithm

Recall the pseudocode for Dijkstra's algorithm:
- initialize the dist to each vertex to $\infty$, source to 0
- while there are unmarked vertices left in the graph
    - select the unmarked vertex $v$ with the lowest dist
    - mark $v$ with distance dist
    - for each edge $(v,w)$
        - dist($w$) = min $\left(\textrm{dist}(w), \textrm{dist}(v) + \textrm{weight of }(v, w)\right)$

Implement Dijkstra's algorithm. Start with the template I provided in `code.js`
and test your new function.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

The choice of data structures is up to you -- your implementation does not have
to be the most efficient one, but please make sure that it is not unnecessarily
inefficient.

## Runtime Analysis

What is the big $\Theta$ complexity of your implementation? Add your
answer, including your reasoning, to this markdown file.

Both arrays (dist,vistedNodes) initializes in $O(n)$ time for n being the nodes in the graph. The while loop could run n times for each node as a worse case. The first for loop scans all the nodes ot find the ones that haven't been visted yet with the smallest distance, this happens each iteration of the while loop, so that's $O(n)$ time. The the second for loop checks the nodes neighboring the node with the smallest distance from the first for loop. This also runs $O(n)$ times for each iteration of the while loop. So you have the while loop at $O(n)$, the first and second for loops at $O(n)$ for each. This gives you $O(n)*O(n)+O(n)*O(n)$= $O(n^2)$. Then the time complexety would be $\Theta(n^2)$.


code.test.js was written by chatGPT after I asked for code.test.js file and gave my code to it, after I gave it the code.test.js from "pancake sort" as an example.


https://www.freecodecamp.org/news/dijkstras-algorithm-explained-with-a-pseudocode-example/
https://leetcode.com/discuss/general-discussion/851630/dijkstras-algorithm-in-javascript
