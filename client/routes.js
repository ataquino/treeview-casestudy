Router.route("/", function() {
  Session.set("treeDoc", {
    name: "arthur",
    nodes: [
    {
      nodeId: Date.now(),
      parentId: 1,
      text: "node pai"
    }
    ]
  });
  this.render("newTreeForm");
});
