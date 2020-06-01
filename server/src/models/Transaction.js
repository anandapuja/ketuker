import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userOriginal: {
    type: String,
    required: true
  },
  userTarget: {
    type: String,
    required: true
  },
  productOriginal: {
    type: Array,
    required: true
  },
  productTarget: {
    type: Array,
    required: true
  },
  status: {
    type: Boolean,
  },
});

transactionSchema.pre('save', (next) => {
  this.status = false;
  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
