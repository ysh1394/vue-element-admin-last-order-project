export default {
  data() {
    return {
      rules: {
        franchisee_category_id: [
          {
            required: true,
            message: "분류를 선택해주세요",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "상품명을 입력해주세요",
            trigger: "blur"
          }
        ],
        supplier_code: [
          {
            required: true,
            message: "바코드를 입력해주세요",
            trigger: "blur"
          }
        ],
        original_price: [
          {
            required: true,
            message: "원래가격을 입력해주세요",
            trigger: "change"
          }
        ],
        price: [
          {
            required: true,
            message: "판매가격을 입력해주세요",
            trigger: "change"
          }
        ],
        min_sell_limit: [
          {
            required: true,
            message: "최소수량을 입력해주세요",
            trigger: "change"
          }
        ],
        max_sell_limit: [
          {
            required: true,
            message: "최대수량을 입력해주세요",
            trigger: "change"
          }
        ]
      }
    };
  }
};
