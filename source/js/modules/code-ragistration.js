const emailValidation = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

const $warrantyCodeForm = $('.code-registration__form')
const $warrantyCode = $warrantyCodeForm.find('#warranty-code')
const $purchaseDate = $warrantyCodeForm.find('#purchase-date')
const $warrantyEmail = $warrantyCodeForm.find('#email')
const $warrantyCity = $warrantyCodeForm.find('#city')
const $warrantyCodeSubmit = $warrantyCodeForm.find('button[type="submit"]')

const warrantyCodeStage = $warrantyCode.length ? 1 : $warrantyEmail.length ? 2 : 3

let hasPurchaseDateError = false
let hasWarrantyCodeError = false
let hasWarrantyEmailError = false
let hasWarrantyCityError = false

const isPurchaseDateValid = () => {
  console.log('###date', Date.parse($purchaseDate.val()))

  return (
    $purchaseDate
      .val()
      .split('')
      .filter(w => w === '.').length === 2 && !!Date.parse($purchaseDate.val())
  )
}

const isWarrantyCodeValid = () => {
  if ($warrantyCode.attr('pattern')) {
    return $warrantyCode.val().trim() && new RegExp($warrantyCode.attr('pattern')).test($warrantyCode.val())
  }

  return $warrantyCode.val().trim()
}

const isWarrantyEmailValid = () => {
  if ($warrantyEmail.val().trim() && new RegExp(emailValidation).test($warrantyEmail.val())) {
    return true
  }

  return false
}

const isWarrantyCityValid = () => {
  return !!$warrantyCity.val().trim()
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
  $purchaseDate.parent().removeClass('is--invalid')

  if (!hasWarrantyCodeError && !hasPurchaseDateError) $warrantyCodeSubmit.removeAttr('disabled')
}

$warrantyCode.on('input', function (e) {
  hasWarrantyCodeError = false
  $warrantyCode.parent().removeClass('is--invalid')

  if (!hasWarrantyCodeError && !hasPurchaseDateError) $warrantyCodeSubmit.removeAttr('disabled')
})

$purchaseDate.on('input', function (e) {
  hasPurchaseDateError = false
  $purchaseDate.parent().removeClass('is--invalid')

  if (!hasWarrantyCodeError && !hasPurchaseDateError) $warrantyCodeSubmit.removeAttr('disabled')
})

$warrantyEmail.on('input', function () {
  hasWarrantyEmailError = false
  $warrantyEmail.parent().removeClass('is--invalid')

  if (!hasWarrantyEmailError && !hasWarrantyCityError) $warrantyCodeSubmit.removeAttr('disabled')
})

$warrantyCity.on('input', function () {
  hasWarrantyCityError = false
  $warrantyCity.parent().removeClass('is--invalid')

  if (!hasWarrantyEmailError && !hasWarrantyCityError) $warrantyCodeSubmit.removeAttr('disabled')
})

$warrantyCodeSubmit.on('click', function (e) {
  e.preventDefault()

  if (warrantyCodeStage === 1) {
    let valid = true

    if (!isWarrantyCodeValid()) {
      hasWarrantyCodeError = true
      $warrantyCode.parent().addClass('is--invalid')
      valid = false
    }

    if (!isPurchaseDateValid()) {
      hasPurchaseDateError = true
      $purchaseDate.parent().addClass('is--invalid')
      valid = false
    }

    console.log('valid', valid)

    if (valid) {
      $warrantyCodeForm.find('form').submit()
    } else {
      $warrantyCodeSubmit.attr('disabled', true)
    }
  }

  if (warrantyCodeStage === 2) {
    let valid = true

    if (!isWarrantyEmailValid()) {
      hasWarrantyEmailError = true
      $warrantyEmail.parent().addClass('is--invalid')
      valid = false
    }

    if (!isWarrantyCityValid()) {
      hasWarrantyCityError = true
      $warrantyCity.parent().addClass('is--invalid')
      valid = false
    }

    if (valid) {
      $warrantyCodeForm.find('form').submit()
    } else {
      $warrantyCodeSubmit.attr('disabled', true)
    }
  }
})
