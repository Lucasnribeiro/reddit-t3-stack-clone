import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/components/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarTooltipProvider = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Provider>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>
>(({  ...props }, ref) => (
  <TooltipPrimitive.Provider
    {...props}
  />
))
AvatarTooltipProvider.displayName = TooltipPrimitive.Provider.displayName

const AvatarTooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>
>(({  ...props }, ref) => (
  <TooltipPrimitive.Root
    {...props}
  />
))
AvatarTooltip.displayName = TooltipPrimitive.Root.displayName

const AvatarTooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({  ...props }, ref) => (
  <TooltipPrimitive.Trigger
    {...props}
  />
))
AvatarTooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName

const AvatarTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({side, ...props }, ref) => (
  <TooltipPrimitive.Content
    {...props}
  />
))
AvatarTooltipContent.displayName = TooltipPrimitive.Content.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback, AvatarTooltip, AvatarTooltipTrigger, AvatarTooltipContent, AvatarTooltipProvider }
