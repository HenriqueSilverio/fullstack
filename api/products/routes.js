import to from '../../lib/await-to'

import auth from '../auth'
import Product from './model'

export default (api) => {
  api.route('/api/products')
    .all(auth.authenticate())
    .get(async (req, res) => {
      const [ error, products ] = await to(Product.find())
      if(error) {
        res.json({ 'error': 'Cannot GET products.' })
      }
      res.json(products)
    })
    .post(async (req, res) => {
      const model = new Product({
        'name': req.body.name,
        'code': req.body.code
      })
      const [ error, product ] = await to(model.save())
      if(error) {
        res.json({ 'error': 'Cannot CREATE product.' })
      }
      res.json(product)
    })

  api.route('/api/products/:id')
    .all(auth.authenticate())
    .get(async (req, res) => {
      const [ error, product ] = await to(Product.findById(req.params.id))
      if(error) {
        res.json({ 'error': 'Product not found.' })
      }
      res.json(product)
    })
    .put(async (req, res) => {
      const id = req.params.id
      const data = { 'name': req.body.name, 'code': req.body.code }
      const [ error, product ] = await to(Product.findByIdAndUpdate(id, data, { 'new': true }))
      if(error) {
        res.json('Cannot UPDATE product.')
      }
      res.json(product)
    })
    .delete(async (req, res) => {
      const [ error, product ] = await to(Product.findByIdAndRemove(req.params.id))
      if(error) {
        res.json({ 'error': 'Cannot DELETE product.' })
      }
      res.json(product)
    })
}
