import theme from "./../components/theme";
import React, { FC } from "react";
import { CloseIcon } from "./svgs/close";
import { AIcon } from "./svgs/a";
import { BIcon } from "./svgs/b";
import { ArrowLeft } from "./svgs/arrowleft";
import { Iconsizer } from "./styled";
import { navigate } from "gatsby";

export type IconProps = {
  //* * Icon Name */
  name?: string;
  //* * SVG Fill Color */
  /** @deprecated use size instead */
  small?: boolean;
  //* *  onClick Event  */
  onClick?: () => void;
  //* *  prop from styled components  */
  className?: string;
  // Tiny Small Regular
  size?: string;
  ready?: boolean;
  progress?: boolean;
  title?: string;
  clickable?: boolean;
  light?: boolean;
  backButton?: boolean;
  to?: string;
  right?: boolean;
};

export type IconTagProps = {
  height?: string;
  fill?: string;
  viewBox?: string;
  xmlns?: string;
  filter?: string;
  style?: string;
  clipPath?: string;
  mask?: string;
  path?: string;
  small?: boolean;
  size?: string;
  progress?: boolean;
  ready?: boolean;
  title?: string;
  clickable?: boolean;
  light?: boolean;
  backButton?: boolean;
  to?: string;
  right?: boolean;
};

export const Icons = {
  close: CloseIcon,
  a: AIcon,
  b: BIcon,
  arrowLeft: ArrowLeft,
};

export const iconNames = [
  { label: "close" },
  { label: "a" },
  { label: "b" },
  { label: "arrowLeft" },
];

const Icon: FC<IconProps> = ({
  name = "loading",
  small = false,
  onClick,
  className,
  size = "24px",
  ready,
  progress,
  title,
  clickable,
  light,
  backButton = false,
  to = "/",
  right = false,
}) => {
  // @TODO use Typscript enum

  const IconTag = Icons[name as keyof typeof Icons];
  if (!IconTag) {
    return null;
  }

  return (
    <Iconsizer
      className={className}
      right={right}
      small={small}
      size={size}
      onClick={backButton ? () => navigate(to) : onClick}
      clickable={clickable}
    >
      <IconTag
        fill={light ? theme.white : theme.background}
        small={small}
        size={size}
        ready={ready}
        progress={progress}
        title={title}
      />
    </Iconsizer>
  );
};
export default Icon;
