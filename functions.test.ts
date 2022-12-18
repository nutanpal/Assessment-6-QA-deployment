//////////// Part3- UNIT TESTS


const { shuffleArray } = require("./utils");
let arr = [1, 2, 3, 4, 5]; // positive control
//require project data file to test functions on bot array data provided.
const { bots } = require("./data.js");
let arr2 = bots;
//let arr3 =[]; //negative control expected to fail
describe("shuffleArray should", () => {
  // CODE HERE
  // test1- function should return an Array
  //Array.isArray is built-in js function, t/f

  describe("An array returned post-function", () => {
    expect(Array.isArray(shuffleArray(arr))).toBe(true);
    expect(Array.isArray(shuffleArray(arr2))).toBe(true);
    // expect(Array.isArray(shuffleArray(arr3))).toBe(true);
  });
});

//test2- array length stay same
//method - Array.length
test("array length stays same post- function run", () => {
  let result = shuffleArray(arr);
  expect(arr.length).toBe(result.length);
  expect(Array.isArray(shuffleArray(arr2))).toBe(true);
  // .toHaveLength
  expect(shuffleArray(arr2)).toHaveLength(arr2.length);
});

//test3- array includes all of the same items
/*create array, run shuffleArray function, check All SAME values are included in new array generated generated post function run.
 */

test("all array items stay same", () => {
  let result = shuffleArray(arr);

  // arrayContaining method of jest using nested array
  expect(result).toEqual(expect.arrayContaining(arr));
  expect(Array.isArray(shuffleArray(arr2))).toBe(true);
});

/* Alternate for loop and boolean var = arrayContaining
-setup var true 
-for-loop through array , if result array includes -some strange new value, xvar will become false. 
-set expect true if nothing change.*/

// let xvar = true
// for (let i = 0; i< result.length; i++){
// if(arr.includes(result[i])=== false){
//     xvar = false
//     return
//     }
// }

// expect(result).toBe(true)}
// })




// ref: JEST doc cmds