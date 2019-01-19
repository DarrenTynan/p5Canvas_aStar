// Pointers
let p5canvas;
let bfs;

// The grid of nodes displayed on screen.
let grid = [];

// The following are calculated from UI settings.
let number_of_columns;
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
}

function makeGrid()
{
    // Clear vars for 'Update Grid!'.
    background(255);
    bfs = null;
    grid = [];
    source = null;
    target = null;

    // Get the wall frequncy
    var e = document.getElementById("selectWallFrequency");
    var wallFrequency = e.options[e.selectedIndex].value;

    // Get grid size.
    e = document.getElementById("selectGridSize");
    size_of_tile = p5canvas.width / e.options[e.selectedIndex].value;

    number_of_columns = Math.floor(p5canvas.width / size_of_tile);
    number_of_rows = Math.floor(p5canvas.height / size_of_tile);

    // Create empty array.
    grid = make2Darray(number_of_columns, number_of_rows);

    var xPos = 0;
    var yPos = 0;

    // Fill array with GridNode instances
    for (var i = 0; i < number_of_columns; i++)
    {
        for (var j = 0; j < number_of_rows; j++)
        {
            grid[i][j] = new GridNode(i, j, xPos, yPos, size_of_tile, wallFrequency);
            xPos += size_of_tile;
        }
        // Reset xPos to start of row.
        xPos = 0;

        // And increase the y position for 1 node down.
        yPos += size_of_tile;
    }

    // Initial draw of grid.
    for (var i = 0; i < number_of_columns; i++)
    {
        for (var j = 0; j < number_of_rows; j++)
        {
            grid[i][j].draw();
        }
    }

}

/**
 * Helper function to create 2d array.
 * 
 * @param {*} cols 
 * @param {*} rows 
 */
function make2Darray(cols, rows)
{
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++)
    {
        arr[i] = new Array(rows);
    }
    return arr;
}

/**
 * Loop through grid and call draw.
 */
var counter = 0;
function draw()
{
    if (grid)
    {
        counter = counter + 1;
        if (counter > 10)
        {
            counter = 0;
            if (bfs != null && bfs.frontier.length > 0)
            {
                bfs.findPath();
            }
        }

        if (bfs != null && bfs.frontier.length > 0)
        {
            for (var i = 0; i < bfs.frontier.length; i++)
            {
                if (bfs.frontier[i].id != 'source')
                {
                    bfs.frontier[i].draw();
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
    }

    if (document.getElementById("checkSource").checked)
    {
        grid[ny][nx].id = "source";
        source = grid[ny][nx];
        grid[ny][nx].draw();
    }

    if (document.getElementById("checkTarget").checked)
    {
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
    bfs = new Bfs(grid, number_of_columns, number_of_rows);

    bfs.init(source, target);

    bfs.findPath();
}
