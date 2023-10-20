import React, { useCallback, useRef } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

type DefaultSection = Record<string, any>

interface SectionBase<Item> {
  data: readonly Item[]
  key?: string | undefined
}

export type SectionListData<
  Item,
  Section = DefaultSection,
> = SectionBase<Item> & Section

export type SectionListRenderItem<Item, Section = DefaultSection> = (
  item: Item,
  section: SectionListData<Item, Section>,
  index?: number,
) => React.ReactNode

interface SectionListProps<Item, Section = DefaultSection> {
  rootClassName?: string
  rootStyle?: React.CSSProperties
  viewportClassName?: string
  viewportStyle?: React.CSSProperties
  listClassName?: string
  listStyle?: React.CSSProperties
  sections: readonly SectionListData<Item, Section>[]
  renderItem: SectionListRenderItem<Item, Section>
  renderSectionHeader: (
    section: SectionListData<Item, Section>,
    index?: number,
  ) => React.ReactNode
  SectionEmpty?: React.ReactNode
  onEndReached?: () => void
  onEndReachedThreshold?: number
}

export default function SectionList<
  Item = NonNullable<object> | string,
  Section = DefaultSection,
>({
  rootClassName,
  rootStyle,
  viewportClassName,
  viewportStyle,
  listClassName,
  listStyle,
  sections,
  renderItem,
  renderSectionHeader,
  SectionEmpty,
  onEndReached,
  onEndReachedThreshold = 0,
}: SectionListProps<Item, Section>) {
  const endReachedFired = useRef(false)

  const handleScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
    (event) => {
      if (!onEndReached) return
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
      const threshold = onEndReachedThreshold
      // If we reach the end of the list, fire the end reached event.
      // The end reached event fires only once when scroll position is over the threshold
      if (scrollTop + clientHeight + threshold >= scrollHeight) {
        if (!endReachedFired.current) {
          onEndReached()
          endReachedFired.current = true
        }
      } else if (endReachedFired.current) {
        endReachedFired.current = false
      }
    },
    [onEndReached, onEndReachedThreshold],
  )

  return (
    <ScrollArea.Root
      className={clsx('ui-overflow-hidden', rootClassName)}
      style={rootStyle}
    >
      <ScrollArea.Viewport
        className={clsx(
          'ui-w-full ui-h-full ui-border-inherit',
          viewportClassName,
        )}
        onScroll={handleScroll}
        style={viewportStyle}
      >
        <div className={clsx('ui-space-y-1', listClassName)} style={listStyle}>
          {sections.length
            ? sections.map((section, sectionIndex) => {
                return (
                  <div
                    className="ui-space-y-1"
                    key={(section.key || '') + sectionIndex}
                  >
                    {renderSectionHeader(section, sectionIndex)}
                    {section.data.map((item, itemIndex) =>
                      renderItem(item, section, itemIndex),
                    )}
                  </div>
                )
              })
            : SectionEmpty}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ui-flex ui-select-none ui-touch-none ui-p-0.5 ui-bg-gray-200 ui-transition-colors ui-w-2 hover:ui-bg-gray-300"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="ui-flex-1 ui-bg-gray-600 ui-rounded-lg ui-relative before:ui-content-[''] before:ui-absolute before:ui-w-full before:ui-h-full before:ui-min-w-[44px] before:ui-min-h-[44px] before:ui-top-1/2 before:ui-left-1/2 before:ui--translate-x-1/2 before:ui--translate-y-1/2" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ui-bg-gray-300" />
    </ScrollArea.Root>
  )
}
