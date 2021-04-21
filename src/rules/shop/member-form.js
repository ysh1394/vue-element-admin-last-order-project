export default {
  data() {
    return {
      rules: {
        member_id: [
          {
            required: true,
            message: '회원을 선택해주세요',
            trigger: 'change'
          }
        ],
        role_id: [
          {
            required: true,
            message: '권한을 선택해주세요',
            trigger: 'change'
          }
        ],
        username: [
          {
            required: true,
            message: '아이디를 입력해주세요',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '비밀번호를 입력해주세요',
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
