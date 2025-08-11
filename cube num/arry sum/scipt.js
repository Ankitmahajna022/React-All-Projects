//wap to find sum of array by udf and pop method

function findSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}


let numbers = [10, 20, 30, 40, 50];

console.log("Original Array:", numbers);
console.log("Sum of Array:", findSum(numbers))

numbers.pop();
console.log("Array after pop:", numbers);
console.log("Sum after pop:", findSum(numbers));

// memory allocation
// let numbers= [undfined]

// execution context
// let numbers= [10,20,30,40,50]
// findSum(numbers) ->execution context -> memory allocation-> execution context
                                                                // arr=[10,20,30,40,50]
                                                                //useing for loop sum 
                                            // sum=undefined
                                            // i=undefined
// same mode for pop
