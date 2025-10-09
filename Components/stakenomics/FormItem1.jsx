import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function FormItem1({ token, onDataChange }) {
  const { resolvedTheme } = useTheme();
  const [formData, setFormData] = useState({
    activationDate: "",
    activationTime: ""
  });

  if (!token) {
    return (
      <div className="p-6 text-center text-gray-600">
        No token selected
      </div>
    );
  }

  const handleInputChange = (field, value) => {
    const updatedData = {
      ...formData,
      [field]: value,
    };
    setFormData(updatedData);
    onDataChange?.(updatedData);
  };

  const bgGradientContainer = {
    background: resolvedTheme === "dark"
      ? 'linear-gradient(180deg, #9b8fd4 0%, #b5a8e3 100%)'
      : 'linear-gradient(180deg, #e8e4f8 0%, #f0ebfa 100%)'
  };

  const bgGradientAvatar = {
    background: resolvedTheme === "dark"
      ? 'linear-gradient(135deg, #f4c96b 0%, #3d7fa6 100%)'
      : 'linear-gradient(135deg, #ffeab3 0%, #b8d9f7 100%)'
  };

  return (
    <div className="border-3 border-[#7d6eb8] rounded-3xl p-4 w-full max-w-[500px] shadow-2xl mx-auto" style={bgGradientContainer}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <div className="bg-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-[#6b4d9f] text-base flex-shrink-0">
            i
          </div>
          <div className="text-[#1a0a33] text-sm font-semibold">
            Fill the form to Create Staking Pool for:
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center overflow-hidden" style={bgGradientAvatar}>
            <div
              className="w-5 h-5 rounded-full"
              style={{
                background: resolvedTheme === "dark"
                  ? 'radial-gradient(circle, #f4d16b 40%, #5a8fb8 100%)'
                  : 'radial-gradient(circle, #ffeab3 40%, #b8d9f7 100%)'
              }}
            ></div>
          </div>
          <div className="text-[#1a0a33] font-bold text-sm">
            {token.name}
          </div>
        </div>
      </div>

      {/* Form Box */}
      <div className="bg-[#f5f3fb] dark:bg-[#2A1C78] rounded-2xl p-6 border-2 border-[#d4c9e8]">
        {/* Form Item 1 */}
        <div className="mb-5">
          <label className="block text-[#1a0a33] font-bold text-[13px] mb-2">
            <span className="text-[#6b4d9f] font-bold mr-1">1.</span>Pool activation date (UTC):
          </label>
          <div className="flex gap-2 items-center mb-1.5">
            <input
              type="text"
              className="bg-[#d8d0f0] dark:bg-[#292B8C] border-none rounded-lg px-3 py-2.5 text-[13px] text-[#6b4d9f] font-bold flex-1 max-w-[280px]"
              placeholder="mm/dd/yyyy   hh:mm"
              value={`${formData.activationDate} ${formData.activationTime}`}
              onChange={(e) => {
                const [date, time] = e.target.value.split(' ');
                handleInputChange('activationDate', date || '');
                handleInputChange('activationTime', time || '');
              }}
            />
          </div>
          <div className="text-[#4a3d6b] text-[10px] leading-tight mt-1.5 font-medium">
            Before this date, the pool will show "Launching Soon", or choose to make staking available immediately.
          </div>
        </div>
      </div>
    </div>
  );
}