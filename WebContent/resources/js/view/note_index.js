define([ "backbone", "jquery", "underscore", "note_model" ], function() {
	var IndexNoteView = Backbone.View.extend({
		template : $("#indexTemplate").html(),
		el : "#showNotes",
		collection : new APP.NoteCollection(),
		events : {
			"click a[class='btn btn-xs btn-info']" : "redirectToEditNote",
			"click a[class='btn btn-xs btn-danger']" : "deleteNote",
			"click #search":"fetchNotesInSpecificInterval"
		},
		initialize : function() {
			this.collection.on("remove add",this.render,this);
		},
		render : function() {
			
			var compiled = _.template(this.template);
			var html = compiled({
				notes : this.collection.toArray()
			});
			this.$el.html(html);
			return this;
		},
		redirectToEditNote : function(events) {
			var modelId = $(events.target).data("value");
			Backbone.history.navigate("notes/" + modelId + "/edit", {
				trigger : true
			});
		},
		deleteNote : function(events) {
			var moduleId = $(events.target).data("value");
			var modelToBeDeleted = this.collection.get(moduleId);
			modelToBeDeleted.destroy();
			this.collection.remove(modelToBeDeleted);
		},
		fetchNotesInSpecificInterval: function()
		{
			var startTime=$("#startTime").val();
			var endTime = $("#endTime").val();
			this.collection.fetch({data:{startTime:startTime,endTime:endTime}});
		}
	});

	window.APP = window.APP || {};
	APP.IndexNoteView = IndexNoteView;

	return APP;
});
