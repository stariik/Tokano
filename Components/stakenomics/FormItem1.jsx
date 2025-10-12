import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function FormItem1({ token, onDataChange }) {
  const { resolvedTheme } = useTheme();
  const [formData, setFormData] = useState({
    activationDate: "",
    activationTime: "",
  });

  if (!token) {
    return (
      <div className="p-6 text-center text-gray-600">No token selected</div>
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
    background:
      resolvedTheme === "dark"
        ? "linear-gradient(180deg, #9b8fd4 0%, #b5a8e3 100%)"
        : "linear-gradient(180deg, #e8e4f8 0%, #f0ebfa 100%)",
  };

  const bgGradientAvatar = {
    background:
      resolvedTheme === "dark"
        ? "linear-gradient(135deg, #f4c96b 0%, #3d7fa6 100%)"
        : "linear-gradient(135deg, #ffeab3 0%, #b8d9f7 100%)",
  };

  return (
    <div
      className="mx-auto w-full max-w-[500px] rounded-3xl border-3 border-[#7d6eb8] p-4 shadow-2xl"
      style={bgGradientContainer}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="font-khand flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-[#6b4d9f]">
            i
          </div>
          <div className="font-khand text-sm font-semibold text-[#1a0a33]">
            Fill the form to Create Staking Pool for:
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex h-[30px] w-[30px] items-center justify-center overflow-hidden rounded-full"
            style={bgGradientAvatar}
          >
            <div
              className="h-5 w-5 rounded-full"
              style={{
                background:
                  resolvedTheme === "dark"
                    ? "radial-gradient(circle, #f4d16b 40%, #5a8fb8 100%)"
                    : "radial-gradient(circle, #ffeab3 40%, #b8d9f7 100%)",
              }}
            ></div>
          </div>
          <div className="font-khand text-sm font-bold text-[#1a0a33]">
            {token.name}
          </div>
        </div>
      </div>

      {/* Form Box */}
      <div className="rounded-2xl border-2 border-[#d4c9e8] bg-[#f5f3fb] p-6 dark:bg-[#2A1C78]">
        {/* Form Item 1 */}
        <div className="mb-5">
          <label className="font-khand mb-2 block text-[13px] font-bold text-[#1a0a33]">
            <span className="mr-1 font-bold text-[#6b4d9f]">1.</span>Pool
            activation date (UTC):
          </label>
          <div className="mb-1.5 flex items-center gap-2">
            <input
              type="text"
              className="font-khand max-w-[280px] flex-1 rounded-lg border-none bg-[#d8d0f0] px-3 py-2.5 text-[13px] font-bold text-[#6b4d9f] dark:bg-[#292B8C]"
              placeholder="mm/dd/yyyy   hh:mm"
              value={`${formData.activationDate} ${formData.activationTime}`}
              onChange={(e) => {
                const [date, time] = e.target.value.split(" ");
                handleInputChange("activationDate", date || "");
                handleInputChange("activationTime", time || "");
              }}
            />
          </div>
          <div className="font-khand mt-1.5 text-[10px] leading-tight font-medium text-[#4a3d6b]">
            Before this date, the pool will show "Launching Soon", or choose to
            make staking available immediately.
          </div>
        </div>
      </div>
    </div>
  );
}
