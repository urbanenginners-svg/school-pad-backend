import { v4 as uuidv4 } from 'uuid';
import { Schema } from 'mongoose';
import { prefixes } from '../prefixes';

/**
 * Setup common fields that are available on every model
 * options:
 * prefix:  [id prefix, i.e, 'prf']
 */

export default function commonFieldsPlugin(schema: Schema, options) {
  schema.add({
    _id: {
      type: String,
      default: function genId() {
        return prefixes[options.name] + '::' + uuidv4();
      },
    },
  });

  schema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id; // Map _id to id
      delete ret._id; // Remove the original _id field
      delete ret.__v; // Remove the version key
      delete ret.keywords; // Remove keywords used for db search
    },
  });

  schema.set('timestamps', true);
}
