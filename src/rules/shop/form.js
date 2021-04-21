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
    const checkShopDeliveryPrices = (rule, value, callback) => {
      if (value.length > 0) {
        value.forEach((row) => {
          if (row.base_price === undefined || row.condition === undefined) {
            return callback(new Error("기본 배달요금에 올바른 값을 입력해주세요"))
          }
        })
      } else {
        return callback(new Error("기본 배달요금을 추가해주세요"))
      }

      return callback()
    }
    const checkShopDeliveryDistances = (rule, value, callback) => {
      if (value.length > 0) {
        value.forEach((row) => {
          if (row.distance === undefined || row.extra_price === undefined || row.extra_price <= 0) {
            return callback(new Error("거리별 추가 배달요금에 올바른 값을 입력해주세요"))
          }
        })
      }

      return callback()
    }
    const checkShopDeliveryTimes = (rule, value, callback) => {
      if (value.length > 0) {
        value.forEach((row) => {
          if (row.start_condition === 0 || row.start_condition === null || row.end_condition === 0 || row.end_condition === null || row.extra_price === undefined || row.extra_price <= 0) {
            return callback(new Error("주문시간별 추가 배달요금에 올바른 값을 입력해주세요"))
          }
        })
      }

      return callback()
    }
    return {
      rules: {
        master_username: [
          {
            required: true,
            message: '마스터 아이디를 입력해주세요',
            trigger: 'change'
          }
        ],
        master_password: [
          {
            required: true,
            message: '마스터 비밀번호를 입력해주세요',
            trigger: 'change'
          }
        ],
        franchisee_code: [
          {
            required: true,
            message: '프랜차이즈를 선택해주세요',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '스토어명을 입력해주세요',
            trigger: 'blur'
          }
        ],
        ceo: [
          {
            required: true,
            message: '대표명을 입력해주세요',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '스토어 전화번호를 입력해주세요',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '주소를 입력해주세요',
            trigger: 'change'
          }
        ],
        area: [
          {
            required: true,
            message: '지역을 입력해주세요',
            trigger: 'change'
          }
        ],
        zip_code: [
          {
            required: true,
            message: '우편번호를 입력해주세요',
            trigger: 'change'
          }
        ],
        lat: [
          {
            required: true,
            message: '위도를 입력해주세요',
            trigger: 'change'
          }
        ],
        lng: [
          {
            required: true,
            message: '경도를 입력해주세요',
            trigger: 'change'
          }
        ],
        work_start: [
          {
            required: true,
            message: '운영 시작시간을 입력해주세요',
            trigger: 'change'
          }
        ],
        work_end: [
          {
            required: true,
            message: '운영 종료시간을 입력해주세요',
            trigger: 'change'
          }
        ],
        pickup_type: [
          {
            required: true,
            message: '이용방법을 선택해주세요',
            trigger: 'change'
          }
        ],
        'shop_delivery_info.delivery_time': [
          {
            required: true,
            message: '배달 소요시간을 입력해주세요',
            trigger: 'blur'
          }
        ],
        'shop_delivery_info.max_distance': [
          {
            required: true,
            message: '배달 가능거리를 입력해주세요',
            trigger: 'change'
          }
        ],
        'shop_delivery_info.fixed_cost': [
          {
            required: true,
            message: '스토어 부담 배달비를 입력해주세요',
            trigger: 'change'
          }
        ],
        shop_delivery_prices: [
          {
            required: true,
            validator: checkShopDeliveryPrices,
            trigger: 'change'
          }
        ],
        shop_delivery_distances: [
          {
            validator: checkShopDeliveryDistances,
            trigger: 'change'
          }
        ],
        shop_delivery_times: [
          {
            validator: checkShopDeliveryTimes,
            trigger: 'change'
          }
        ],
        bank_account: [
          {
            validator: checkBankAccount,
            trigger: 'blur'
          }
        ],
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
        discount_items_reward: [
          {
            required: true,
            message: '마감할인상품 적립율을 입력해주세요',
            trigger: 'change'
          }
        ],
        nodiscount_items_reward: [
          {
            required: true,
            message: '정가상품 적립율을 입력해주세요',
            trigger: 'change'
          }
        ]
      }
    }
  }
}
