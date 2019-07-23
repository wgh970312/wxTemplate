export function wxToPromise(func, opt) {
  return new Promise((resolve, reject) => {
    func({
      ...opt,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export function formatTime(date){
  date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second; 
}