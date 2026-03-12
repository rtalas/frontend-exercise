type RemoveButtonProps = {
  city: string;
  onRemove: (city: string) => void;
};

export const RemoveButton = ({ city, onRemove }: RemoveButtonProps) => (
  <button
    type="button"
    onClick={() => onRemove(city)}
    className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow transition-colors cursor-pointer"
    aria-label={`Remove ${city}`}
  >
    &times;
  </button>
);
