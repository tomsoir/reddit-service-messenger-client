import Notificator  from './notificator.js'

const FORM = '#myForm';
const MODAL = '#myModal';
const WRAPPER_NT = '#notificationWrapper';
const IPHONE_BTN = '#createNotification';
const INPUT_FILE = '#inputFile';
const INPUT_IMAGE = '#inputImage';
const MODAL_OK_BTN = '#modalOkButton';

const notificator = new Notificator(WRAPPER_NT);

$(()=>{
  listeners.onModalOpen();
  listeners.onFormSubmit();
  listeners.onPushIphone();
  listeners.onUploadImage();
});

const listeners = {
  onFormSubmit : () => {
    $(FORM).validator().on('submit', (e) => {
      if (!e.isDefaultPrevented())
        $(MODAL).modal('show');
      return false;
    });
  },
  onPushIphone : () => {
    $(IPHONE_BTN).on('click', (e) => {
      const formData = utils.getFormData();
      notificator.addItem(formData);
    });
  },
  onModalOpen : () => {
    $(MODAL).find(MODAL_OK_BTN).on('click', (e) => {
      $(MODAL).modal('hide');
      utils.cleanupForm();
      console.error('Sending form:', utils.getFormData());
    });
  },
  onUploadImage : () => {
    $(INPUT_FILE).on('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => $(INPUT_IMAGE).val(e.target.result);
        reader.readAsDataURL(e.target.files[0]);
      }
    });
  }
}
const utils = {
  getFormData : () => {
    const formData = $(FORM).serializeArray();
    return formData.reduce((result, item) => {
      result[item.name] = item.value; 
      return result;
    }, {});
  },
  cleanupForm : () => {
    $('input, textarea', FORM).val('');
  }
}
