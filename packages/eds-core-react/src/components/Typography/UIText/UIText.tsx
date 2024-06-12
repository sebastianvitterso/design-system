import { forwardRef } from 'react'
import { Typography } from '../_components/Typography'
import { TypographyProps } from '../typography.types'
import { OverridableComponent } from '@equinor/eds-utils'

export type UITextProps = TypographyProps & {
  /** When true, text is pushed to the bottom of its text-box (making it "on grid" as the total heigth is rounded to a multiple of 4px), when false it is centered within the text-box
   * @default false
   */
  onGrid?: boolean
}

export const UIText: OverridableComponent<UITextProps, HTMLElement> =
  forwardRef(function UIText(
    {
      size = 'md',
      lineHeight = 'default',
      fontWeight = 'normal',
      letterSpacing = 'normal',
      as = 'p',
      onGrid = false,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <Typography
        ref={ref}
        as={as}
        $type={'ui-body-static'}
        $size={size}
        $lineHeight={lineHeight}
        $fontWeight={fontWeight}
        $letterSpacing={letterSpacing}
        $onGrid={onGrid}
        {...rest}
      >
        {children}
      </Typography>
    )
  })
