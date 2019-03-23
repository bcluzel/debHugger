export default function (callback, delay) {
  var
    _timeout,
    start,
    remaining = delay,
    delay = delay
  this.pause = function () {
    clearTimeout(_timeout)
    remaining -= new Date() - start
  }
  this.resume = function () {
    start = new Date()
    clearTimeout(_timeout)
    _timeout = setTimeout(callback, remaining)
  }
  this.getRemaining = function () {
    return remaining
  }
  this.getDelay = function () {
    return delay
  }
  this.getStart = function () {
    return start
  }
  this.resume()
}
