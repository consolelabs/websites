import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  ProfileBadge,
  useLoginWidget,
  Switch,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Typography,
} from '@mochi-ui/core'
import Link from 'next/link'
import { truncateWallet } from '~utils/string'
import {
  UserSolid,
  AddUserSolid,
  EyeShowSolid,
  StarSolid,
  HomeSolid,
  ShieldDoneSolid,
  ComputerPcLaptopSolid,
} from '@mochi-ui/icons'
import { ROUTES } from '~constants/routes'

export default function ProfileDropdown() {
  const { isLoggedIn, profile } = useLoginWidget()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isLoggedIn && profile && (
          <ProfileBadge
            avatar={profile?.avatar || '/logo.png'}
            name={truncateWallet(profile.profile_name) || 'unknown'}
            platform="/logo.png"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-h-[645px] overflow-y-auto"
        sideOffset={20}
        collisionPadding={{
          right: 32,
          bottom: 32,
        }}
      >
        <Link href={ROUTES.MY_PROFILE}>
          <DropdownMenuItem leftIcon={<UserSolid />}>Profile</DropdownMenuItem>
        </Link>

        <Link href="#Overview">
          <DropdownMenuItem hasPaddingLeft>Overview</DropdownMenuItem>
        </Link>

        <Link href="#settings">
          <DropdownMenuItem hasPaddingLeft>Settings</DropdownMenuItem>
        </Link>

        <Link href="#ViewOption">
          <DropdownMenuItem leftIcon={<EyeShowSolid />}>
            View Options
          </DropdownMenuItem>
        </Link>

        <Link href="#Darkmode">
          <DropdownMenuItem
            hasPaddingLeft
            rightExtra={<Switch />}
            onClick={(e) => e.preventDefault()}
          >
            Dark Mode
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="#friends">
          <DropdownMenuItem leftIcon={<AddUserSolid />}>
            Invite Friends
          </DropdownMenuItem>
        </Link>

        <Link href="#Feedback">
          <DropdownMenuItem leftIcon={<StarSolid />}>Feedback</DropdownMenuItem>
        </Link>

        <Link href="#TermAndPolicy">
          <DropdownMenuItem leftIcon={<ShieldDoneSolid />}>
            Terms and Policies
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Accordion type="multiple" className="!p-0 shadow-none">
          <AccordionItem value="Home">
            <AccordionTrigger
              className="py-0.5"
              leftIcon={
                <div className="p-0.5">
                  <HomeSolid />
                </div>
              }
            >
              Home
            </AccordionTrigger>
            <AccordionContent className="!p-0">
              <Link href={ROUTES.EXPLORE}>
                <DropdownMenuItem hasPaddingLeft>Explore</DropdownMenuItem>
              </Link>
              <Link href={ROUTES.FEATURES}>
                <DropdownMenuItem hasPaddingLeft>Features</DropdownMenuItem>
              </Link>
              <Link href={ROUTES.DOCS}>
                <DropdownMenuItem hasPaddingLeft>API</DropdownMenuItem>
              </Link>
              <Link href="#Roadmap">
                <DropdownMenuItem hasPaddingLeft>Roadmap</DropdownMenuItem>
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Download">
            <AccordionTrigger
              className="py-0.5"
              leftIcon={
                <div className="p-0.5">
                  <ComputerPcLaptopSolid />
                </div>
              }
            >
              Download
            </AccordionTrigger>
            <AccordionContent className="!p-0">
              <Link href="#Explore">
                <DropdownMenuItem hasPaddingLeft>Extension</DropdownMenuItem>
              </Link>
              <Link href="#Explore">
                <DropdownMenuItem hasPaddingLeft>Discord</DropdownMenuItem>
              </Link>
              <Link href="#Explore">
                <DropdownMenuItem hasPaddingLeft>Telegram</DropdownMenuItem>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-col !text-neutral-600 font-normal">
          <Typography className="!text-inherit" level="p6">
            Powered by Console Labs
          </Typography>
          <Typography className="!text-inherit" level="p6">
            Version 1.0.0
          </Typography>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
