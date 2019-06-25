import mongoose from 'mongoose'

const { model, Schema } = mongoose

const Product = model('Product', new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true }
}))

export default Product
