export default {
  data() {
    return {
      rules: {
        password: [
          {
            required: true,
            message: '비밀번호는 대강 만들어 주세요',
            trigger: 'change'
          }
        ]
      }
    }
  }
}
