import Product from './model'

export default (api) => {
  api.route('/api/products')
    .get((req, res) => {
      Product.find((error, products) => {
        if(error) {
          res.json({ 'error': 'Cannot GET products.' })
        }
        res.json(products)
      })
    })
    .post((req, res) => {
      const Product = new Product({
        'name': req.body.name,
        'code': req.body.code
      })

      Product.save((error, product) => {
        if(error) {
          res.json({ 'error': 'Cannot CREATE product.' })
        }
        res.json(product)
      })
    })

  api.route('/api/products/:id')
    .get((req, res) => {
      Product.findById(req.params.id, (error, product) => {
        if(error) {
          res.json({ 'error': 'Product not found.' })
        }
        res.json(product)
      })
    })
    .put((req, res) => {
      const id = req.params.id
      const data = { 'name': req.body.name, 'code': req.body.code }
      const options = { 'new': true }

      Product.findByIdAndUpdate(id, data, options, (error, product) => {
        if(error) {
          res.json('Cannot UPDATE product.')
        }
        res.json(product)
      })
    })
    .delete((req, res) => {
      const id = req.params.id

      Product.findByIdAndRemove(id, (error, product) => {
        if(error) {
          res.json({ 'error': 'Cannot DELETE product.' })
        }
        res.json(product)
      })
    })
}
