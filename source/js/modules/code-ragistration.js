const emailValidation = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

// const $warrantyCodeForm = $('.code-registration__form')
// const $('.code-registration__form #warranty-code') = $warrantyCodeForm.find('#warranty-code')
// const $('.code-registration__form #purchase-date') = $warrantyCodeForm.find('#purchase-date')
// const $('.code-registration__form #email') = $warrantyCodeForm.find('#email')
// const $('.code-registration__form #city') = $warrantyCodeForm.find('#city')
// const $('.code-registration__form .code-registration__note') = $warrantyCodeForm.find('.code-registration__note')
// // const $('.code-registration__form button[type="submit"]') = $warrantyCodeForm.find('button[type="submit"]')

// const warrantyCodeStage = $('.code-registration__form #warranty-code').length ? 1 : $('.code-registration__form #email').length ? 2 : 3

let hasPurchaseDateError = false
let hasWarrantyCodeError = false
let hasWarrantyEmailError = false
let hasWarrantyCityError = false

const warrantyCodeMask = $('.code-registration__form #warranty-code').attr('placeholder')
  ? $('.code-registration__form #warranty-code').attr('placeholder').replace(/_/g, 9)
  : '99999-99999-99999'

$('.code-registration__form #warranty-code').inputmask({
  mask: warrantyCodeMask,
  showMaskOnHover: false,
})

const isPurchaseDateValid = () => {
  const date = $('.code-registration__form #purchase-date').val()

  return (
    $('.code-registration__form #purchase-date')
      .val()
      .split('')
      .filter(w => w === '.').length === 2 &&
    !!Date.parse(`${date.split('.')[1]}/${date.split('.')[0]}/${date.split('.')[2]}`)
  )
}

const isWarrantyCodeValid = () => {
  if ($('.code-registration__form #warranty-code').attr('pattern')) {
    return (
      $('.code-registration__form #warranty-code').val().trim() &&
      new RegExp($('.code-registration__form #warranty-code').attr('pattern')).test(
        $('.code-registration__form #warranty-code').val()
      )
    )
  }

  return (
    $('.code-registration__form #warranty-code').val().trim() &&
    !$('.code-registration__form #warranty-code').val().includes('_')
  )
}

const isWarrantyEmailValid = () => {
  if (
    $('.code-registration__form #email').val().trim() &&
    new RegExp(emailValidation).test($('.code-registration__form #email').val())
  ) {
    return true
  }

  return false
}

const isWarrantyCityValid = () => {
  return !!$('.code-registration__form #city').val().trim()
}

datepickerMonths = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

$.datepicker.regional['ru'] = {
  closeText: 'Закрыть',
  prevText: 'Предыдущий',
  nextText: 'Следующий',
  currentText: 'Сегодня',
  monthNames: datepickerMonths,
  monthNamesShort: datepickerMonths,
  dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
  dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
  dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  weekHeader: 'Не',
  dateFormat: 'dd.mm.yy',
  firstDay: 1,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix: '',
  changeMonth: true,
  changeYear: true,
  yearRange: `1990:${new Date().getFullYear()}`,
  minDate: new Date(1990, 0, 1),
  maxDate: new Date(),
  showOtherMonths: true,
  onSelect: onPurchaseDateSelect,
  onChangeMonthYear: function () {
    console.log('###el', $('#ui-datepicker-div').find('select'))
    setTimeout(() => {
      $('#ui-datepicker-div')
        .find('select')
        .each((idx, e) => {
          $(e).select2({
            minimumResultsForSearch: Infinity,
            dropdownCssClass: 'datepicker-dropdown',
          })
        })
    }, 100)
  },
}

$.datepicker.setDefaults($.datepicker.regional['ru'])

$('#purchase-date').datepicker()

$('#purchase-date').on('click', function () {
  const el = $('#ui-datepicker-div').find('select')

  el.each((idx, e) => {
    $(e).select2({
      minimumResultsForSearch: Infinity,
      dropdownCssClass: 'datepicker-dropdown',
    })
  })
})

