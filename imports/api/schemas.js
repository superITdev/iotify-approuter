const Schemas = {};
Schemas.Deployments = new SimpleSchema({
  _id: {
    type: String,
    label: 'deployment id',
    optional: true,
  },
  ownerId: {
    type: String,
    label: 'owner id',
    optional: true,
  },
  createdAt: {
    type: Date,
    label: 'created date',
    optional: true,
  },
  updatedAt: {
    type: Date,
    label: 'updated date',
    optional: true,
  },
  name: {
    type: String,
    label: 'owner id',
    optional: true,
  },
  description: {
    type: String,
    label: 'owner id',
    optional: true,
  },
  graph: {
    type: String,
    label: 'owner id',
    optional: true,
  },
});

export default Schemas;