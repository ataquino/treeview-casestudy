
Template.newTreeForm.helpers({

  getDoc: function () {
    console.log(Session.get("treeDoc"));
    return Session.get("treeDoc");
  },
  getParent: function () {
    var tree = Session.get("treeDoc");
    return tree.nodes[0];
  }
});

getIndex = function (tree, node) {
  return tree.nodes.indexOf(tree.nodes.filter(function (obj) {
    return obj.nodeId === node.nodeId;
  })[0]);
};

Template.newNodeForm.helpers({

  getChildren: function (e) {
    //console.log(e);
    //console.log(this);
    var tree = Session.get("treeDoc");
    var parent = this;
    return tree.nodes.filter(function (node) {
      return node.parentId == parent.nodeId;
    });
  },
  getNodeIdName: function () {

    var tree = Session.get("treeDoc");
    var node = this;
    var index = getIndex(tree, node);

    return "nodes."+index+".nodeId";
  },
  getParentIdName: function () {

    var tree = Session.get("treeDoc");
    var node = this;
    var index = getIndex(tree, node);

    return "nodes."+index+".parentId";
  },
  getTextName: function () {

    var tree = Session.get("treeDoc");
    var node = this;
    var index = getIndex(tree, node);

    return "nodes."+index+".text";
  }

});

Template.newNodeForm.events({

  "click .btn-add-child": function (event) {

    event.preventDefault();

    var id = $(event.currentTarget).data("node-id");

    var tree = Session.get("treeDoc");
    console.log(tree);
    tree.nodes.push({nodeId: Date.now(), parentId: id});

    Session.set("treeDoc", tree);
    console.log(Session.get("treeDoc"));
    return false;
  }
});
