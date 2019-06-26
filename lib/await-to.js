function to (promise) {
  return promise.then(data => [ null, data ]).catch(error => [ error ])
}

export default to
