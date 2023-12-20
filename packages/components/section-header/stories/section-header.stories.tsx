import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@mochi-ui/select'
import { Tooltip } from '@mochi-ui/tooltip'
import { useState } from 'react'
import { CheckLine, ThreeDotsLine } from '@mochi-ui/icons'
import { IconButton } from '@mochi-ui/icon-button'
import { Button } from '@mochi-ui/button'
import clsx from 'clsx'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderDescription,
  SectionHeaderTitle,
} from '../src'

const meta = {
  title: 'Layout/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
}

export default meta

export function Default() {
  const [selectedApp, setSelectedApp] = useState('all')

  const actions = (
    <>
      <Button color="white" className="w-full sm:w-max">
        See docs
      </Button>
      <Select value={selectedApp} onChange={setSelectedApp}>
        <SelectTrigger className="rounded bg-neutral-150 shrink-0">
          <Tooltip content="Selected app" arrow="top-center" className="z-20">
            <SelectValue placeholder="All apps" />
          </Tooltip>
        </SelectTrigger>
        <SelectContent>
          {[
            { key: 'all', name: 'All apps' },
            { key: '1', name: 'App name 1' },
            { key: '2', name: 'App name 2' },
          ].map((app) => (
            <SelectItem
              key={app.key}
              value={app.key}
              rightIcon={
                <CheckLine
                  className={clsx(
                    'w-4 h-4 ml-4',
                    app.key === selectedApp ? 'text-primary-700' : 'invisible',
                  )}
                />
              }
            >
              {app.name}
            </SelectItem>
          ))}
          <SelectSeparator />
          <button className="px-2 text-sm font-medium tracking-tight text-primary-700">
            Create an app
          </button>
        </SelectContent>
      </Select>
    </>
  )

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader>
        <SectionHeaderTitle>
          Platform Notification
          <SectionHeaderDescription>
            Select the platform you want to receive the notification
          </SectionHeaderDescription>
        </SectionHeaderTitle>
      </SectionHeader>

      <SectionHeader>
        <SectionHeaderTitle>
          Apps Activity
          <SectionHeaderDescription>
            Lorem ipsum dolor sit amet consectetur. Sed turpis eget sed nullam
            volutpat integer posuere.
          </SectionHeaderDescription>
        </SectionHeaderTitle>
        <SectionHeaderActions className="flex-nowrap">
          {actions}
        </SectionHeaderActions>
      </SectionHeader>

      <SectionHeader>
        <SectionHeaderTitle wrapperClassName="flex !flex-row items-center justify-between">
          Communities Activities
          <IconButton label="Open menu" variant="link" color="info">
            <ThreeDotsLine className="text-2xl" aria-hidden />
          </IconButton>
        </SectionHeaderTitle>
      </SectionHeader>
    </div>
  )
}
