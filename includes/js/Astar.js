/**
 * Breadth First Search
 */
class Astar
{
    /**
     * Constructor
     * 
     * @param {*} grid - pointer to grid 
     * @param {*} rows a actual number of rows (y)
     * @param {*} cols - actual number of columns (x)
     */
    constructor(grid, rows, cols)
    {
        // Grid
        this.grid = grid;
        // Adjustments for number of rows and columns,
        // as array's are zero indexed.
        this.cols = cols - 1;
        this.rows = rows - 1;

        // Node info
        this.sourceNode = null;
        this.targetNode = null;
        this.currentNode = null;

        // bfs
        this.frontier = [];
        this.neighbors = [];
        this.path = new Queue;

        // astar
        this.openSet = [];
        this.closeSet = [];
    }

    /**
     * Initialization
     * 
     * @param {*} sourceNode 
     * @param {*} targetNode 
     */
    init(sourceNode, targetNode)
    {
        this.sourceNode = sourceNode;
        this.targetNode = targetNode;

        // Initial frontier to search from.
        this.frontier.push(this.sourceNode);

        // astar
        this.openSet.push(this.sourceNode);
        let h = this.heuristic_Diagonal(this.targetNode, this.sourceNode);
        console.log("h: " + h);
    }

    findPath()
    {
        // while (this.openSet.length > 0)
        // {

            // Find the node with the lowest f on the open set
            let lowF = 0;
            for (let i = 0; i < this.openSet.length; i++)
            {
                if (this.openSet[i].f < this.openSet[lowF].f || 
                    this.openSet[i].f == this.openSet[lowF].f && 
                    this.openSet[i].h < this.openSet[lowF].h)
                {
                    lowF = i;
                }
            }

            // Set lowF as current node
            this.currentNode = this.openSet[lowF];
         
            // Remove lowF from the open set
            this.openSet.splice( this.openSet.indexOf(this.currentNode), 1);

            // Add to close set
            this.closeSet.push(this.currentNode);

            // Are we done?
            if (this.currentNode == this.targetNode)
            {
                console.log("DONE");
                console.log("close set length:");
                console.log(this.closeSet.length);
                noLoop();
                return;
            }

            // Clear neighbors array
            this.neighbors = [];

            // Find neighbors and set parent to lowF
            this.findNeighbors(this.grid, this.currentNode);

            // Iterate over neighbors.
            for (var i = 0; i < this.neighbors.length; i++)
            {
                if (this.closeSet.includes(this.neighbors[i]) || this.neighbors[i].id == "wall")
                {
                    continue;
                }

                // if (!this.closeSet.includes(this.neighbors[i]) || this.neighbors[i].id != "wall")
                else
                {
                    // Set parent node for path creation.
                    this.neighbors[i].parent = this.currentNode;

                    // gfx debug
                    if (this.neighbors[i].id != "source")
                    {
                        this.neighbors[i].id = "frontier";
                    }

                    // Calculate costs.
                    this.neighbors[i].g += this.currentNode.g;
                    // this.neighbors[i].g = this.currentNode.g + this.heuristic(this.neighbors[i], this.currentNode);
                    this.neighbors[i].h = this.heuristic_Diagonal(this.targetNode, this.neighbors[i]);
                    this.neighbors[i].f = this.neighbors[i].g + this.neighbors[i].h;
    
                    if (!this.openSet.includes(this.neighbors[i]))
                    {
                        this.openSet.push(this.neighbors[i]);
                    }
                }
            }
    // {
    }

    heuristic_Manhatten(s, t)
    {
        let dx = abs(s.x - t.x)
        let dy = abs(s.y - t.y);
        let d = 10;
        return d * (dx + dy);
    }

    heuristic_Diagonal(s, t)
    {
        let dx = abs(s.x - t.x)
        let dy = abs(s.y - t.y);
        let d = 10;
        let d2 = 10;
        return d * (dx + dy) + (d2 - 2 * d) * min(dx, dy);
    }

    /**
     * Find neighbors of current node.
     * But, only if, it's not been previously visited.
     * 
     * @param {*} grid 
     * @param {*} node 
     */
    findNeighbors(grid, node)
    {
        // North
        if (node.y > 0)
        {
            grid[node.y - 1][node.x].g = 10;
            this.neighbors.push(grid[node.y - 1][node.x]);
        }
        // NW
        if (node.y > 0 && node.x > 0)
        {
            grid[node.y - 1][node.x - 1].g = 14;
            this.neighbors.push(grid[node.y - 1][node.x - 1]);
        }
        // West
        if (node.x > 0)
        {
            grid[node.y][node.x - 1].g = 10;
            this.neighbors.push(grid[node.y][node.x - 1]);
        }
        // SW
        if (node.y < this.rows && node.x > 0)
        {
            grid[node.y + 1][node.x - 1].g = 14;
            this.neighbors.push(grid[node.y + 1][node.x - 1]);
        }
        // South
        if (node.y < this.rows)
        {
            grid[node.y + 1][node.x].g = 10;
            this.neighbors.push(grid[node.y + 1][node.x]);
        }
        // SE
        if (node.y < this.rows && node.x < this.cols)
        {
            grid[node.y + 1][node.x + 1].g = 14;
            this.neighbors.push(grid[node.y + 1][node.x + 1]);
        }
        // East
        if (node.x < this.cols)
        {
            grid[node.y][node.x + 1].g = 10;
            this.neighbors.push(grid[node.y][node.x + 1]);
        }
        // NE
        if (node.y > 0 && node.x < this.cols)
        {
            grid[node.y - 1][node.x + 1].g = 14;
            this.neighbors.push(grid[node.y - 1][node.x + 1]);
        }
    }
}

