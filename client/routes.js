Router.route("/", function() {
  Session.set("treeDoc", {
    name: "arthur",
    nodes: [
    {
      nodeId: Date.now(),
      parentId: 0,
      text: "node pai"
    }
    ]
  });
  this.render("newTreeForm");
});
