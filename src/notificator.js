export default class Notificator { 
  constructor(selector) {
    this.size = 3;
    this.stack = [];
    this.selector = selector;
  }
  addItem(config){
    const item = new Item(config);
    $(this.selector).prepend(item.$el);
    this.updateStack(item);
    item.show();
  }
  updateStack(item){
    this.stack.push(item);
    if(this.stack.length > this.size)
        this.stack.shift().remove();
  }
}
class Item {
  constructor(config) {
    this.$el = this.template({
        image: config.inputImage ? config.inputImage : false,
        title: config.inputTitle ? config.inputTitle : 'Reddit',
        body: config.inputBody ? config.inputBody : '',
        url: config.inputPost ? config.inputPost : '?',
    });
  }
  template(data) {
    return $(
    '<a href="'+data.url+'" class="notification">\
        <div class="notification-header">\
            <svg class="SnooIcon" version="1.1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20"><g><circle fill="#ff4500" cx="10" cy="10" r="10"></circle><path fill="#fff" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"></path></g></svg>\
            <div class="notification-title">'+data.title+'</div>\
        </div>'
        + (data.image ? '<img class="notification-image" src="'+data.image+'" />':'')
        + (data.body ? '<div class="notification-body">'+data.body+'</div>':'')+'\
    </a>');
  }
  show() { 
    this.$el.delay(100).queue(()=> this
        .$el.addClass('show').dequeue());
  }
  remove() { 
    this.$el.addClass('hide').delay(400)
      .queue(()=> this.$el.remove());
  }
}
