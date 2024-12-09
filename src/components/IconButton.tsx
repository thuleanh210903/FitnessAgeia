import React from 'react'


interface IconButtonProps {
    onClick?: () => void;
    isDisabled?: boolean;
    className?: string;
    children: React.ReactNode
}
const IconButton:React.FC<IconButtonProps> = ({
    onClick,
    isDisabled = false,
    className = "",
    children
}) => {
  return (
    <div
    onClick={!isDisabled ? onClick: undefined}
    className=''
    >
      {children}
    </div>
  )
}

export default IconButton
