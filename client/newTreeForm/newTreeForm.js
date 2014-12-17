Template.newTreeForm.helpers({

  getFormType: function () {
    return Session.get("treeDoc")._id ? "update" : "insert";
  },
  getDoc: function() {
    //console.log(Session.get("treeDoc"));
    return Session.get("treeDoc");
  },
  getParent: function() {
    var tree = Session.get("treeDoc");
    return tree.nodes[0];
  }
});

getIndex = function(tree, node) {
  return tree.nodes.indexOf(tree.nodes.filter(function(obj) {
    return obj.nodeId === node.nodeId;
  })[0]);
};

removeChild = function(tree, nodeId) {

  var node = tree.nodes.filter(function(e) {
    return e.nodeId === nodeId;
  })[0];

  var children = tree.nodes.filter(function(e) {
    return e.parentId === nodeId;
  });

  // console.log({e: "child", child: child});
  // console.log({e: "children", children: children});

  for (var i = 0; i < children.length; i++) {

    removeChild(tree, children[i].nodeId);
  }

  var index = tree.nodes.indexOf(node);

  // console.log(index);
  if (index > -1) {
    tree.nodes.splice(index, 1);
  }

};

Template.newNodeForm.helpers({

  getChildren: function(e) {
    //console.log(e);
    //console.log(this);
    var tree = Session.get("treeDoc");
    console.log(tree);
    var parent = this;
    var x = tree.nodes.filter(function(node) {
      return node.parentId == parent.nodeId;
    });
    console.log(x);
    return x;
  },
  isChild: function () {
    return getIndex(Session.get("treeDoc"), this) > -1;
  },
  getNodeIdName: function() {

    var tree = Session.get("treeDoc");
    var node = this;
    var index = getIndex(tree, node);

    return "nodes." + index + ".nodeId";
  },
  getParentIdName: function() {

    var tree = Session.get("treeDoc");
    var node = this;
    var index = getIndex(tree, node);

    return "nodes." + index + ".parentId";
  },
  getTextName: function() {

    var tree = Session.get("treeDoc");
    var node = this;
    var index = getIndex(tree, node);

    return "nodes." + index + ".text";
  }

});

Template.newNodeForm.events({

  "click .btn-add-child": function(event) {

    //console.log(event.target);
    //console.log(event.currentTarget);

    //event.preventDefault();

    var id = $(event.currentTarget).data("node-id");

    var tree = Session.get("treeDoc");
    //console.log(tree);
    tree.nodes.push({
      nodeId: Date.now(),
      parentId: id
    });

    Session.set("treeDoc", tree);
    //console.log(Session.get("treeDoc"));
    return false;
  },
  "click .btn-remove-child": function(event) {

    //event.preventDefault();

    var id = $(event.currentTarget).data("node-id");

    var tree = Session.get("treeDoc");

    removeChild(tree, id);

    console.log(tree);

    Session.set("treeDoc", tree);

    return false;
  }
});
