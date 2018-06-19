"use strict";
define(
		[ "backbone", "note_index", "note_model", "note_create" ],
		function() {
			var NoteRouter = Backbone.Router
					.extend({
						routes : {
							"notes" : "loadNotes",
							"notes/:modelId/edit" : "editNote"
						},
						loadNotes : function() {
							this.noteModel = new APP.NoteModel();
							this.createNewNoteView.model = this.noteModel;
							this.createNewNoteView.render();
							this.indexView.render();
						},
						editNote : function(modelId) {
							this.createNewNoteView.model = APP.IndexNoteView.prototype.collection
									.get(modelId);
							this.createNewNoteView.render();
						},
						initialize : function() {
							this.indexView = new APP.IndexNoteView();
							this.noteModel = new APP.NoteModel();
							this.createNewNoteView = new APP.CreateNoteView();
							Backbone.history.start({
								pushState : true,
								root : "/DailyJournalClient"
							});
							Backbone.history.navigate("notes", {
								trigger : true
							});
						}
					});

			window.APP = window.APP || {};
			APP.NoteRouter = NoteRouter;

			return APP;
		});
