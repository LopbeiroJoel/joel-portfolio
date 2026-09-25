import { profile } from "@/data/profile";
import { hasPublicAsset } from "@/lib/public-assets";
import HeroContent from "./HeroContent";
export default function Hero() {
  return <HeroContent hasPhoto={hasPublicAsset(profile.photoPath)} hasCV={hasPublicAsset(profile.cvPath)} />;
}
