<template>
    <div id="data-grid" class="panel panel-default mt-32">
      <div class="panel-body panel-pagination">
        <div class="row">
          <div class="col-xs-12 col-sm-2">
            <form id="search" class="form-inline">
              <div class="input-group">
                <input name="query" v-model="filterKey" class="form-control">
                <span class="input-group-addon">
                  <span class="glyphicon glyphicon-search"></span>
                </span>
              </div>
            </form>
          </div>
          <div class="col-xs-12 col-sm-2">
            <form id="select-page" class="form-inline" name="pager">
              <div class="form-group">
                <label class="control-label">Trier par page</label>
                <select v-model="filterPage"
                  name="filterPage" id="filterPage" autocomplete="off"
                  class="form-control" @change="sortByPage(filterPage)">
                  <option v-for="page in selectPage"
                    v-if="page == perPage" :value="page"
                    v-html="page" selected>
                  </option>
                  <option v-html="page" :value="page" v-else></option>
                </select>
              </div>
            </form>
          </div>
          <div class="col-xs-12 col-sm-8">
            <ul class="pagination pagination-right" v-if="totalCount > 0">
              <li v-if="currentPage > 1">
                <a @click="prevPage()" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="disabled" v-else>
                <a href="#"><span aria-hidden="true">&laquo;</span></a>
              </li>
              <li v-for="page in totalPage" :class="{ 'active': page === currentPage }">
                <a href="#" @click="showPage(page)">
                  {{ page }}
                </a>
              </li>
              <li v-if="currentPage < totalPage">
                <a @click="nextPage()" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
              <li class="disabled" v-else>
                <a href="#"><span aria-hidden="true">&raquo;</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-hover table-bordered table-condensed">
      		<thead>
            <tr>
              <th @click="sortBy(header.key)" :class="{ active: sortKey == header.key }"
                v-for="(header, index) in headers"
                :key="index">
                {{ header.value }}
                <span class="arrow" :class="sortOrders[header.key] > 0 ? 'asc' : 'dsc'">
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="totalCount === 0">
              <td :colspan="headers.length">
                <span class="glyphicon glyphicon-info-sign"></span>
                Pas de session enregistrée pour le moment!
              </td>
            </tr>
            <tr v-for="(entry, num) in filteredData" v-else>
              <td v-for="o in headers">
                <!-- Todo calcul as and desc in compute method -->
                {{ o.key == 'id' ?  setCounter(num) : entry[o.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="panel-body panel-pagination">
        <div class="row">
          <div class="col-xs-12 col-sm-2 mt-6">
            <strong class="">Page {{ currentPage }} sur {{ totalPage }} - {{ totalCount }} entrées au total</strong>
          </div>
          <div class="col-xs-12 col-sm-10">
            <ul class="pagination pagination-right" v-if="totalCount > 0">
              <li v-if="currentPage > 1">
                <a @click="prevPage()" aria-label="Previous" >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="disabled" v-else>
                <a href="#"><span aria-hidden="true">&laquo;</span></a>
              </li>
              <li v-for="page in totalPage" :class="{ 'active': page === currentPage }">
                <a href="#" @click="showPage(page)">{{ page }}</a>
              </li>
              <li v-if="currentPage < totalPage">
                <a @click="nextPage()" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
              <li class="disabled" v-else>
                <a href="#"><span aria-hidden="true">&raquo;</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    items: Array,
    headers: Array,
    perPage: Number,
    currentPage: Number,
    totalPage: Number,
    totalCount: Number
  },
  data () {
    return {
      filterKey: '',
      order: 1,
      filterPage: 1,
      sortKey: '',
      sortOrders: [],
      selectPage: [5, 10, 20, 25, 50, 75, 100, 150]
    }
  },
  mounted () {
    var sortOrders = {}
    this.headers.forEach((o) => {
      sortOrders[o.key] = 1
    })
    this.sortOrders = sortOrders
    this.filterPage = this.perPage
  },
  computed: {
    filteredData () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var data = this.items
      this.order = this.sortOrders[sortKey] || 1
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        var self = this
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * self.order
        })
      }
      return data
    }
  },
  methods: {
    setCounter (number) {
      let counter = 1 + (number + this.currentPage * this.perPage) - this.perPage
      if (this.order === 1) {
        return counter
      }

      return this.perPage - (number - this.currentPage * this.perPage) - this.perPage
    },
    sortBy (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    sortByPage (perPage) {
      this.$parent.$emit('per-page', perPage)
    },
    prevPage () {
      if (this.currentPage - 1 <= 0) return
      this.$parent.$emit('current-page', this.currentPage - 1)
    },
    showPage (page) {
      this.$parent.$emit('current-page', page)
    },
    nextPage () {
      if (this.currentPage >= this.totalPage) return
      this.$parent.$emit('current-page', this.currentPage + 1)
    }
  }
}
</script>

<style lang="less">
#data-grid {
  .arrow {
    display: inline-block;
    vertical-align: bottom;
    width: 0;
    height: 0;
    margin-top: 8px;
    float: right;
    opacity: 0.66;
    &.asc {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 4px solid #333;
    }
    &.dsc {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid #333;
    }
  }
  th {
    cursor: pointer;
  }
  .panel-pagination {
    padding: 6px;
    vertical-align: middle;
  }
  .pagination {
    margin:0;
    &-right {
      float: right;
    }
  }
}
</style>
