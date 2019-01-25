/**
 * The main sketch file.
 * 
 * @author Darren Tynan
 * @date Jan 2019
 *
 * Responsible for UI interface, event handling
 * and drawing calls
 */

// Pointers
let p5canvas;
let astar;

// The grid of nodes displayed on screen.
let grid = [];

// The following are calculated from UI settings.
let number_of_cols;
let number_of_rows;
let size_of_tile;

// Temp for now!
let source = null;
let target = null;

let animate = false;

/**
 * p5 setup function.
 */
function setup()
{
    // Get width of <div>
    var p5canvas_width = document.getElementById("p5canvas").offsetWidth;

    // Create and set p5canvas size.
    p5canvas = createCanvas(p5canvas_width, p5canvas_width);
    // background(255);

    // Set as child of <div>
    p5canvas.parent("p5canvas");

    // Assign mouse presses to only register on canvas.
    p5canvas.mousePressed(checkCanvasMouse);

    makeGrid();
    frameRate(2);
}

function makeGrid()
{
    // Clear vars for 'Update Grid!'.
    background(255);
    astar = null;
    grid = [];

    // Get the wall frequency
    var e = document.getElementById("selectWallFrequency");
    var wallFrequency = e.options[e.selectedIndex].value;

    // Get grid size.
    e = document.getElementById("selectGridSize");
    size_of_tile = p5canvas.width / e.options[e.selectedIndex].value;

    number_of_cols = Math.floor(p5canvas.width / size_of_tile);
    number_of_rows = Math.floor(p5canvas.height / size_of_tile);

    // Create empty array.
    grid = make2Darray(number_of_rows, number_of_cols);

    var xPos = 0;
    var yPos = 0;

    // Fill array with GridNode instances
    for (var r = 0; r < number_of_rows; r++)
    {
        for (var c = 0; c < number_of_cols; c++)
        {
            grid[r][c] = new GridNode(r, c, yPos, xPos, size_of_tile, wallFrequency);
            xPos += size_of_tile;
        }
        // Reset xPos to start of row.
        xPos = 0;

        // And increase the y position for 1 node down.
        yPos += size_of_tile;
    }

    // Temporary source and target node for the GUI.
    // Pre-set to arbitrary 
    source = grid[0][0];
    target = grid[0][1];

    // Initial draw of grid.
    for (var r = 0; r < number_of_rows; r++)
    {
        for (var c = 0; c < number_of_cols; c++)
        {
            grid[r][c].draw();
        }
    }

}

/**
 * Helper function to create 2d array.
 * 
 * @param {*} rows (y)
 * @param {*} cols (x)
 */
function make2Darray(rows, cols)
{
    var arr = new Array(rows);
    for (var i = 0; i < arr.length; i++)
    {
        arr[i] = new Array(cols);
    }
    return arr;
}

/**
 * Loop through grid and call draw.
 */
function draw()
{
    if (grid && astar != null)
    {
        if (astar.openSet.length > 0)
        {
            for (var i = 0; i < astar.openSet.length; i++)
            {
                if (astar.openSet[i].id != "source" || astar.openSet[i].id != "path")
                {
                    astar.openSet[i].draw();
                }
            }
        }

        if (astar.closeSet.length > 0)
        {
            for (var i = 0; i < astar.closeSet.length; i++)
            {
                if (astar.closeSet[i].id != "source" || astar.closeSet[i].id != "path")
                {
                    astar.closeSet[i].draw();
                }
            }
        }
    }

}

/**
 * If LMB, check were; tile or UI.
 */
function checkCanvasMouse()
{
    var nx = 0;
    var ny = 0;

    if (mouseX <= size_of_tile && mouseY <= size_of_tile)
    {
        nx = 0;
        ny = 0;
    }
    else
    {
        // Thought process.
        // Click at [ 237 ; 112 ]
        // Blocks of 10x10
        // Grid index = [ 237/10 ; 112/10 ] = [ 23.7 ; 11.2 ]
        // Round them to get the "closest"
        // Block indices are 24;11

        var grid_index_x = mouseX / size_of_tile;
        var grid_index_y = mouseY / size_of_tile;

        // Node on grid identified.
        nx = Math.floor(grid_index_x);
        ny = Math.floor(grid_index_y);
    }

    // Check radio buttons.
    if (document.getElementById("checkInfo").checked)
    {
        document.getElementById('debug_nodeX').innerHTML = nx;
        document.getElementById('debug_nodeY').innerHTML = ny;
        document.getElementById('debug_id').innerHTML = grid[ny][nx].id;
        document.getElementById('debug_fcost').innerHTML = grid[ny][nx].f;
        document.getElementById('debug_gcost').innerHTML = grid[ny][nx].g;
        document.getElementById('debug_hcost').innerHTML = grid[ny][nx].h;
        if(grid[ny][nx].parent == undefined)
        {
            document.getElementById('debug_parentX').innerHTML = "null";
            document.getElementById('debug_parentY').innerHTML = "null";
        }
        else
        {
            document.getElementById('debug_parentX').innerHTML = grid[ny][nx].parent.x;
            document.getElementById('debug_parentY').innerHTML = grid[ny][nx].parent.y;
        }
    }

    if (document.getElementById("checkSource").checked)
    {
        grid[source.y][source.x].id = "blank";
        grid[source.y][source.x].draw();

        grid[ny][nx].id = "source";
        source = grid[ny][nx];
        grid[ny][nx].draw();
    }

    if (document.getElementById("checkTarget").checked)
    {
        grid[target.y][target.x].id = "blank";
        grid[target.y][target.x].draw();

        grid[ny][nx].id = "target";
        target = grid[ny][nx];
        grid[ny][nx].draw();
    }

    if (document.getElementById("checkWall").checked)
    {
        grid[ny][nx].id = "wall";
        grid[ny][nx].draw();
    }

    if (document.getElementById("checkBlank").checked)
    {
        grid[ny][nx].id = "blank";
        grid[ny][nx].draw();
    }

}

/**
 * Start the pathfinder if source and target are set.
 */
function goForIt()
{
    if (source === null || target === null)
    {
        alert("Source and/or target not set!");
        return;
    }

    // Initialize the Bfs.
    astar = new Astar(grid, number_of_rows, number_of_cols);

    astar.init(source, target);

    astar.findPath();
}
