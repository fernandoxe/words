const getPercentage = (value: number, total: number): number => {
  return total ? value * 100 / total : 0;
};

export interface BarProps {
  value: number;
  total: number;
}

export const Bar = ({value, total}: BarProps) => {
  return (
    <div className="h-4 bg-purple-500 border-l border-purple-500" style={{width: `${getPercentage(value, total)}%`}}>
    </div>
  );
};
