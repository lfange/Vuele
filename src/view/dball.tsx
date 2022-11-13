import { defineComponent, onMounted, reactive } from 'vue'
import { ulist } from '../api/user'

interface FormIn {
  name: string
  job: string
}

const index = defineComponent({
  setup() {
    const state = reactive({
      tableData: [],
      formIn: {}
    })
    onMounted(() => {})

    const onSubmit = () => {
      console.log('fds')
    }

    const handleFilter = () => {
      ulist(state.formIn).then((res) => {
        console.log('dblist', res)
        if (res.code === 200) {
          state.tableData = res.data.result
        }
      })
    }
    return () => (
      <div>
        <el-form inline={true} model={state.formIn} class="demo-form-inline">
          <el-form-item label="Approved by">
            <el-input v-model={state.formIn.name} placeholder="Approved by" />
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-input v-model={state.formIn.job} placeholder="Approved by" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" onclick={handleFilter}>
              Query
            </el-button>
          </el-form-item>
        </el-form>
        <el-table data={state.tableData} style="width: 100%">
          <el-table-column prop="CreatedAt" label="Date" />
          <el-table-column prop="Job" label="Job" />
          <el-table-column prop="Name" label="Name" />
          <el-table-column prop="UpdatedAt" label="UpdatedAt" />
        </el-table>

        <el-button type="primary" icon="Edit" />
      </div>
    )
  }
})

export default index
