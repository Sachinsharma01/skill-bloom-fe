
import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from './button';
import { Upload } from 'lucide-react';

interface FileInputProps {
  id: string;
  accept?: string;
  onChange: (file: File | null) => void;
  value?: File | null;
  maxSizeMB?: number;
  className?: string;
  buttonText?: string;
}

export function FileInput({
  id,
  accept = "*/*",
  onChange,
  value,
  maxSizeMB = 5,
  className = "",
  buttonText = "Choose File"
}: FileInputProps) {
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>(value?.name || "No file chosen");

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (!file) {
      onChange(null);
      setFileName("No file chosen");
      setError("");
      return;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      setFileName("No file chosen");
      onChange(null);
      e.target.value = '';
      return;
    }

    setFileName(file.name);
    setError("");
    onChange(file);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-3">
        <Button 
          type="button" 
          onClick={handleButtonClick}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {buttonText}
        </Button>
        <span className="text-sm text-gray-500 truncate max-w-[200px]">{fileName}</span>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
