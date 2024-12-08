function handleCounterRequest(method, params, counter) {
    switch (method) {
      case 'counter.increment':
        return { result: ++counter, newValue: counter };
      case 'counter.decrement':
        return { result: --counter, newValue: counter };
      case 'counter.get':
        return { result: counter, newValue: counter };
      default:
        return { error: 'Unknown method' };
    }
  }
  
  module.exports = { handleCounterRequest };
  