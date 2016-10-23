const Color = require('./model');

module.exports = function(api) {
  api.route('/api/colors')
    .get((req, res) => {
      Color.find((error, colors) => {
        if(error) {
          res.json({ 'error': 'Cannot GET colors.' });
        }
        res.json(colors);
      });
    })
    .post((req, res) => {
      const color = new Color({
        'name': req.body.name,
        'code': req.body.code
      });

      color.save((error, color) => {
        if(error) {
          res.json({ 'error': 'Cannot CREATE color.' });
        }
        res.json(color);
      });
    });

  api.route('/api/colors/:id')
    .get((req, res) => {
      Color.findById(req.params.id, (error, color) => {
        if(error) {
          res.json({ 'error': 'Color not found.' });
        }
        res.json(color);
      });
    })
    .put((req, res) => {
      const id      = req.params.id;
      const data    = { 'name': req.body.name, 'code': req.body.code };
      const options = { 'new': true };

      Color.findByIdAndUpdate(id, data, options, (error, color) => {
        if(error) {
          res.json('Cannot UPDATE color.');
        }
        res.json(color);
      });
    })
    .delete((req, res) => {
      const id      = req.params.id;

      Color.findByIdAndRemove(id, (error, color) => {
        if(error) {
          res.json({ 'error': 'Cannot DELETE color.' });
        }
        res.json(color);
      });
    });
};