function onPurchaseDateSelect() {
  hasPurchaseDateError = false
  $('.code-registration__form #purchase-date').parent().removeClass('is--invalid')

  if (!hasWarrantyCodeError && !hasPurchaseDateError)
    $('.code-registration__form button[type="submit"]').removeAttr('disabled')
}

$('.code-registration__form #warranty-code').on('input', function (e) {
  hasWarrantyCodeError = false
  $('.code-registration__form #warranty-code').parent().removeClass('is--invalid')

  if (!hasWarrantyCodeError && !hasPurchaseDateError)
    $('.code-registration__form button[type="submit"]').removeAttr('disabled')
})

$('.code-registration__form #purchase-date').on('input', function (e) {
  hasPurchaseDateError = false
  $('.code-registration__form #purchase-date').parent().removeClass('is--invalid')

  if (!hasWarrantyCodeError && !hasPurchaseDateError)
    $('.code-registration__form button[type="submit"]').removeAttr('disabled')
})

$(document).on('input', '.code-registration__form #email', function () {
  hasWarrantyEmailError = false
  $('.code-registration__form #email').parent().removeClass('is--invalid')

  if (!hasWarrantyEmailError && !hasWarrantyCityError)
    $('.code-registration__form button[type="submit"]').removeAttr('disabled')
})

$(document).on('input', '.code-registration__form #city', function () {
  hasWarrantyCityError = false
  $('.code-registration__form #city').parent().removeClass('is--invalid')

  if (!hasWarrantyEmailError && !hasWarrantyCityError)
    $('.code-registration__form button[type="submit"]').removeAttr('disabled')
})

$(document).on('click', '.code-registration__form button[type="submit"]', function (e) {
  e.preventDefault()

  const warrantyCodeStage = $('.code-registration__form #warranty-code').length
    ? 1
    : $('.code-registration__form #email').length
    ? 2
    : 3

  if (warrantyCodeStage === 1) {
    let valid = true

    if (!isWarrantyCodeValid()) {
      hasWarrantyCodeError = true
      $('.code-registration__form #warranty-code').parent().addClass('is--invalid')
      valid = false
    }

    if (!isPurchaseDateValid()) {
      hasPurchaseDateError = true
      $('.code-registration__form #purchase-date').parent().addClass('is--invalid')
      valid = false
    }

    console.log('valid', valid)

    if (valid) {
      $('.code-registration__form').find('form').submit()
    } else {
      $('.code-registration__form button[type="submit"]').attr('disabled', true)
    }
  }

  if (warrantyCodeStage === 2) {
    let valid = true

    if (!isWarrantyEmailValid()) {
      hasWarrantyEmailError = true
      $('.code-registration__form #email').parent().addClass('is--invalid')
      valid = false
    }

    if (!isWarrantyCityValid()) {
      hasWarrantyCityError = true
      $('.code-registration__form #city').parent().addClass('is--invalid')
      valid = false
    }

    if (valid) {
      $('.code-registration__form').find('form').submit()
    } else {
      $('.code-registration__form button[type="submit"]').attr('disabled', true)
    }
  }
})

$(document).on('click', '.code-registration__form .code-registration__note', function () {
  if (!$(this).hasClass('is--opened')) {
    $(this).addClass('is--opened')

    const $popup = $('.code-registration__form .code-registration__note').find('.code-registration__code-popup').clone()
    $popup.addClass('code-registration__code-popup--outer')

    $('body').append($popup)
    $popup.addClass('is--visible')
  } else {
    $(this).removeClass('is--opened')

    $('.code-registration__code-popup--outer').remove()
  }
})

const onWarrantyCodePopupClose = () => {
  $('.code-registration__form .code-registration__note').removeClass('is--opened')
  $('.code-registration__code-popup--outer').remove()
}

$(document).on(
  'click',
  '.code-registration__code-popup--outer .code-registration__code-popup-bg',
  onWarrantyCodePopupClose
)
$(document).on(
  'click',
  '.code-registration__code-popup--outer .code-registration__code-popup-close',
  onWarrantyCodePopupClose
)
