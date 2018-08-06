const promisify = (fn) =>
  (...args) =>
    new Promise((resolve, reject) => {
      fn.apply(null, args.concat((err, v) => {
        if (err) { reject(err); }
        resolve(v);
      }));
    });

module.exports = promisify;
