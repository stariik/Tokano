import ScrollingSoonCards from "../Live/ui/ScrollingSoonCards";
import SoonCard from "@/Components/Tokens/SoonCard";
import { cardData } from "@/data/data";
import { useTheme } from "@/hooks/useTheme";

function LaunchingSoon({ isMobile = false }) {
  const { resolvedTheme } = useTheme();

  // Limit to maximum 20 items
  const limitedCardData = cardData.slice(0, 20);

  if (isMobile) {
    return (
      <div className="dark:border-secondary border-[#CDCDE9]">
        <div className="space-y-2 px-2">
          {limitedCardData.map((item) => (
            <div key={item.id}>
              <SoonCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dark:border-secondary hidden max-h-332 overflow-hidden border-2 border-[#CDCDE9] lg:flex lg:flex-col xl:max-h-359 2xl:max-h-378 2xl:max-w-[620px]">
      <div
        className={`dark:border-secondary font-khand flex justify-center border-b-2 border-[#CDCDE9] py-4 text-2xl font-semibold ${
          resolvedTheme === "dark"
            ? "dark-custom-header-gradient"
            : "custom-header-gradient text-primary"
        }`}
      >
        <h1>| Launching Soon |</h1>
      </div>
      <ScrollingSoonCards cards={limitedCardData} />
    </div>
  );
}

export default LaunchingSoon;
