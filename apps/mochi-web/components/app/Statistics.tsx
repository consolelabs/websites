import {
  Button,
  PageHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography,
} from '@consolelabs/core'
import { ArrowUpLine, CheckLine, ChevronDownLine } from '@consolelabs/icons'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { ViewApplication } from '~types/mochi-pay-schema'
import { formatNumber } from '~utils/number'
import { useFetchApplicationStats } from '~hooks/app/useFetchApplicationStats'
import { SOCIAL_LINKS } from '~constants'
import { GET_PATHS } from '~constants/api'

const DataBox = ({
  label,
  amount = 0,
  formatAmount = formatNumber,
  percentage = 0,
}: {
  label: string
  amount?: number
  formatAmount?: (amount: number) => string
  percentage?: number
}) => (
  <div className="p-4 space-y-4 bg-neutral-0 rounded-xl">
    <Typography level="h8" color="textPrimary">
      {label}
    </Typography>
    <Typography level="h5" color="textPrimary">
      {formatAmount ? formatAmount(amount) : amount}
    </Typography>
    <div
      className={clsx('flex items-center space-x-1 flex-wrap', {
        invisible: !percentage,
      })}
    >
      <ArrowUpLine
        className={clsx(
          'w-4 h-4',
          percentage > 0 ? 'text-success-500' : 'text-danger-500 rotate-180',
        )}
      />
      <Typography level="h8" color={percentage > 0 ? 'success' : 'danger'}>
        {Math.abs(percentage) * 100}%
      </Typography>
      <Typography level="p5" color="textSecondary">
        vs last month
      </Typography>
    </div>
  </div>
)

interface Props {
  id?: string
  apps?: ViewApplication[]
  onOpenCreateAppModal: () => void
}

export const Statistics = ({ id, apps = [], onOpenCreateAppModal }: Props) => {
  const { data: stats } = useFetchApplicationStats(id)

  return (
    <>
      <PageHeader
        title="Developer Portal"
        description="Build secure and frictionless payments across Web2 and Web3
      platforms with a single API call."
        actions={[
          <Button
            variant="outline"
            color="neutral"
            className="!bg-neutral-0"
            key="see-docs-button"
            onClick={() => window.open(SOCIAL_LINKS.DOCS, '_blank')}
          >
            See docs
          </Button>,
          <DropdownMenu key="app-select">
            <DropdownMenuTrigger className="">
              <Button className="!bg-neutral-150">
                <Typography level="p5">All apps</Typography>
                <ChevronDownLine className="w-4 h-4 text-neutral-800" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                rightIcon={
                  <CheckLine className="w-4 h-4 ml-4 text-primary-700" />
                }
              >
                All apps
              </DropdownMenuItem>
              {apps.map((app) => (
                <Link key={app.id} href={GET_PATHS.APP_DETAIL(app.id)}>
                  <DropdownMenuItem key={app.id}>{app.name}</DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onOpenCreateAppModal}>
                <Typography level="h8" color="primary">
                  Create an app
                </Typography>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>,
        ]}
      />

      <div className="flex flex-col gap-2 p-2 mt-8 bg-neutral-150 rounded-2xl sm:flex-row">
        <div className="w-full px-6 pb-8 space-y-2 sm:w-1/3 bg-neutral-0 rounded-xl">
          <Image
            width={204}
            height={124}
            alt=""
            src="/assets/app-statistics.png"
          />
          <Typography level="h6" color="textPrimary">
            Build an app
          </Typography>
          <Typography level="p5" color="textSecondary">
            Create an app to get a live API key with access to multiple Mochi
            products.
          </Typography>
          <Button size="sm" onClick={onOpenCreateAppModal}>
            Create an app
          </Button>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
          <DataBox
            label="All time Users"
            amount={stats?.users_in_total}
            percentage={stats?.users_in_total_change?.last_month_percentage}
          />
          <DataBox
            label="7 days Users"
            amount={stats?.users_in_7d}
            percentage={stats?.users_in_7d_change?.last_month_percentage}
          />
          <DataBox
            label="All time Txs"
            amount={stats?.txs_in_total}
            percentage={stats?.txs_in_total_change?.last_month_percentage}
          />
          <DataBox
            label="7 days Txs"
            amount={stats?.txs_in_7d}
            percentage={stats?.txs_in_7d_change?.last_month_percentage}
          />
          <DataBox
            label="All time Revenue"
            amount={stats?.revenue_in_total}
            formatAmount={(amount) => `$${formatNumber(amount)}`}
            percentage={stats?.revenue_in_total_change?.last_month_percentage}
          />
          <DataBox
            label="7 days Revenue"
            amount={stats?.revenue_in_7d}
            formatAmount={(amount) => `$${formatNumber(amount)}`}
            percentage={stats?.revenue_in_7d_change?.last_month_percentage}
          />
        </div>
      </div>
    </>
  )
}
