interface StatItemProps {
    number: string;
    label: string;
  }
  
  export const StatItem = ({ number, label }: StatItemProps) => (
    <div className="text-center">
      <div className="text-[#f1c40f] text-6xl text-center font-bold mb-2">
        {number}
      </div>
      <div className="text-gray-400 text-sm text-center md:text-base">
        {label}
      </div>
    </div>
  );
  
 