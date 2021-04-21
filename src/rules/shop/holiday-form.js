export default {
  data() {
    return {
      rules: {
        'daily.date': [
          {
            required: true,
            message: '시작일을 선택해주세요',
            trigger: 'change'
          }
        ],
        'daily.interval': [
          {
            required: true,
            message: '일단위을 선택해주세요',
            trigger: 'change'
          }
        ],
        'weekly.dayOfWeek': [
          {
            required: true,
            message: '요일을 선택해주세요',
            trigger: 'change'
          }
        ],
        'weekly.interval': [
          {
            required: true,
            message: '주단위를 선택해주세요',
            trigger: 'change'
          }
        ],
        'monthly.date': [
          {
            required: true,
            message: '지정일을 선택해주세요',
            trigger: 'change'
          }
        ],
        'monthly.dayOfWeek': [
          {
            required: true,
            message: '요일을 선택해주세요',
            trigger: 'change'
          }
        ],
        'monthly.weekOfMonth': [
          {
            required: true,
            message: '주차를 선택해주세요',
            trigger: 'change'
          }
        ],
        'monthly.interval': [
          {
            required: true,
            message: '월단위를 입력해주세요',
            trigger: 'change'
          }
        ]
      }
    }
  }
}
