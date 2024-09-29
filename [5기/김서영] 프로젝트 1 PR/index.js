class Calulcator {
    $previousPreview = ''
    $currentPreview = ''
    previousOperation = ''
    currentOperation = ''

    constructor($previousPreview, $currentPreview) {
        this.$previousPreview = $previousPreview
        this.$currentPreview = $currentPreview
    }

    onPressNumber(number) {
        this.$currentPreview.textContent += number
    }

    onPressOperation(operation) {
        this.$previousPreview.textContent =
            this.$currentPreview.textContent + ' ' + operation
        this.$currentPreview.textContent = ''
        this.previousOperation = operation
    }

    onEqual() {
        const operation = this.previousOperation.trim()
        let result = 0

        if (operation === '+') {
            result =
                +this.$previousPreview.textContent.split(' ')[0] +
                +this.$currentPreview.textContent
        } else if (operation === '-') {
            result =
                +this.$previousPreview.textContent.split(' ')[0] -
                +this.$currentPreview.textContent
        } else if (operation === '*') {
            result =
                +this.$previousPreview.textContent.split(' ')[0] *
                +this.$currentPreview.textContent
        } else if (operation === '÷') {
            result =
                +this.$previousPreview.textContent.split(' ')[0] /
                +this.$currentPreview.textContent
        }

        this.$previousPreview.textContent = ''
        this.$currentPreview.textContent = result.toString()
        this.currentOperation = ''
    }

    onReset() {
        this.$previousPreview.textContent = ''
        this.$currentPreview.textContent = ''
        this.previousOperation = ''
        this.currentOperation = ''
    }

    onDelete() {
        this.$currentPreview.textContent =
            this.$currentPreview.textContent.slice(0, -1)
    }
}

// DOM
// 사칙연산
const $plus = document.querySelector('[data-btn-plus]')
const $minus = document.querySelector('[data-btn-minus]')
const $divide = document.querySelector('[data-btn-divide]')
const $multifly = document.querySelector('[data-btn-multifly]')

// 연산
const $equal = document.querySelector('[data-btn-equal]')

// 전체삭제(AC), 삭제
const $reset = document.querySelector('[data-btn-reset]')
const $delete = document.querySelector('[data-btn-delete]')

// 숫자, 연산
const $numbers = document.querySelectorAll('[data-btn-number]')
const $operations = document.querySelectorAll('[data-btn-operation]')

// 프롬프트
const $previousPreview = document.querySelector('[data-previous-preview]')
const $currentPreview = document.querySelector('[data-current-preview]')

// 연산 처리
const calc = new Calulcator($previousPreview, $currentPreview)

$numbers.forEach(($number) => {
    $number.addEventListener('click', (e) => {
        calc.onPressNumber(e.target.textContent)
    })
})

$operations.forEach(($operation) => {
    $operation.addEventListener('click', (e) => {
        if (e.target.textContent.trim() === '=') {
            calc.onEqual()
        } else {
            calc.onPressOperation(e.target.textContent)
        }
    })
})

$reset.addEventListener('click', (e) => {
    calc.onReset()
})

$delete.addEventListener('click', (e) => {
    calc.onDelete()
})
