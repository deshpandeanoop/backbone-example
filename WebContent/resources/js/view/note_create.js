"use strict";
define([ "backbone", "underscore", "jquery", "note_model", "note_index" ],
		function() {
			var CreateNoteView = Backbone.View.extend({
				el : "#createAndUpdateNote",
				template : $("#formTemplate").html(),
				render : function() {
					var compiled = _.template(this.template);
					var html = compiled({
						note : this.model
					});
					this.$el.append($("#noteDetailContainer").html(html));
					if(this.model.isNew())
						{
							$("#noteDetailContainer").hide();
							$("a[class='btn btn-block btn-large btn-info']").show();
						}
					else
						{
							$("#noteDetailContainer").show();
							$("a[class='btn btn-block btn-large btn-info']").hide();
						}
					return this;
				},
				events : {
					"click a[class='btn btn-block btn-large btn-info']" : "createNewNote",
					"click button.save" : "saveNote",
					"click a[class='btn btn-large btn-default']" : "cancel"
				},
				saveNote : function() {
					var creationTime = $("#creationTime").val();
					var title = $("#title").val();
					var content = $("#content").val();
					if (this.model.has("id")) {
						this.model.set({
							creationTime : creationTime,
							title : title,
							content : content
						});
						this.model.save();
						APP.IndexNoteView.prototype.collection.add(this.model,
								{
									merge : true
								});
					} else {
						var newModel = new APP.NoteModel({
							creationTime : creationTime,
							title : title,
							content : content
						});
						newModel.save(null, {
							async : false
						});
						APP.IndexNoteView.prototype.collection.add(newModel);
					}
					Backbone.history.navigate("notes", {
						trigger : true
					});
				},
				cancel : function() {
					Backbone.history.navigate("notes", {
						trigger : true
					});
				},
				createNewNote : function()
				{
					$("a[class='btn btn-block btn-large btn-info']").hide();
					$("#noteDetailContainer").show();
					Backbone.history.navigate("notes/new", {
						trigger : false
					});
				}
			});
			window.APP = window.APP || {};
			APP.CreateNoteView = CreateNoteView;

			return APP;
		});