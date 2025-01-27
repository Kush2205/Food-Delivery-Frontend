import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  bgColor: string;
  width: string;
  height: string;
  textsize?: string;
  borderColor?: string;
  textcolor?: string;
  onHoverColor?: string;
  onHoverTextColor?: string;
  borderSize?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  bgColor,
  width,
  height,
  textsize,
  borderColor,
  textcolor,
  onHoverColor,
  onHoverTextColor,
  borderSize
}) => {
  return (
    <div
      className={`button rounded-full flex justify-center items-center cursor-pointer  transition-all duration-300 ease-in-out`}
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        width: width,
        height: height,
        fontSize: textsize,
        border: `${borderSize} solid ${borderColor}`,
        
        color: textcolor,
      }}
    >
      <span
        className={`w-full h-full rounded-full font-semibold  flex justify-center items-center transition-all duration-300 ease-in-out`}
        style={{
          backgroundColor: bgColor,
          color: textcolor,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLSpanElement).style.backgroundColor = onHoverColor || bgColor;
          (e.currentTarget as HTMLSpanElement).style.color = (onHoverTextColor || textcolor) ?? '';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLSpanElement).style.backgroundColor = bgColor;
          (e.currentTarget as HTMLSpanElement).style.color = textcolor || '';
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default Button;