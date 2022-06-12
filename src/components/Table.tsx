import Table from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { TableProps } from 'rc-table/lib/Table'
import styled from '@emotion/styled'
import Skeleton from '@mui/material/Skeleton'

interface Props extends TableProps<DefaultRecordType> {
  data: DefaultRecordType[]
  loading?: boolean
}

const StyledTable = styled(Table)({
  '& thead th': {
    textAlign: 'left'
  },
  '& th,td': {
    backgroundColor: '#FFF',
    borderBottom: '1px solid #EAEAEA',
    borderCollapse: 'collapse',
    padding: '10px'
  },
  '& .rc-table-cell-row-hover': {
    backgroundColor: '#D9E1FD'
  }
})

export default function Tables({ columns, data, scroll = {}, loading, ...props }: Props) {
  return (
    <>
      <StyledTable
        columns={columns}
        data={data}
        rowKey='name'
        scroll={{ x: 900, ...scroll }}
        emptyText={
          loading
            ? () => (
                <>
                  <Skeleton animation='wave' />
                  <Skeleton animation='wave' />
                  <Skeleton animation='wave' />
                </>
              )
            : 'No Data'
        }
        {...props}
      />
    </>
  )
}
