import { useClipboard } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'

const codeString = `
  curl --request GET \\\n --url https://api.mochi-pay.console.so/api/\nv1/profile/0/monthly-stats \\\n --header 'accept: application/json'
  `
const codeCopy = `curl --request GET \\\n --url https://api.mochi-pay.console.so/api/v1/profile/0/monthly-stats \\\n --header 'accept: application/json'`

export default function ApiIntegration() {
  const { hasCopied, onCopy } = useClipboard(codeCopy)

  return (
    <section className="bg-neutral-800 py-16 md:py-24">
      <div className="container px-6 mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col justify-center items-start md:w-3/5">
            <h2 className="font-medium text-4xl sm:text-5xl mb-4 sm:mb-6 text-text-contrast tracking-[-0.5px]">
              A fully integrated suite of{' '}
              <span className="text-success-400 font-normal">APIs</span>
            </h2>
            <div>
              <a
                target="blank"
                href="https://docs.mochi.gg"
                className="inline-flex overflow-hidden px-4 mr-auto font-normal bg-background-body rounded-full transition-all duration-300 ease-in-out hover:bg-background-hover py-[10px]"
              >
                Read the docs
              </a>
            </div>
          </div>
          <div className="relative py-8 px-8 leading-7 bg-black rounded-3xl">
            <span className="px-4 text-gray-500 uppercase">curl request</span>
            <pre className="bg-black overflow-auto">
              <code>
                <span className="text-gray-400">{codeString}</span>
              </code>
            </pre>
            <button
              onClick={onCopy}
              className="absolute top-6 right-6 p-1 rounded-lg bg-background-tooltip"
              type="button"
            >
              {hasCopied ? (
                <Icon
                  className="w-4 h-4 text-success-300"
                  icon="heroicons:check"
                />
              ) : (
                <Icon
                  className="w-4 h-4 text-text-contrast"
                  icon="heroicons:clipboard"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
