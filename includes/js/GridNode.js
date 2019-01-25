/**
 * Grid Node class
 * 
 * @author Darren Tynan
 * @date Jan 2019
 *
 * Each node on the grid has an instance with:
 * node x/y position
 * draw x/y position and size
 * the wall frequency percentage so as walls can be selected at random.
 */
class GridNode
{
    constructor(_nodeY, _nodeX, _drawY, _drawX, _size, _wallFrequency)
    {
        // Node position in grid.
        this.y = _nodeY;
        this.x = _nodeX;
        // Draw position coordinates.
        this.drawY = _drawY;
        this.drawX = _drawX;
        // Id of node: blank, source, target, wall, etc.
        if (random(1) < _wallFrequency)
        {
            this.id = "wall";
        }
        else
        {
            this.id = "blank";
        }
        // Size of tile in pixels
        this.size = _size;
        // The offset in pixels to be subtracted.
        this.offset = 2;
        // Where did it come from? (parent)
        this.parent = null;
        // Costs of node
        // f(n) = g(n) + h(n)
        // g(n) is the cost between start node and current node.
        // h(n) is the heuristic (10 = up/down left/right. 14 = diagonal).
        this.f = 0;
        this.g = 0;
        this.h = 0;
    }

    /**
     * Draw function based on instance id for color selection.
     */
    draw()
    {
        switch(this.id)
        {
            case("source"):
                fill(0,0,255);
                break;
            case("target"):
                fill(255,0,0);
                break;
            case("wall"):
                fill(17,17,17);
                break;
            case("blank"):
                fill(255,255,255);
                break;
            case("frontier"):
                fill(0,255,0);
                break;
            case("path"):
                fill(255,247,0);
                break;
            case("debug"):
                fill(255,255,0);
                break;
            default:
                noFill();
        }

        rect(this.drawX + this.offset, this.drawY + this.offset, this.size - this.offset*2, this.size - this.offset*2, 5);
    }

    /**
     * Draw function based on passed in fill color.
     * 
     * @param {*} fillColor 
     */
    drawSet(fillColor)
    {
        fill(fillColor);
        rect(this.drawX + this.offset, this.drawY + this.offset, this.size - this.offset*2, this.size - this.offset*2, 5);
    }
}
