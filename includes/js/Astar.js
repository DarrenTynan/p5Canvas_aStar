/**
 * Bredth First Search
 */
class Astar
{
    /**
     * Constructor
     * 
     * @param {*} grid - pointer to grid 
     * @param {*} cols - actual number of columns
     * @param {*} rows a actual number of rows
     */
    constructor(grid, cols, rows)
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

        this.frontier = [];
        this.neighbors = [];
        this.path = new Queue;
    }

    /**
     * Initialisation
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
    }

    /**
     * Start the bfs.
     */
    findPath()
    {
        // while (this.frontier.length > 0)
        // {
            // Clear neighbors array
            this.neighbors = [];

            // 1. Remove from frontier
            this.currentNode = this.frontier.shift();

            // Are we done?
            if (this.currentNode == this.targetNode)
            {
                // Build path from parents.
                while (this.currentNode != this.sourceNode)
                {
                    this.path.enqueue(this.currentNode);
                    this.currentNode = this.currentNode.parent;
                }

                // Itterate over path and set id to 'path'.
                var pf;
                var size = this.path.size();
                for (var p = 0; p < size; p++)
                {
                    pf = this.path.dequeue();
                    pf.id = "path";
                    pf.draw();
                }

                this.frontier.length = 0;
                noLoop();
                return;
            }
            
            // 2. Increase frontier (find all neighbors)
            this.increaseFrontier(this.grid, this.currentNode);

            // Iterate over neighbors.
            for (var i = 0; i < this.neighbors.length; i++)
            {
                // Check only non-visited neigbor.
                if (this.neighbors[i].visited == false && this.neighbors[i].id != "wall")
                {
                    // Set as visited
                    this.neighbors[i].visited = true;

                    // GUI section.
                    if(this.neighbors[i].id != "source")
                    {
                        this.neighbors[i].id = "frontier";
                    }

                    // Set parent node for path creation.
                    this.neighbors[i].parent = this.currentNode;

                    // And push onto the frontier.
                    this.frontier.push(this.neighbors[i]);
                }
            }
        // }

    }

    /**
     * Increase the frontier from current node.
     * But, only if, it's not been previously visited.
     * 
     * @param {*} grid 
     * @param {*} node 
     */
    increaseFrontier(grid, node)
    {
        // North
        if (node.y > 0)
        {
            if (this.grid[node.x][node.y - 1].visited == false)
            this.neighbors.push(grid[node.x][node.y - 1]);
        }
        // West
        if (node.x > 0)
        {
            if (this.grid[node.x - 1][node.y].visited == false)
            this.neighbors.push(grid[node.x - 1][node.y]);
        }
        // South
        if (node.y < this.rows)
        {
            if (this.grid[node.x][node.y + 1].visited == false)
            this.neighbors.push(grid[node.x][node.y + 1]);
        }
        // East
        if (node.x < this.cols)
        {
            if (this.grid[node.x + 1][node.y].visited == false)
            this.neighbors.push(grid[node.x + 1][node.y]);
        }

    }

}

