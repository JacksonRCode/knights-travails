/*
   ___________________
  | [7, 0] ... [7, 7] |
  |  ...   ...   ...  |
  | [0, 0] ... [0, 7] |
   ___________________

   Each move, knight has 8 options:
    x  |  y 
   ____|____
   +1  | +2
   +1  | -2
   -1  | +2
   -1  | -2
   +2  | +1
   +2  | -1
   -2  | +1
   -2  | -1


  Goal: move to specified location 2 from specified location 1
  
  Iterative goal: Get closer to location 2
   
  Constraints: (x >= 0 && x <= 7) && (y >= 0 && y <= 7)

  Create a tree with initial location as the root.
  - BFS
  
*/

const KnightTravail = (start, goal) => {
  let _start = start;
  let _goal = goal;
  const MOVES = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  const travailBFS = () => {
    let queue = [_start];
    let parents = {};

    if (_start[0] === goal[0] && _start[1] === goal[1]) {
      return _start;
    }

    let found = false;

    while (!found) {
      const curr = queue.splice(0, 1)[0];

      MOVES.forEach((move) => {
        const res = [curr[0] + move[0], curr[1] + move[1]];

        let seen = parents.hasOwnProperty(`${res[0]},${res[1]}`);

        if (res[0] >= 0 && res[0] <= 7 && res[1] >= 0 && res[1] <= 7 && !seen) {
          queue.push(res);
          parents[`${res[0]},${res[1]}`] = `${curr[0]},${curr[1]}`;
          if (res[0] === goal[0] && res[1] === goal[1]) {
            found = true;
          }
        }
      });
    }

    let path = [];
    let curr = goal;

    while (curr[0] !== _start[0] || curr[1] !== _start[1]) {
      path.push(curr);
      curr = parents[`${curr[0]},${curr[1]}`].split(",").map(Number);
    }

    path.push(_start);
    path.reverse();

    return stringify(path);
  };

  const stringify = (path) => {
    let ret = "";

    path.forEach((spot) => {
      if (spot[0] === goal[0] && spot[1] === goal[1]) {
        ret += spot;
      } else {
        ret += spot + " --> ";
      }
    });

    return ret;
  };

  return { travailBFS };
};

let game = KnightTravail([3, 3], [4, 3]);
console.log(game.travailBFS());
