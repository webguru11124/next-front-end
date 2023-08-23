  import { AppleSvg, FacebookSvg, GoogleSvg } from "@/assets/icons";
import { USFlagSvg } from "@/assets/icons/flag/flag.d";
import { ILanguageOptions, ILinks, ISocialLinks } from "@/types";

export const LanguageOptionArr: ILanguageOptions[] = [
  {
    code: "USA",
    image: <USFlagSvg />,
    id: "1",
  },
  {
    code: "FR",
    image: <USFlagSvg />,
    id: "2",
  },
  {
    code: "EN",
    image: <USFlagSvg />,
    id: "3",
  },
];

export const LinksArr: ILinks[] = [
  {
    id: "1",
    linkName: "Pricing",
    linkUrl: "/",
  },
  {
    id: "2",
    linkName: "About us",
    linkUrl: "/about",
  },
  {
    id: "3",
    linkName: "FAQs",
    linkUrl: "/faq",
  },
  {
    id: "4",
    linkName: "Blog",
    linkUrl: "/blog",
  },
];
export const SocialLinksArr: ISocialLinks[] = [
  {
    id: "1",
    linkName: "Google Sign In",
    linkUrl: "/google/sigin",
    linkIcon: <GoogleSvg />,
  },
  {
    id: "2",
    linkName: "Facebook Sign In",
    linkUrl: "/facebook/sigin",
    linkIcon: <FacebookSvg />,
  },
  {
    id: "3",
    linkName: "Apple Sign In",
    linkUrl: "/apple/sigin",
    linkIcon: <AppleSvg />,
  },
];

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const formatDateAsShort = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
};
