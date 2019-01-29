# p5Canvas_aStar

A graphical representation of an A* Search algorithm on a grid of nodes.
The panel is used debug information, grid information and left mouse selections.

The grid is a p5.js canvas, that is not responsive, so, you will need to refresh the page if changing size.

## How to use
The Grid Size and Wall Frequency are setup by default, but can be changed from the dropdowns.
If you LMB click on a Node then the action under Left Mouse will be issued.
You select a Source and Target node before Go For It! too see the calculation and final path.

## What I learnt
* The A* Search algorithm.
* Improved my Javascript

## What could I improve?
* Code recfactor the find neighbors method; instead of a buch of if's.
* The most computational time is taken up by searching the openSet for the node with the lowest F cost. This could be optimized by using a heap data structure.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
