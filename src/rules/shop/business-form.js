export default {
  data() {
    const checkBankAccount = (rule, value, callback) => {
      if (value) {
        const except_pattern = /[^\d^-]/g

        if (except_pattern.test(value)) {
          return callback(new Error("계좌번호는 숫자, '-' 만 입력해주세요"))
        }
      }

      return callback()
    }
    return {
      rules: {
        commission: [
          {
            required: true,
            message: '정가상품 수수료율을 입력해주세요',
            trigger: 'change'
          }
        ],
        commission_lastorder: [
          {
            required: true,
            message: '할인상품 수수료율을 입력해주세요',
            trigger: 'change'
          }
        ],
        bank_account: [
          {
            validator: checkBankAccount,
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
