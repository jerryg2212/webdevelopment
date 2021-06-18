

function range(start, end){
    if(arguments.length < 2){
        return (last) => {return range(start, last)}
    }
    else{
        let result = [];
        while(start <= end){
            result.push(start);
            start++;
        }
        return result;
    }
}
let start3 = range(3);
let start4 = range(4);
console.log(range(3,3));
console.log(range(3,8));
console.log(range(3,0));
console.log(start3(3));
console.log(start3(8));
console.log(start3(0));
console.log(start4(6));