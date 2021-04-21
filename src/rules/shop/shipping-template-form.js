export default {
  data() {
    return {
      rules: {
        title: [
          {
            required: true,
            message: '템플릿명을 입력해주세요',
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
