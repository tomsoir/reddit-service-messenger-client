'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FORM = '#myForm';
var MODAL = '#myModal';
var WRAPPER_NT = '#notificationWrapper';
var IPHONE_BTN = '#createNotification';
var INPUT_FILE = '#inputFile';
var INPUT_IMAGE = '#inputImage';
var MODAL_OK_BTN = '#modalOkButton';

var notificator = new Notificator(WRAPPER_NT);

$(function () {
  listeners.onModalOpen();
  listeners.onFormSubmit();
  listeners.onPushIphone();
  listeners.onUploadImage();
});

var listeners = {
  onFormSubmit: function onFormSubmit() {
    $(FORM).validator().on('submit', function (e) {
      if (!e.isDefaultPrevented()) $(MODAL).modal('show');
      return false;
    });
  },
  onPushIphone: function onPushIphone() {
    $(IPHONE_BTN).on('click', function (e) {
      var formData = utils.getFormData();
      notificator.addItem(formData);
    });
  },
  onModalOpen: function onModalOpen() {
    $(MODAL).find(MODAL_OK_BTN).on('click', function (e) {
      $(MODAL).modal('hide');
      utils.cleanupForm();

      utils.post('/aa/',utils.getFormData());
      // 
      // HERE should be the POST
      // 
      console.error('Sending form:', utils.getFormData());
    });
  },
  onUploadImage: function onUploadImage() {
    $(INPUT_FILE).on('change', function (e) {
      if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          return $(INPUT_IMAGE).val(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });
  }
};
var utils = {
  getFormData: function getFormData() {
    var formData = $(FORM).serializeArray();
    return formData.reduce(function (result, item) {
      result[item.name] = item.value;
      return result;
    }, {});
  },
  cleanupForm: function cleanupForm() {
    $('input, textarea', FORM).val('');
  },
  post: function post(path, params, method) {
    method = method || "post"; 
    // Set method to post by default if not specified.
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
         }
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }
};

