import mongoose from 'mongoose'

const { model, Schema } = mongoose

const Product = model('Product', new Schema({
  name: String,
  code: String
}))

export default Product
