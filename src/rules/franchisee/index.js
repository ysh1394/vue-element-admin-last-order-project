export default {
  data() {
    return {
      rules: {
        use_item_edit: [
          {
            required: true,
            message: '상품 수정 권한 설정을 선택해주세요',
            trigger: 'change'
          }
        ],
        item_count_min: [
          {
            required: true,
            message: '마감할인상품 최소 수량을 입력해주세요',
            trigger: 'change'
          }
        ],
        item_discount_rate_max: [
          {
            required: true,
            message: '라스트오더 판매가 최대 할인율을 입력해주세요',
            trigger: 'change'
          }
        ]
      }
    }
  }
}
