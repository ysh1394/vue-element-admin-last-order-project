export default {
  data() {
    return {
      rules: {
        deleted_cd: [
          {
            required: true,
            message: '삭제사유를 선택해주세요',
            trigger: 'change'
          }
        ]
      }
    }
  }
}
