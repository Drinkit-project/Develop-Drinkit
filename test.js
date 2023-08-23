function sum(a, b) {
  return new Promise((res) => {
    setTimeout(() => {
      res(a + b);
    }, 2000);
  });
}

console.log('before');
sum(4, 5).then((val) => {
  console.log(val);
  console.log('after');
});
