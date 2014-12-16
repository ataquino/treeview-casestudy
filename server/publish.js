Meteor.publish("trees", function () {
  return Trees.find();
});
