module.exports = function(api) {
  api.route('/api/colors')
    .get((req, res) => {
      res.send('GET /api/colors');
    })
    .post((req, res) => {
      res.send('POST /api/colors');
    });

  api.route('/api/colors/:id')
    .get((req, res) => {
      res.send('GET /api/colors/:id');
    })
    .put((req, res) => {
      res.send('PUT /api/colors/:id');
    })
    .delete((req, res) => {
      res.send('DELETE /api/colors/:id');
    })
};
