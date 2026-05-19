import { CheckmarkIcon } from "@/components/ui/icons/checkmark-icon";
import { ChevronDownIcon } from "@/components/ui/icons/chevron-down";
import { MailIcon } from "@/components/ui/icons/mail-icon";
import { PhoneFilledIcon } from "@/components/ui/icons/phone-filled-icon";
import { StarIcon } from "@/components/ui/icons/star-icon";

export const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  checkmark: CheckmarkIcon,
  chevronDown: ChevronDownIcon,
  mail: MailIcon,
  phoneFilled: PhoneFilledIcon,
  star: StarIcon,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Component = ICON_MAP[name];
  if (!Component) return null;
  return <Component className={className} />;
}
