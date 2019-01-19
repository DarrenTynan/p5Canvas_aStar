// Game area
var game_area_width;
var game_area_height;

// Canvas pointers (left panel).
var game_canvas;
// var game_canvas_width;
// var game_canvas_height;
var ctx;

// User controlls (right panel).
var right_panel;
var right_panel_width;
var right_panel_height;

var tile_nodes = [];
var number_of_nodes;

class tile_node
{
    constructor(xPos, yPos, size, index)
    {
        this.x = xPos;
        this.y = yPos;
        this.size = size;
        this.index = index;
        this.offset = 2;
        this.update = function () {
        };
        this.draw = function ()
        {
            ctx.beginPath();
            ctx.fillStyle = "lightgrey";
            // A rectangle (x,y,w,h)
            ctx.fillRect(this.x + this.offset, this.y + this.offset, this.size - this.offset, this.size - this.offset);
            // ctx.fillStyles = (204, 101, 192, 127);
            // ctx.stroke = (127, 63, 120);
            // // A rectangle (x,y,w,h)
            // ctx.rect(this.x + this.offset, this.y + this.offset, this.size - this.offset, this.size - this.offset);
            // ctx.fill();
        };
    }
}

// Main game loop.
function main()
{
    // Call to arms.
    init();

    // Main game loop
    var main_loop = function()
    {
//        update();
        draw();

        window.requestAnimationFrame(main_loop, game_canvas);
    };

    window.requestAnimationFrame(main_loop, game_canvas);
}

// Call to arms
function init()
{
    // Get the outer div game area dimensions.
    game_area_width = document.getElementById("game_area").offsetWidth;
    game_area_height = document.getElementById("game_area").offsetHeight;

    // Get/set left/right panel sizes.
    left_panel_width = (game_area_width / 3) * 2;
    left_panel_height = game_area_height;

    right_panel_width = game_area_width / 3;
    right_panel_height = game_area_height;

    document.getElementById('left_panel').setAttribute("style", "width: " + left_panel_width + "px;" + "height: " + left_panel_height + "px;");
    document.getElementById('right_panel').setAttribute("style", "width: " + right_panel_width + "px;" + "height: " + right_panel_height + "px;");

    // Get the pointer to the actual canvas and set size according to left panel and set the context.
    game_canvas = document.getElementById("game_canvas");
    game_canvas.width = left_panel_width;
    game_canvas.height = left_panel_height;
    ctx = game_canvas.getContext("2d");

    // Debug area. Set size and write the debug information.
    document.getElementById('debug_area').setAttribute("style", "width: " + right_panel_width + "px;" + "height: " + right_panel_height + "px;");

    document.getElementById('debug_canvas_width').innerHTML = game_canvas.width;
    document.getElementById('debug_canvas_height').innerHTML = game_canvas.height;
    
    init_tiles();

    // console.log("gaw: " + game_area_width + " " + game_area_height);
    // console.log("gah: " + game_canvas.width + " " + game_canvas.height);
    // console.log("lpw: " + left_panel_width);
    // console.log("lph: " + left_panel_height);
    // console.log("rpw: " + right_panel_width);
    // console.log("rph: " + right_panel_height);

}

function init_tiles()
{
    var w = Math.floor(game_canvas.width);
    const size_of_tile = 20;
    number_of_nodes = Math.floor(w / size_of_tile);

    var xPos = 0;
    var yPos = 0;
    var index = 0;

    for (var y = 0; y < 10; y++)
    {
        tile_nodes.push([0]);
        for (var x = 0; x < number_of_nodes; x++)
        {
            tile_nodes[y][x] = new tile_node(xPos, yPos, size_of_tile, index++);
            xPos += size_of_tile;
        }
        xPos = 0;
        yPos += size_of_tile;
    }
    // for (var x = 0; x < number_of_nodes; x++)
    // {
    //     tile_nodes[x] = new tile_node(xPos, yPos, size_of_tile, index++);
    //     xPos += size_of_tile;
    // }
}
function update()
{
    ctx.fillRect(0,0,game_canvas.width, game_canvas.height);

    // Save canvas
    ctx.save();

    // Here we update movements.

    // Restore canvas
    ctx.restore();
}

function draw()
{
    
    // ctx.beginPath();
    // ctx.moveTo(20, 20);
    // ctx.lineTo(20, 100);
    // ctx.lineTo(70, 100);
    // ctx.strokeStyle = "red";
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.rect(200,200,30,30);
    // ctx.strokeStyle = "black";
    // ctx.stroke();

    for (var y = 0; y < 10; y++)
    {
        for (var x = 0; x < number_of_nodes; x++)
        {
            tile_nodes[y][x].draw();
        }
    }

    // for (var i = 0; i < tile_nodes.length; i++)
    // {
    //     tile_nodes[i].draw();
    // }

    // ctx.beginPath();
    // ctx.fillStyles = (204, 101, 192, 127);
    // ctx.stroke = (127, 63, 120);
    // var w = 100;
    // var h = 100;
    // var x = (game_canvas.width / 2) - w / 2;
    // var y = (game_canvas.height / 2) - h / 2;
    // ctx.rect(x, y, w, h);
    // ctx.fill();


}

// Main hook
main();