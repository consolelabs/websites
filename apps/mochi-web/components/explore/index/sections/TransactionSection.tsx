import { useEffect, useRef } from 'react'
import { TransactionTable } from '~cpn/TransactionTable'
import { usePrevious } from '@dwarvesf/react-hooks'
import { ChainPicker, PlatformPicker } from '../components'
import {
  DEFAULT_PAGE_SIZE,
  useTransactionStore,
} from '../stores/useTransactionStore'

export const TransactionSection = () => {
  const {
    loading,
    txns,
    fetchTxns,
    page,
    /* size, */
    total = 0,
    setPage,
    setSize,
    filters,
    setFilters,
    ws,
    initWs,
  } = useTransactionStore()
  const txnsCurrentPage = txns[page - 1]
  const previousTxns = usePrevious(txnsCurrentPage || [])

  useEffect(() => {
    fetchTxns()
    initWs()

    return () => {
      ws?.close()
    }
  }, []) // eslint-disable-line

  const containerRef = useRef<HTMLDivElement | null>(null)
  /* useEffect(() => { */
  /*   // Scroll top when page change */
  /*   containerRef.current?.scrollIntoView() */
  /* }, [size, page]) */

  return (
    <div ref={containerRef} className="mx-auto" style={{ maxWidth: 1488 }}>
      <div className="flex gap-4 justify-end py-2 px-6">
        <ChainPicker
          value={filters.chainId || 'all'}
          onChange={(chainId) => setFilters({ chainId })}
        />
        <PlatformPicker
          value={filters.platform || 'all'}
          onChange={(platform) => setFilters({ platform })}
        />
      </div>
      <TransactionTable
        loadingRows={10}
        data={txnsCurrentPage || previousTxns}
        isLoading={loading}
        componentsProps={{
          pagination: {
            initalPage: 1,
            initItemsPerPage: DEFAULT_PAGE_SIZE,
            totalItems: total,
            onItemPerPageChange: setSize,
            onPageChange: setPage,
            className: 'px-10',
          },
        }}
        className="px-6"
      />
    </div>
  )
}
