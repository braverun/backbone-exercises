(function(){
  'use strict';

var PostModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: {
    title: '',
    body: '',
  },
});

var PostsCollection = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/posts',

  model: 'PostModel',
});


var PostInputView = Backbone.View.extend({
    tagName: 'form',
    template: _.template($('[data-template-name=post-input]').text()),

    events: {
      'click .js-submit': 'submit'
    },

    submit: function(e) {
      e.preventDefault();
      var title = this.$('.title-input').val();
      var body = this.$('textarea').val();
      console.log(title, body);

      this.collection.create({
        title: 'title',
        body: 'body'
      });

      title = $('.title-input').val('');
      body =$('textarea').val('');

    },

    render: function(){
      this.$el.html(this.template());
      return this;
    }
});



var AppRouter = Backbone.Router.extend({
   routes: {
       '': 'index'
 },

  initialize: function(){
    this.postsCollection = new PostsCollection();
    this.postInputView = new PostInputView({
      el: '.app-container',
      collection: this.posts
      });
  },

   index: function() {
   this.postInputView.render();
   $('.app-container').append(this.postInputView.el);
 },


 });

 $.ajaxSetup({
    headers: {
      "X-Parse-Application-Id": "En0HvlSzhghm8rQbbxEudy4jff7J84lvC7C2tWKh",
      "X-Parse-REST-API-Key": "B9DuWgGoXgSD5SS8Dktluut9E73E25qba1sDJL09"
    }
  });


 $(document).ready(function(){
      window.router = new AppRouter();
      Backbone.history.start();
  });

})();
