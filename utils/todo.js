const AV = require('av-live-query-weapp-min');

class Todo extends AV.Object {
  get done() {
    return this.get('done');
  }
  set done(value) {
    this.set('done', value);
  }

  get content() {
    return this.get('content');
  }
  set content(value) {
    this.set('content', value);
  }
}

AV.Object.register(Everything, 'Everything');
module.exports = Everything;