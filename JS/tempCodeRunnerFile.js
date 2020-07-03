
let promises = [
    getPromise(0),
    getPromise(1),
    getPromise(2),
    getPromise(3),
    getPromise(4),
];

var res = [];

function push(r) {
    res.push(r);
}

let parallelPromises = promises.reduce(
    (total, currentValue) => total.then(() => currentValue.then(push)),Promise.resolve()
  )
  console.log(res);
parallelPromises
.then(() => {
  console.log('res:', res)
})
.catch((err) => {
    console.log(err);
  console.log('done')
})

function getPromise(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(n <=2) {
                resolve(n);
            }else{
                reject(n)
            }
        }, 300)
    })
}