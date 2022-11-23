import { defineComponent, onMounted, reactive } from 'vue'
import { dblist, list, craw } from '../api/db'


export default defineComponent({
  name: 'index',
  setup() {
    const state = reactive({
      tableData: [],
      formIn: {
        name: 'ssq',
        issueCount: 30
      },
      issueOp: [15,30,50,100,200],
      mostData: []
    })
    onMounted(() => {
      handleFilter()
    })

    const handleFilter = () => {
      dblist(state.formIn).then((res) => {
        console.log('dblist', res)
        state.tableData = res.result
      })
    }
    const golist = () => {
      list(state.formIn).then(res => {
        console.log('list', res)
      })
    }

    const crawList = () => {
      craw({}).then(res => {
        console.log('list', res)
      })
    }


    const counter = () => {
      const allblue: string[] = state.tableData.flatMap(it => it.red.split(','))
      const Maps = new Map()
      allblue.forEach(num => {
        if (Maps.has(num)) {
           Maps.set(num, Maps.get(num) + 1) 
        } else {
          Maps.set(num, 1) 
        }
      })

      let stre: string = ''
      state.tableData.map((it: any) => {
        stre += it.red + ','
      })
      const luckys: [] = []
      Maps.forEach((value, key, m) => {
        console.log('mp', value, key, Maps.get(key), m)
        state.mostData.push({ num: key, count: value })
      })
      
      state.mostData.sort((a, b) => b.count - a.count)
      console.log('stre', stre)
      console.log('re', luckys)
      console.log('Maps', Maps)
    }
    return () => (
      <div>
        <el-form inline={true} model={state.formIn}>
          {/* <el-form-item label="Approved by">
            <el-input v-model={state.formIn.name} placeholder="Approved by" />
          </el-form-item> */}
          <el-form-item label="period">
            <el-select v-model={state.formIn.issueCount}  placeholder="Select">
              { state.issueOp.map(it => <el-option  key={it} label={it} value={it} /> )}
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" onclick={handleFilter}> Query </el-button>
          </el-form-item>
        </el-form>
        <el-table data={state.tableData} height="50vh" style="width: 100%">
          <el-table-column type="index" label="order" width="90" />
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="red" label="red" width="180" />
          <el-table-column prop="blue" label="blue" />
        </el-table>

        <el-button type="primary" onclick={golist} >golist</el-button>
        <el-button type="primary" onclick={crawList} >crawList</el-button>
        <el-button type="primary" onclick={counter}>
          计算
        </el-button>
        <el-table data={state.mostData} height="300px" style="width: 100%">
          <el-table-column type="index" label="order" width="90" />
          <el-table-column prop="num" label="number" width="180" />
          <el-table-column prop="count" label="count" width="180" />
        </el-table>
        
      </div>
    )
  }
})
