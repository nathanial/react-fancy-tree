import $ from 'jquery';

function initContextMenu(tree, selector, onClick) {
	tree.$container.on("mousedown.contextMenu", function(event) {
		if(event.which !== 3){
			return;
		}
		let node = $.ui.fancytree.getNode(event);

		if(node) {
			node.setFocus(true);
			node.setActive(true);

			onClick(event, node);
		}
	});
}

$.ui.fancytree.registerExtension({
	name: "bopContextMenu",
	version: "1.0",
	contextMenu: {
    selector: "fancytree-title",
		menu: {},
		actions: {},
		onClick: function(){}
	},
	treeInit: function(ctx) {
		this._superApply(arguments);
		initContextMenu(ctx.tree, "fancytree-title", ctx.options.contextMenu.onClick);
	}
});
