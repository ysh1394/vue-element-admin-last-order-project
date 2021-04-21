<template>
  <div>
    <div class="section">
      <el-form class="search-box">
        <el-form-item class="search-input">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            accept="text/csv"
            drag
            :limit="1"
            :file-list="fileList"
          >
            <i class="el-icon-upload"></i>
          </el-upload>
          <el-button type="primary" @click="upload" :disabled="disableUpload">
            Upload
            <i class="el-icon-upload el-icon-right"></i>
          </el-button>
          <span>TOTAL</span>
          <span>{{ uploadData ? uploadData.length : 0 }}</span>
        </el-form-item>
      </el-form>
    </div>

    <div class="section">
      <div class="list-header">
        <!-- <span><input type="checkbox" v-model="allCheckBtn"/></span> -->
        <span>상품코드</span>
        <span>바코드</span>
        <span>카테고리</span>
        <span>상품명</span>
        <span>파일명</span>
        <span>상품원가</span>
        <span>할인가</span>
        <span>과세여부</span>
        <span>성인여부</span>
        <span>처리</span>
      </div>

      <div class="list-box">
        <div class="items-wrap">
          <ul class="items-ul">
            <li v-for="(csv, index) in uploadData" :key="`${index}`">
              <el-tooltip
                :content="csv.isFail ? csv.isFail : '등록 가능'"
                placement="right"
                effect="light"
              >
                <div class="item-li" :class="csv.isFail ? 'fail' : ''">
                  <span class="item-num">{{ csv.franchisee_goods_code }}</span>
                  <span class="item-num">{{ csv.supplier_code }}</span>
                  <span class="item-num">{{ csv.카테고리 }}</span>
                  <span class="item-num">{{ csv.name }}</span>
                  <span class="item-num">{{ csv.파일명 }}</span>
                  <span class="item-num">{{ csv.original_price }}</span>
                  <span class="item-num">{{ csv.price }}</span>
                  <span class="item-num">{{ csv.is_tax }}</span>
                  <span class="item-num">{{ csv.is_adult }}</span>
                  <span class="item-num">{{ csv.transaction }}</span>
                  <!-- <span class="item-num"><input v-model="csv['처리']"/></span> -->
                </div>
              </el-tooltip>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseException } from "@/utils/exception";
import { apiFetchBarcodeCheck } from "@/api/item/";

