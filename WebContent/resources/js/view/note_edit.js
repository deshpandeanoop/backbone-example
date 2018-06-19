define([ "backbone", "jquery","note_index","underscore" ], function() {
	var EditNoteView = Backbone.View.extend({
		template : $("#formTemplate").html(),
		el : "#container",
		events : {
			"click button.update":"updateNote",
			"click a[class='class=btn btn-large btn-default']":"cancel"
		},
		render : function() {
			var compiled = _.template(this.template);
			var html = compiled({note:this.model});
			this.$el.html(html);
			return this;
		},
		updateNote: function()
		{
			console.log("updating model");
			var noteModel = APP.IndexNoteView.prototype.collection.get(this.model.get("id"));
			noteModel.save();
			Backbone.history.navigate("notes",{trigger:true});
		},
		cancel:function()
		{
			Backbone.history.navigate("notes",{trigger:true});
		}
	});
	
	window.APP = window.APP||{};
	APP.EditNoteView = EditNoteView;
	
	return APP;
});