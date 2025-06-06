import { CircularProgress } from "@mui/material"
import { lazy, Suspense, useMemo } from "react"
import { type SxProps } from "@mui/material"

type MuiIcons = typeof import('@mui/icons-material');
export type IconName = keyof MuiIcons;

export default function DynamicIcon({iconName, sx}: {iconName: IconName, sx?: SxProps}) {
    const loadIcon = (name: IconName) => {
    return lazy(() =>
      import('@mui/icons-material').then(module => ({
        default:
          module[name] || (() => <CircularProgress size={20} color="warning" thickness={5} sx={{mr: 1, color:'white'}} />),
      })),
    )
  }

  const Icon = useMemo(() => loadIcon(iconName), [iconName])

    return (
        <Suspense fallback={<CircularProgress size={20} sx={{mr: 1}} />}>
            <Icon sx={{...sx}} />
        </Suspense>
    )
}