export default {
  data() {
    return {
      disableUpload: true,
      fileList: [],
      uploadData: []
    };
  },
  watch: {},
  methods: {
    // previewFiles(event) {
    //     let config = this.config();
    //     event.target.files.forEach(file => {
    //         console.log(file);
    //         this.$papa.parse(file, config);
    //     });
    // },
    config() {
      return {
        header: true,
        dynamicTyping: true,
        complete: this.completeFn,
        error: this.errorFn,
        skipEmptyLines: true
      };
    },
    async completeFn(results, file) {
      console.log(results);

      this.uploadData = results.data.map(item => {
        item.franchisee_code = this.$store.getters.getFranchiseeCode;
        item.member_id = parseInt(this.$store.getters.getUserIndex);
        item.category_id = null;
        item.franchisee_category_id = null;
        item.min_sell_limit = 1;
        item.max_sell_limit = 30;
        item.title = item.상품명; // 상품소개제목
        item.description = item.상품명; // 상품소개내용
        item.is_optional = 0;
        item.id = null;

        item.franchisee_goods_code = item.상품코드;
        delete item.상품코드;
        item.supplier_code = item.바코드;
        delete item.바코드;
        // item.franchisee_category_id = item.카테고리;
        // delete item.카테고리;
        item.name = item.상품명;
        delete item.상품명;
        item.thumbnail = `https://i.lastorder.in/${this.$store.getters.getFranchiseeCode}/items/${item.파일명}.JPG`;
        // delete item.파일명;
        item.original_price = item.상품원가;
        delete item.상품원가;
        item.price = item.할인가;
        delete item.할인가;
        item.is_tax = item.과세여부;
        delete item.과세여부;
        item.is_adult = item.성인여부;
        delete item.성인여부;
        item.transaction = item.처리;
        delete item.처리;

        item.isFail = null;
        return item;
      });

      for (const csv of this.uploadData) {
        const existCategory = this.$store.getters.getStoreCategories.find(
          c =>
            c.category_b_name === csv.카테고리 ||
            c.category_a_name === csv.카테고리
        );
        if (existCategory) {
          csv.franchisee_category_id = existCategory.id;
          csv.category_id = existCategory.category;
        } else {
          csv.isFail = "카테고리를 확인하세요.";
          continue;
        }
        if (isNaN(csv.supplier_code)) {
          csv.isFail = "바코드를 확인하세요.";
          continue;
        }
        if (isNaN(csv.original_price)) {
          csv.isFail = "상품원가를 확인하세요.";
          continue;
        }
        if (isNaN(csv.price)) {
          csv.isFail = "할인가를 확인하세요.";
          continue;
        }
        if (isNaN(csv.is_tax)) {
          csv.isFail = "과세여부를 확인하세요.";
          continue;
        }

        try {
          const res = await apiFetchBarcodeCheck(csv.supplier_code);
          const resData = res.data;

          if (resData.code === "S0000") {
            switch (csv.transaction) {
              case "A":
                if (resData.data.count !== 0) {
                  csv.isFail = "이미 등록되어 있는 상품입니다.";
                }
                break;

              case "U":
              case "D":
                if (resData.data.count === 0) {
                  csv.isFail = "등록되어 있지 않은 상품입니다.";
                } else {
                  csv.id = resData.data.results[0].id;
                }
                break;

              default:
                csv.isFail = "처리 유효값 : A, U, D";
                break;
            }
          }

          //console.log(resData);
        } catch (e) {
          baseException(e);
        }
      }

      const result = this.uploadData.find(item => item.isFail);
      if (result) {
        this.disableUpload = true;
      } else {
        this.disableUpload = false;
      }
    },
    errorFn(error, file) {
      console.log("Parsing error:", error, file);
    },
    async upload() {
      let successCount = 0;

      if (this.uploadData) {
        for (const csv of this.uploadData) {
          try {
            let response = {};
            switch (csv.transaction) {
              case "A":
                response = await this.$store.dispatch("REGISTER_ITEM", {
                  data: csv
                });
                break;

              case "U":
                response = await this.$store.dispatch("UPDATE_STORE_ITEM", {
                  id: csv.id,
                  data: csv
                });
                break;

              case "D":
                response = await this.$store.dispatch("DELETE_STORE_ITEM", {
                  id: csv.id
                });
                break;
            }

            if (response.data.code === "S0000") {
              successCount++;
            }
          } catch (e) {
            baseException(e);
          }
        }
        let failCount = this.uploadData.length - successCount;
        alert(
          `등록이 완료되었습니다. [성공: ${successCount}건, 실패: ${failCount}건]`
        );
        if (!failCount) {
          this.$router.push("/items");
        }
      }
    },
    handleRemove(file, fileList) {
      this.uploadData = null;
      this.disableUpload = true;
    },
    handleSuccess(response, file, fileList) {
      let config = this.config();
      this.$papa.parse(file.raw, config);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
// .search-box {
//   margin: 0 auto;
//   width: 100%;
//   margin: 30px auto;
//   .search-input {
//     margin: 50px auto 0px;
//     // width: 50%;
//     .category-select {
//       width: 30%;
//       height: 100%;
//       border: 1px solid #ccc;
//       border-radius: 5px;
//       font-size: 14px;
//       background-color: #fff;
//     }
//   }
// }
// .list-header {
//   display: flex;
//   line-height: 40px;
//   padding: 5px 0;
//   border-bottom: 2px solid #eee;
//   font-size: 15px;
//   font-weight: 500;

//   span {
//     display: flex;
//     justify-content: center;
//     height: 100%;
//     text-align: center;
//     .el-icon-d-caret {
//       font-size: 1.3em;
//       color: #bbb;
//       padding: 11px 0;
//       margin-left: 3px;
//     }
//   }
//   span:nth-child(1) {
//     width: 10%;
//     display: inline-block;
//   }
//   span:nth-child(2) {
//     width: 10%;
//   }
//   span:nth-child(3) {
//     width: 10%;
//   }
//   span:nth-child(4) {
//     width: 10%;
//   }
//   span:nth-child(5) {
//     width: 10%;
//   }
//   span:nth-child(6) {
//     width: 10%;
//   }
//   span:nth-child(7) {
//     width: 10%;
//   }
//   span:nth-child(8) {
//     width: 10%;
//   }
//   span:nth-child(9) {
//     width: 10%;
//   }
//   span:nth-child(10) {
//     width: 10%;
//   }
// }

// .item-li {
//   height: 100%;
//   span {
//     display: inline-block;
//     font-size: 13px;
//     text-align: center;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     overflow: hidden;
//     font-weight: 400;
//     color: #555;
//   }
//   span:nth-child(1) {
//     width: 10%;
//     display: inline-block;
//   }
//   span:nth-child(2) {
//     width: 10%;
//   }
//   span:nth-child(3) {
//     width: 10%;
//   }
//   span:nth-child(4) {
//     width: 10%;
//   }
//   span:nth-child(5) {
//     width: 10%;
//   }
//   span:nth-child(6) {
//     width: 10%;
//   }
//   span:nth-child(7) {
//     width: 10%;
//   }
//   span:nth-child(8) {
//     width: 10%;
//   }
//   span:nth-child(9) {
//     width: 10%;
//   }
//   span:nth-child(10) {
//     width: 10%;
//   }
// }

// .list-box {
//   width: 100%;
//   // height: 90%;
//   // overflow-y: scroll;
//   .items-wrap {
//     width: 100%;
//     font-size: 13px;
//     ul {
//       width: 100%;
//       margin: 0;
//       padding: 0;
//       li {
//         border-bottom: 1px solid #eee;
//         height: 40px;
//         line-height: 40px;

//         &:nth-child(2n-1) {
//           background: #fafafa;
//         }
//         &:hover {
//           background: #fafafa;
//         }
//       }
//     }
//   }
//   .fail {
//     background: #ff5555;
//   }
// }
</style>
