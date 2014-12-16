Schema = {};

Schema.Node = new SimpleSchema({
  nodeId: {
    type: Number,
    autoform: {
      type: "hidden"
    }
  },
  parentId: {
    type: Number,
    //required: false,
    autoform: {
      type: "hidden"
    }
  },
  text: {
    type: String
  }
});

Schema.Tree = new SimpleSchema({
  name: {
    type: String,
    label: "Nome"
  },
  nodes: {
    type: [Schema.Node]
  }
});

Trees = new Mongo.Collection("trees");
Trees.attachSchema(Schema.Tree);

if (Meteor.isServer) {
  Trees.allow({
    insert: function () {return true;}
  })
}
